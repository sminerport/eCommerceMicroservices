# eCommerce Microservices

This repository aggregates several services that together form a simple eCommerce platform. The microservices are stored as Git submodules and can be developed and deployed individually.

## Repository Structure

- **eCommerceSolution.OrdersService** – Git submodule containing the Orders microservice.
- **eCommerceSolution.ProductsService** – Git submodule containing the Products microservice.
- **eCommerceSolution.UsersService** – Git submodule containing the Users microservice.
- **frontend/** – Angular application that consumes the APIs from the above services.
- **mongodb/**, **mysql/**, **postgres/** – Docker build contexts used to create database containers with sample data.
- **aks/** – Kubernetes manifests for running all services in AKS or another Kubernetes environment.
- **docker-compose-build.yaml** – Compose file that builds and starts the entire stack for local development.

Each submodule has its own README with detailed instructions. The sections below summarize their purpose.

## Products Microservice
This service exposes CRUD operations for products via an ASP.NET Core API. It uses MySQL for storage and publishes events to RabbitMQ. The solution contains:
- `ProductsMicroService.API` – the web API project.
- `BusinessLogicLayer` and `DataAccessLayer` – service logic and EF Core data access.
- `ProductsUnitTests` – xUnit tests.
- `k8s/` – manifests for deployment.

See the submodule for usage details, environment variables and Docker commands.

## Orders Microservice
Handles order creation and querying. It stores data in MongoDB and caches in Redis. Components include:
- `OrdersMicroservice.API` – REST API under `/api/Orders`.
- `BusinessLogicLayer`, `DataAccessLayer` and RabbitMQ consumers.
- `APIGateway` – Ocelot gateway for cross‑service calls.
- `k8s/` – Kubernetes manifests.

The service can be started via Docker Compose or `dotnet run`. Consult the submodule README for endpoints and testing instructions.

## Users Microservice
Provides user authentication and retrieval backed by PostgreSQL. Projects inside the solution:
- `eCommerce.API` – ASP.NET Core API exposing `/api/auth` and `/api/users`.
- `eCommerce.Core` – domain models and services.
- `eCommerce.Infrastructure` – Dapper data layer.
- `UsersUnitTests` – example tests.
- `k8s/` – deployment manifests.

Environment variables for the PostgreSQL connection are required when running the service or building its Docker image. More information is available in the submodule README.

## Frontend
The `frontend` folder contains an Angular application generated with Angular CLI 17. It communicates with the backend services through the API Gateway. Standard Angular commands such as `ng serve`, `ng build` and `ng test` are available via the `package.json` scripts.

## Local Development
To build and run all services with their databases locally, use the provided compose file:

```bash
docker compose -f docker-compose-build.yaml up --build
```

This will build the database images from the folders mentioned above and start the three microservices, RabbitMQ, Redis and the API Gateway. The compose file maps service ports to the host so that the APIs and database instances are accessible on localhost.

## Kubernetes Deployment
Manifests under `aks/` describe Deployments and Services for running the entire stack on Kubernetes. They reference the container images built in CI/CD and configure ConfigMaps and Secrets for environment variables.

---

This README offers a high level overview. For detailed instructions on building, running or testing each microservice, refer to the README contained in its corresponding submodule.
