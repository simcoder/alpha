#### Stage 1
FROM node:8.11.4 as builder
LABEL author="simcoder"
WORKDIR /app
COPY . .
RUN npm rebuild node-sass

RUN npm install

ARG env=production

## Build appHub
RUN npm run build -- --aot --configuration=$env
# ## Build payments
# RUN npm run build payments -- --aot --configuration=$env
# ## Build Dashboard
# RUN npm run build dashboard -- --aot --configuration=$env

### Stage 2
FROM nginx:1.13.3-alpine
VOLUME /var/cache/nginx

# COPY nginx.conf /etc/nginx/nginx.conf
## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
# COPY dist/ROAM .
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist/ROAM /usr/share/nginx/html
# ## copy payments app
# COPY --from=builder /app/dist/payments /usr/share/nginx/html/payments
# ## copy dashboard app
# COPY --from=builder /app/dist/dashboard /usr/share/nginx/html/dashboard

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]