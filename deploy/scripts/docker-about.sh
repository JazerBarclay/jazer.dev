#!/bin/bash

# Kill any running docker process for about.jazer.dev
docker stop about.jazer.dev 2>/dev/null
docker rm about.jazer.dev 2>/dev/null

# Run new container under about.jazer.dev
docker run -d -p 8000:80 --name about.jazer.dev -v /var/www/about:/var/www/html php:7.2-apache