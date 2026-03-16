FROM nginx:1.27-alpine

# Remove default nginx static assets.
RUN rm -rf /usr/share/nginx/html/*

# Copy the application files to nginx web root.
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]