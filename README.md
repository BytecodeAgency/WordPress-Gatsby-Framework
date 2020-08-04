# Gatsby WordPress SSR (Proof of Concept)

## About this project

This project was developed in the summer of 2019 as an internal proof-of-concept at Bytecode Digital Agency, as a way to utilize the WordPress CMS and make it possible to create fast (sub-second) loading websites written in ReactJS with it.

The reason this project has been released as free and open-source software, is to allow others to use our work to improve on for their own projects.

_Node: this is a proof-of-concept and not suitable for production use where uptime and stability is a primary concern._

## Repository structure

This (mono)repository consists of 3 parts:

1. Gatsby WordPress compilation server (`/compiler`)
    * NodeJS server accepting the JSON payload from WordPress
    * The UI components written in ReactJS
    * The application compiling the JSON payload to a statically built website using Gatsby
2. WordPress Framework plugin (`/wp-framework`)
    The plugin allowing users to create pages with the correct fields for
    static site rendering
3. WordPress Management plugin (`/wp-management`, not required for running the Gatsby-WordPress application)
    The plugin cleaning up the WordPress backend (removing unused roles, etc.)

## Requirements

* WordPress
* NodeJS 10+

## Installation

* Add the `/wp-framework` and `/wp-management` directories to your `wp-plugins`
* Activate the plugins
* Follow the steps in `/compiler` for setting up the compiler
* After starting the compiler with `yarn run start`, enter the compiler url (fe. `localhost:3000`) in the compiler administration page on `wp-admin`
* Go to Settings -> VWS Management in `wp-admin` to start the compilation
* For serving the static website, serve the build artifacts created by the compiler, fe. with Nginx

## Example Nginx config

* Assumes the build artifacts are placed in `/var/www/html`
* Assumes you have `php-fpm7.2` running
* Does not yet include HTTPS, only HTTP
* The website build artifacts will be served at `yourwebsite.com`
* The WordPress environment will run at `admin.yourwebsite.com`

```
# Redirect www to non www
server {
    server_name www.yourwebsite.com;
    return 301 $scheme://yourwebsite.com$request_uri;
    listen 80;
}

# Serve the static website artifacts
server {
    listen 80;
    server_name yourwebsite.com;
    root /var/www/html;
    index index.html;
    location / {
        add_header 'Access-Control-Allow-Origin' *;
        try_files $uri $uri/ =404;
        autoindex on;
    }
}

# Admin server block and compiler reverse-proxy
server {
    server_name admin.yourwebsite.com;

    root /var/www/wordpress;
    index index.php;

    location / {
        add_header 'Access-Control-Allow-Origin' *;
        try_files $uri $uri/ /index.php?$query_string;
    }
    location /generate{
        proxy_pass          http://localhost:3000/generate;
        proxy_set_header    Host             $host;
        proxy_set_header    X-Real-IP        $remote_addr;
        proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_read_timeout 1800;
        proxy_connect_timeout 1800;
    }
    location ~ \.php$ {
        # add_header 'Access-Control-Allow-Origin' *;
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
    location ~ /\.ht {
        deny all;
    }
}
```

## License

* `/compiler`: GPL-3.0
* `/wp-framework`: GPL-2.0
* `/wp-management`: GPL-2.0
