# Use an official Python runtime as a parent image (which includes a full OS)
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Install Node.js dependencies for the backend
WORKDIR /app/backend
RUN npm install

# Expose the port the Express app runs on
EXPOSE 5000

# Start the Node.js backend
CMD ["npm", "start"]
