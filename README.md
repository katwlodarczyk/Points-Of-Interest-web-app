# Points of Interest
### web application development COM518
#

This application allows users to look up information on places to visit whilst on holiday or in their neighbourhood.
Database includes places like world cities, historical sites, countryside areas, recommended restaurans, pubs, bars. 
Users can also add new points of interest to the database.
#

### To run the application: 
1. ```npm install```  to install all necessary packages
2. ```node app.js``` to start the server 
3. ```npx tailwindcss-cli@latest build ./public/style.css -o``` to build
4. To build for production 
    ```NODE_ENV=production npx tailwindcss-cli@latest build ./src/tailwind.css -o ./dist/tailwind.css```