# React webpack

## Initial project
```
mkdir react-webpack
cd react-webpack
mkdir src
touch src/index.js
touch src/index.html
npm init
...
```
## Setup Webpack
```
npm install path webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
touch webpack.config.js
...
```
## Setup babel
```
npm install @babel/core @babel/preset-env @babel/node @babel/preset-react babel-loader --save-dev
touch .babelrc
...

```
##### add babel-polyfill to get async/await working.
```
npm install --save-dev @babel/polyfill

```

## Install Props Types
```
 npm i prop-types
```

## Setup react
```
npm install react react-dom
```

## Setup style to project
```
npm install style-loader css-loader sass-loader node-sass --save-dev
npm i bootstrap
```

## Setup Router
```
npm install react-router-dom
```

## Setup Redux
```
npm install redux react-redux
```

## Setup Mock Data
__npm-run-all__ : run multiple npm scripts
```
npm install npm-run-all json-server --save-dev
```
Access rest api via http://localhost:3001/courses

## Using redux-thunk handle api

```
npm install redux-thunk
```

__Components can call sync an async actions the same way__


