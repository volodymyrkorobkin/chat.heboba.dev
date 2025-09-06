# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG BUILD_DIR=dist
ENV BUILD_DIR=${BUILD_DIR}
RUN npm run build

# --- serve ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
