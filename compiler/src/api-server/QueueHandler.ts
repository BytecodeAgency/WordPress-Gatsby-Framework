import { ChildProcess, spawn } from 'child_process';
import logger from './helpers/logger';

const MAX_ACTIVE_JOBS = 3;

class Singleton {
    private static instance: Singleton;
    private JobsToExecute: Job[];
    private activeJobs: ActiveJob[];
    private constructor() {
        this.JobsToExecute = [];
        this.activeJobs = [];
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    addJob(job: Job) {
        const currentlyExecutedJob = this.activeJobs.find(
            x => x.name.split('_')[0] === job.name.split('_')[0],
        );
        if (
            this.activeJobs.length >= MAX_ACTIVE_JOBS &&
            !currentlyExecutedJob
        ) {
            logger.info(`Job added to Queue: ${job.name}`);

            const jobIndex = this.JobsToExecute.findIndex(
                jobInList => jobInList.name === job.name,
            );
            if (jobIndex === -1) {
                this.JobsToExecute.push(job);
            } else {
                this.JobsToExecute[jobIndex] = job;
            }
        } else {
            if (currentlyExecutedJob) {
                logger.info(`killing job: ${currentlyExecutedJob.name}`);
                process.kill(-currentlyExecutedJob.process.pid);
                // currentlyExecutedJob.process.kill('SIGTERM');
                this.removeActiveJob(currentlyExecutedJob.name);
            }
            this.executeJob(job);
        }
        if (process.env.NODE_ENV === 'development') {
            logger.info(`\ncurrent jobs active: ${this.activeJobs
                .map(x => x.name)
                .toString()}
            \ncurrent jobs waiting: ${this.JobsToExecute.map(
                x => x.name,
            ).toString()}`);
        }
    }

    executeJob(job: Job) {
        logger.info(`Executing job: ${job.name}`);

        const apiKey: string = JSON.parse(job.json).apikey;
        process.env.apiKey = apiKey;
        process.env.json = job.json;

        const gatsby: ChildProcess = spawn(
            'yarn',
            [
                'build',
                '&&',
                'mkdir',
                '-p',
                `~/www-data/${apiKey}`,
                '&&',
                'rsync',
                '-avz',
                './public/*',
                `~/www-data/${apiKey}`,
            ],
            { ...process.env, shell: true, detached: true },
        );
        this.activeJobs.push({ name: job.name, process: gatsby });

        gatsby.on('exit', (code, signal) => {
            logger.info(
                `${job.name} finished with code and signal: ${code} ${signal}`,
            );
            this.removeActiveJob(job.name);
            gatsby.kill();
            if (signal !== 'SIGTERM') this.onJobFinish();
        });
        if (gatsby.stderr) {
            gatsby.stderr.on('data', data => {
                logger.error(`${job.name} error: ${data}`);
            });
        }

        if (process.env.NODE_END === 'development' && gatsby.stdout) {
            gatsby.stdout.on('data', data => {
                logger.info(`child stdout:\n${data}`);
            });
        }
    }

    removeActiveJob(jobName: string) {
        this.activeJobs = this.activeJobs.filter(
            activeJob => activeJob.name !== jobName,
        );
    }

    onJobFinish() {
        if (
            this.activeJobs.length < MAX_ACTIVE_JOBS &&
            this.JobsToExecute.length > 0
        ) {
            this.executeJob(this.JobsToExecute[0]);
            this.JobsToExecute.shift();
        }
    }
}

export interface Job {
    name: string;
    json: string;
}

export interface ActiveJob {
    name: string;
    process: ChildProcess;
}

export default Singleton;
