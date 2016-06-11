#Hapi Typescript ToDo project with authentication and Lab testing

npm init
npm install --save hapi hapi-swagger inert vision blipp
tsc -init
add "outDir": "build" to tsconfig
create build dir at root level
updated package.json to 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsc && node build/server.js"
  },
typings init
typings install dt~hapi --global --save
typings install dt~node --global --save
configured clean build task
npm install gulp-typescript gulp-rimraf gulp-sourcemaps gulp-nodemon --save-dev 

http://blog.hobbytrace.com/using-sequelize-with-express-js-in-typescript/
Adding sequelize typings
typings install dt~sequelize dt~bluebird dt~lodash --save --global

Using sqlite as database
npm install --save sqlite3

Received validation errors on Hapi-sequelize with latest version 3.0.x. Changed it to 2.2.4 in package.json and npm install. Now it works.

npm install gulp-lab --save-dev 

https://medium.com/@thedon/how-test-your-hapi-api-with-lab-b72f6e8ed641#.2o9hbgf48
https://www.rallydev.com/blog/engineering/testing-hapi-using-jasmine

npm install --save boom confidence glue

npm install hapi-auth-jwt2 jsonwebtoken joi --save
typings install dt~joi --global --save