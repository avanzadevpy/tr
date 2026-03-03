# Etapa 1: Construcción (Instala dependencias y compila Vite usando Node 22)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Web (Nginx para servir los archivos estáticos)
FROM nginx:alpine
# Copia los archivos de la carpeta "dist" que generó Vite al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración vital para que funcione el React Router (evita el error 404 al recargar)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]