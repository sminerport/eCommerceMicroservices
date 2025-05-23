# Base image for the build stage
FROM alpine:latest AS builder

# Create a directory to hold initialization scripts
WORKDIR /app

# Copy initialization scripts from the host to the container
COPY mysql-init /app

# Install required packages
RUN apk add --no-cache openssl

FROM mysql:latest

COPY --from=builder /app /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=admin

# Expose the MySQL port
EXPOSE 3306