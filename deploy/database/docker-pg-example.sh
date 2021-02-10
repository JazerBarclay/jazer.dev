#!/bin/bash

# Kill any running docker process for blogdb
docker stop blogdb 2>/dev/null
docker rm blogdb 2>/dev/null

# Run new container under blogdb
# -v schema.sql:/docker-entrypoint-initdb.d/1-schema.sql -v seed.sql:/docker-entrypoint-initdb.d/2.seed.sql 
docker run -v $PWD/schema.sql:/docker-entrypoint-initdb.d/1-schema.sql -v $PWD/seed.sql:/docker-entrypoint-initdb.d/2.seed.sql -p 5432:5432 --name blogdb -e POSTGRES_USER=web -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=blog -d postgres
