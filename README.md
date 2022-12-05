# # SCAFOLDING SPA, PWA, VANILLA JS
En este proyecto crearemos un scafolding de una SPA + PWA, solo con vanilla js. 
Utilizaremos algunas librerías para la facilitación de procesos: webpack
Contendrá los siguientes módulos básicos:
  
  1. Routing 
  2. pages
  3. components

La estructura de carpetas será lo más conveniente para satisfacer una Clean Arqchitecture

# UTILIZACIÓN
  Requisito previo Nodejs instalado: v16.17.0 o superior

  ## primero instalar dependencias
    > npm install

  ## Testing
    > npm run cypress:node 
  
  ## servidor local
    > npm run node:dev

  ## built project salida en ./dist
    > npm run built
  

# PROCEDIMIENTOS E INSTALACIONES
  Requisito previo Nodejs instalado: v16.17.0 

  creamos este archivo
  > touch README.md

  empezamos un proyecto de Node.js
  > npm init

  instalaciones de webpack

  webpack | servidor de webpack | cli de webpack
  > npm install -D webpack              // empaquetador universal
  > npm install -D webpack-dev-server   // servidor de desarrollo ./src que escucha cambios
  > npm install -D webpack-cli          // ayuda con plugins al webpack

  cargador de archivos .html
  > npm install -D html-loader          // import html from "./file.html";
  > npm install -D html-webpack-plugin  // genera el HTML5 con el enlace al bundle.js. Esto genera una etiqueta en el html que enlaza con el bundle.js <script defer src="index_bundle.js"></script> siempr en ./dist

  cargador de archivos .css
  > npm install -D css-loader               // Translates CSS into CommonJS. import css from "file.css"; in component.js
  > npm install -D mini-css-extract-plugin  // import "./style.css"; in component.js

  
  extractor de archivos sass
  > npm install -D node-sass      // tener sass en el proyecto
  > npm install -D sass-loader    // Compiles Sass to CSS
  > npm install -D style-loader   // Creates `style` nodes from JS strings tanto desde css como desde sass

  archivos de imagenes
  > npm install -D file-loader    // carga imagenes en archivos html y js además de las urls de css


  cypress testing
  > npm install -D cypress        // cypress framework

  ## CONFIGURACIONES WEBPACK
  // configuracion webpack.config.js 
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  module.exports = {
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
          // html-loader zero-config
        { // html-loader
          test: /\.html$/i,
          loader: "html-loader",
        },
        { // mini-css-extract-plugin
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        { // css-loader
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        { // tres en uno sass-loader // si instalas este elimina los otros tres de arriba
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        { // file-loader ??? con html-loader deberia bastar
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },

      ],
    },
  };

   --- VER EL ARCHIVO DE CONFIGURACIÓN PARA DEV Y PROD

# ARCHIVOS DE CONFIGURACION PRODUCTION DEVELOPMENT AFINANDO
  ## WEBPACK
  --- webpack.config.js ---
  module.exports = ({ env }) => require(`./webpack.config.${env}.js`);

  --- webpack.config.dev.js ---
  ver archivo en la carpeta ./webpack

  --- webpack.config.prod.js ---
  ver archivo en la carpeta ./webpack

  > mkdir webpack
  > touch ./webpack/webpack.config.js
  > touch ./webpack/webpack.config.dev.js
  > touch ./webpack/webpack.config.prod.js
    ... VER ARCHIVOS

# SCRIPTS NPM
  // testing
  "cypress:open": "cypress open",

  // serve in dev, ./src files
  "node:dev": "webpack serve --config ./webpack/webpack.config.js --env env=dev --open",
  
  // built in prod, ./dist files
  "clean": "rimraf dist",
  "built": "npm run clean && webpack --config ./webpack/webpack.config.js --env env=prod",
  "built": "npm run clean && webpack -d --config ./webpack/webpack.config.js --env env=prod", // con -d lo hace legible

# ARCHIVOS INICIALES
> touch index.html
> touch main.css
> touch main.js

  ./src
    |____ index.html
    |____ main.js
    |____ css||sass
            |____ main.css||main.css  

# ARCHIVOS GENERADOS

  ./dist
   |___ index.html
   |___ bundle.js   
   |___ main.css

# ENLAZAR LOS ARCHIVOS DE LA MANERA TRADICIONAL
  El CSS
    <link rel="stylesheet" href="main.css">
  </head>
  
  El js
    <script src="main.js"></script>
  </body>
  con webpack esto no es necesario, tira de configuración

# ESTRUCTURA DE DIRECTORIOS DEV

  Clean Architecture
  ./src
    |____ assets ./images ./icons ...
    |____ infraestructure
    |     |____ components
    |     |____ pages
    |     |____ localStorage
    |     |____ router
    |____ domain
    |     |____ services
    |____ main.css
    |____ index.html
    |____ main.js

Al final NO vamos a utilizar sass, nuestro html no necesita tener enlaces al css ni al js, de eso se encarga webpack
por eso la configuración, pruebalo:
  Sirve una pagina web a partir de los archivos de src, enlazándolos

  > npm run node:dev

  destruye el ./dist y lo vuelve a construir con las compilaciones necesarias (sass to css) y las cargas de archivos desde ./src
  También hace otras cosas como minificar archivos css y js. 
  En este caso no sirve nada, solo hace el build de la aplicación, eso irá a prdoucción, por tanto la carpeta que se debe llevar desde github a netlify es ./dist
  Por tanto ./ se necesita llevar a producción, ya sea haciendo el > npm run build:prod y luego el git push
  O automatizando en el repo de git para que haga el built y se genere la carpete dist automáticamente tras el test
  
  > npm run built

  para importar el css dentro del js usa esto, junto con el css-loader

  --- main.js ---
  import './src/main.css';

  para importar html en el js usa esto otro, junto con el html loader

  --- main.js --- 
  import './component/template.html';



# SASS ???
crea la carpeta sass dentro de ./src y crea un archivo main.scss
  ## ventajas de usar sass
    Reduce el tiempo para crear y mantener el CSS. Permite tener una organización modular de los estilos, lo cual es vital para proyectos grandes. Proporciona estructuras avanzadas propias de los lenguajes de programación, como variables, listas, funciones y estructuras de control. Permite generar distintos tipos de salida, comprimida, normal o minimizada, trabajando tanto en desarrollo como en producción, además se hace una forma muy fácil. Permite vigilar los ficheros, de tal manera que, si ha habido un cambio en la hoja de estilos, se regenera automáticamente (modo watch).
    Tiene muy pocas dependencias, sobre todo la nueva versión, que es dart-sass. En las anteriores versiones se dependía de muchas librerías de Ruby y era un poco engorroso de instalar, pero con la nueva versión, la instalación es muy fácil.

  ## para este proyecto no va a ser necesario
  

Existen muchas herramientas asociadas, muchas librerías hechas con Sass y una comunidad muy importante de usuarios.


# webpack dev server
> npx webpack-dev-server // si webpack.config.js está en la raíz

> npm run node:dev // con la configuración nueva

# web components
ver el ejemplo en ./components/prueba.js


# GIT PRIMER COMMIT ESCAFOLDING
> git init
> touch .gitignore
> echo "# Generic Node" >> .gitignore
> echo "node_modules" >> .gitignore

tendremos las siguientes ramas
  main (rama principal en producción)
  develop (rama de soluciones locales, contendrá la ultima versión main + features + tests ok)
  feature/ (muchas ramas 1 por cada feature)


  > git init
  > git config --local user.email "desarrolloaplicacionesweb.jmlb@gmail.com"
  > git config --local user.name "JUANLUNABLANCO"
  > git add .
  > git commit -m "scafolding with routing. first commit"
  > git branch -M main
  > git remote add origin https://github.com/JUANLUNABLANCO/scafolding-pwa-spa.git
  > git push -u origin main

  
# PRIMERAS PRUEBAS DE ROUTING
seguiremos TDD, creando primero los tests,que fallarán, luego implementaremos el código, hasta que pase los tests y después refactorizaremos, subiendo el resultado a la feature/correspondiente
usaremos cypress, por su potencia, sencillez y su interfaz gráfica.

solicitando un pull request a develop, en la cual se deberían realizar otros tests de integración o e2e

y por último en main se deben pasar los tests atacando la app en producción, esto no lo implementaremos de momento,

Todo esto podría ser automatizado con CI/CD pipelines, ...AZURE DEVOPS, o cualquier otro, de momento lo estamos realizando a mano.

se debería probar: 
  1. PRUEBAS SOBRE PAGES Y COMPONENTS 
  2. PRUEBAS DE STORAGE
  3. PRUEBAS DE PWA
  








 
