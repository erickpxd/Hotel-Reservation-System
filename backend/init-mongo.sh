#!/bin/bash
set -e

if [ -f /etc/mongo/mongodb.key ]; then
    chmod 400 /etc/mongo/mongodb.key
    chown 999:999 /etc/mongo/mongodb.key
else
    echo "Keyfile not found, generating..."
    openssl rand -base64 756 > /etc/mongo/mongodb.key
    chmod 400 /etc/mongo/mongodb.key
    chown 999:999 /etc/mongo/mongodb.key
fi

exec docker-entrypoint.sh "$@"
