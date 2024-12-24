# Microservices Architecture

This project implements a microservices-based system with the following services:

- Frontend (Port 80)
- Auth Service
- User Profile Service
- Project Service
- Redis Cache
- RabbitMQ Message Broker
- PostgreSQL Database

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. Clone the repository

2. Start all services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Web Interface: http://localhost
   - RabbitMQ Management: http://localhost:15672 (guest/guest)

## Services Architecture

### Frontend
Modern React application with Material-UI, providing a responsive user interface for:
- User authentication
- Project management
- Profile management
- Real-time notifications

### Auth Service
Handles user authentication and authorization using JWT tokens.

### User Profile Service
Manages user profiles and portfolios.

### Project Service
Manages projects, roles, and media files.

## Development

To make changes to the frontend:
1. Modify the code in the `frontend` directory
2. Rebuild and restart the containers:
   ```bash
   docker-compose build frontend
   docker-compose up -d frontend
   ```

To make changes to any backend service:
1. Modify the code in the respective service directory
2. Rebuild and restart the service:
   ```bash
   docker-compose build [service_name]
   docker-compose up -d [service_name]
   ```

## Security

- All sensitive information is stored in environment variables
- JWT tokens are used for authentication
- Services communicate over an internal Docker network
- CORS is properly configured
- SSL/TLS should be configured in production

## Scaling

The architecture is designed to be horizontally scalable. Each service can be scaled independently:
```bash
docker-compose up -d --scale [service_name]=N
