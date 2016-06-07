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
npm install gulp-typescript gulp-rimraf gulp-sourcemaps --dev-save
npm install gulp-nodemon --dev-save