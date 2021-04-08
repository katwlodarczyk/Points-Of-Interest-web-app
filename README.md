# Points of Interest
### web application development
#

This application allows users to look up information on places to visit whilst on holiday or in their neighbourhood.
Database includes places like world cities, historical sites, countryside areas, recommended restaurants, pubs, bars. 
Users can also add new points of interest to the database, add a review or recommend a place.
#
Technologies used:
- Node.js
- Express.js
- MySQL
- TailwindCSS
#

### To run the application: 
1. Clone or download the repo
2. ```npm install```  to install all necessary packages
3. ```node app.js``` to start the server 
OR 
```npm run dev``` to allow for automatic restarts
4. Run ```npx tailwindcss-cli@latest build ./public/style.css -o ./public/allstyles.css``` to build tailwind
5. To build for production 
    ```NODE_ENV=production npx tailwindcss-cli@latest build ./public/style.css -o ./public/allstyles.css```

check ```.env``` file for environment variables