# Base image for the build stage
FROM alpine:latest as builder
WORKDIR /app
COPY postgres-init ./
RUN apk add --no-cache openssl

# Base image for the final PostgreSQL image
FROM postgres:latest

# Copy initialization scripts from the build stage
COPY --from=builder /app /docker-entrypoint-initdb.d

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=eCommerceUsers

# Expose the PostgreSQL port
EXPOSE 5432