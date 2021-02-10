#!/bin/bash

# Kill any running docker process for blogdb
docker stop blogdb 2>/dev/null
docker rm blogdb 2>/dev/null

# Run new container under blogdb
docker run -p 5432:5432 --name blogdb -e POSTGRES_USER=web -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=blog -d postgres
