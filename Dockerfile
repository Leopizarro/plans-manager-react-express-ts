# POSTGRESQL DATABASE DOCKERFILE

# syntax=docker/dockerfile:1
FROM postgres:latest

# Expose PostgreSQL port
EXPOSE 5432

# Use the default command to run PostgreSQL
CMD ["postgres"]