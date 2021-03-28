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
OR 
```npm run dev``` to allow for automatic restarts
3. ```npx tailwindcss-cli@latest build ./public/style.css -o ./public/allstyles.css``` to build tailwind
4. To build for production 
    ```NODE_ENV=production npx tailwindcss-cli@latest build ./public/style.css -o ./public/allstyles.css```

check ```.env``` file for environment variables