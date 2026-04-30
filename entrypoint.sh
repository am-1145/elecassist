#!/bin/sh

# This script creates a config.js file containing the environment variables
# provided by Google Cloud Run at runtime, injecting them into the global window.ENV object.

echo "window.ENV = {" > /usr/share/nginx/html/config.js
echo "  VITE_GEMINI_API_KEY: '${VITE_GEMINI_API_KEY}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GOOGLE_MAPS_API_KEY: '${VITE_GOOGLE_MAPS_API_KEY}'" >> /usr/share/nginx/html/config.js
echo "};" >> /usr/share/nginx/html/config.js

# Execute the main process (Nginx)
exec "$@"
