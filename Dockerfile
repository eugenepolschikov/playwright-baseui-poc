# Use a Node.js base image
FROM mcr.microsoft.com/playwright:v1.37.0-focal

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Command to run tests
CMD ["npx", "playwright", "test"]



