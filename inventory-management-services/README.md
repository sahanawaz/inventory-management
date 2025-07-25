# Inventory Management Service 

A Spring Boot application for managing users, inventory, and billing with PostgreSQL.

## Features

- User, Inventory, and Billing management
- RESTful API endpoints
- PostgreSQL database integration
- Database initialization with schema and functions on startup

## Prerequisites

- Java 17+
- Maven 3.6+
- PostgreSQL

## Setup

1. Clone the repository:
2. Create a DB in PostgreSQL:
   ```sql
   CREATE DATABASE shine_collection;
   ```
   
3. Update the `application.properties` file with your PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/shine_collection
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```
4. Run the dommy.sql script to create the necessary tables and functions:
   ```sql
   src/main/resources/db/dommy.sql
   ```

