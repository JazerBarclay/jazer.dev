#!/bin/bash

# Generate ssl certificate via letsencrypt using dns challenge for root domain and all subdomains
certbot certonly --manual --preferred-challenges=dns -m admin@jazer.co.uk --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d "*.jazer.dev" -d "jazer.dev"