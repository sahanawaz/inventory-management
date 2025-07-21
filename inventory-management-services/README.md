# Shine Collection Services

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
   CREATE DATABASE shine_collection_services;
   ```
   
3. Update the `application.properties` file with your PostgreSQL credentials:
   ```properties
   