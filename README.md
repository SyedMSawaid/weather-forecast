# **Project Documentation**

## **Table of Contents**

- [**Overview**](#overview)
- [**Backend**](#backend)
  - [Tools and technologies](#tools-and-technologies)
  - [API Documentation](#api-documentation)
    - [Cities Management](#cities-management)
    - [Weather Management](#weather-management)
  - [Database](#database)
  - [Environment Variables](#environment-variables)
- [**Frontend**](#frontend)
  - [Tools and technologies](#tools-and-technologies-1)
  - [State Management](#state-management)
    - [Features](#features)
  - [Environment Variables](#environment-variables-1)
- [**Development**](#development)
  - [Setting up the Project](#setting-up-the-project)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
- [**Deployment**](#deployment)
- [**Docker**](#docker)

## **Overview**

This project is a full-stack application built with Next.js (frontend) and Adonis.js (backend). This application uses data from the [OpenMeteo API](https://open-meteo.com) for weather information. The application allows users to manage weather data, including creating, reading, updating, and deleting (CRUD) operations, as well as tagging weather data and visualizing it based on those tags.

### Application URLs

The application can be accessed via the following URLs:

- **Frontend**: `http://localhost:3000`
- **Backend**: https://weather-backend.fly.dev

> **Note**: The application might be in a sleeping state. If it doesn't respond the first time, please try again.

## **Backend**

### Tools and technologies

- Adonis.js (Web Framework)
- LucidORM (Database ORM)
- Adonisjs-Scheduler (Cron jobs)

### API Documentation

The backend API is built using Adonis.js. The API endpoints are as follows:

#### Cities Management

- **GET /cities**: Get all cities
- **POST /cities**: Create a new city
- **GET /cities/:id**: Get a single city
- **PUT /cities/:id**: Update a city
- **DELETE /cities/:id**: Delete a city

#### Weather Management

- **GET /cities/:id/weather**: Get city weather data by tag
- **POST /cities/weather**: Create weather data for multiple cities
- **POST /cities/:id/weather**: Create weather data for a single city
- **GET /cities/:id/weather/tags**: Get all tags for a city's weather data
- **PUT /cities/weather/:id/tag**: Add tag to weather data

### Database

The database models are defined using LucidORM. The database models are as following:

- **City**: Represents a city in the system, with attributes such as `id`, `name`, `latitude`, `longitude`, and timestamps.
- **CityWeather**: Represents weather data for a city, with attributes such as `id`, `cityId`, `temperature`, `weatherCode`, `tag`, `timestamp`, and timestamps.

### Environment Variables

The following environment variables are used in the backend:

- **PORT**: The port number (default: 3333)
- **HOST**: The host address (default: localhost)
- **APP_KEY**: Application encryption key
- **NODE_ENV**: Environment mode
- **TZ**: Timezone setting
- **LOG_LEVEL**: Logging level

## **Frontend**

### Tools and technologies

- Next.js (v15)
- Shadcn (components and UI)
- Tailwind (styling)
- Tanstack React Query (APIs and state management)
- react-hook-form (form handling)
- zod (form validation)

### State Management

The project doesn't use a dedicated state management library. It relies on state management provided by React Query, react-hook-forms and useState hook.

#### Features

- **Cities Overview (/cities)**: A page that displays all cities with their current weather conditions and allows searching cities.
- **Create City (/cities/create)**: Allows users to add a new city by providing name, latitude, and longitude.
- **City Details (/cities/[id])**: Shows detailed weather information for a specific city, including:
  - Current temperature and weather condition
  - Temperature history chart
  - Weather data table with tagging capability
- **Edit City (/cities/[id]/edit)**: Allows updating city information (name, latitude, longitude)
- **Weather Visualization (/visualize)**: A dedicated page for visualizing weather data with filtering by city and tags

### Environment Variables

The following environment variables are used in the frontend:

- **NEXT_PUBLIC_BACKEND_BASE_URL**: The base URL for the backend API

## **Development**

### Setting up the Project

#### Backend

1. Clone this repository.
2. Navigate to the `backend` directory: `cd backend`
3. Install dependencies: `npm install`
4. Run migrations and data seeding with `npm run prepare-database`
5. Start the backend server using `npm run dev`

#### Frontend

1. Clone this repository (if not already done).
2. Navigate to the `frontend` directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the frontend development server: `npm run dev`

## **Deployment**

The applications can be run in standalone mode, docker containers or docker-compose service.

### Fly.io

To deploy this project to Fly.io, install the [Fly CLI tool](https://fly.io/docs/flyctl/install/) and log in using the `fly login` command.

Once logged in, simply run `./launch.sh` in the root of the project to deploy. The script will prompt you with a few questions, allowing you to customize your deployment experience.

> **Note**: Ensure that the `launch.sh` script has executable permissions. You can set the executable permission using the command `chmod +x launch.sh`.

Since the backend URL will likely be different, you need to edit the `frontend/fly.toml` file and replace the `NEXT_PUBLIC_BACKEND_BASE_URL` with the URL of your backend.

To redeploy, navigate to the `frontend` directory and run `fly deploy --ha=false`.

## **Docker**

This project can be run as a docker-compose service which will run the backend and frontend containers and it is the easiest way to run the project.

Run `docker-compose up` or `docker compose up` (depends on your OS and docker version) in the project's root directory (where docker-compose.yml file is located).
