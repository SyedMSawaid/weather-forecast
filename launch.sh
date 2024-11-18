#!/bin/bash

# Navigate to the backend folder and run fly launch
cd backend
fly launch --ha=false

# Navigate to the frontend folder and run fly launch
cd ../frontend
fly launch --ha=false