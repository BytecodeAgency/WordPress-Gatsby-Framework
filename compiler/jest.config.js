module.exports = {
    // automock: false,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    // globalSetup: null,
    // globalTeardown: null,
    // globals: {},
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '@wp-compiler/(.*)': '<rootDir>/src/$1',
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    // resetMocks: false,
    // resetModules: false,
    roots: ['src'],
    globals: {
        __PATH_PREFIX__: ``,
    },
    // setupFiles: [],
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    // testURL: "http://localhost", // Used for devenv by JSDom
    timers: 'fake', // Was "real"
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],

    // verbose: null,
    // watchman: true,
};
