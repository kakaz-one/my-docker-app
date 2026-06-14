FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
ENV DOCKER_BUILD=true
RUN npm ci
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
