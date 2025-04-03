FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

# Make the entrypoint script executable
RUN chmod +x start.sh

# Set the entrypoint script
ENTRYPOINT ["sh", "./start.sh"]

#CMD ["npm", "run", "dev"]