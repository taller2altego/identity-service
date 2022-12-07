# User Microservice Fiuber
[![codecov](https://codecov.io/github/taller2altego/identity-service/branch/main/graph/badge.svg?token=D7FDPQ58NM)](https://codecov.io/github/taller2altego/identity-service)

## Dependencias

Utilizamos [npm](https://www.npmjs.com/) como gestor de paquetes, y [Docker](https://www.docker.com/) para el despliegue local.


## Instalacion:

Clonar el repositorio e instalar paquetes:

    $ git clone git@github.com:taller2altego/identity-service.git
    $ npm install

Levantar el API Gateway con Docker local:

    $ npm run docker-up

Para instalar el linter:

    $ npm run prepare

## Test

Se pueden correr los test con:

    $ npm run coverage

## Linter
El linter utilizado es [ESlint](https://eslint.org/).

Para correr el linter:

    $ npm run lint

Para solucionar errores automaticos:

    $ npm run lint:fix

## Deploy app a Heroku

El deploy es manual, se debe instalar la CLI de Heroku, logearse en ella y configurar el remote

    $ heroku git:remote -a altego-fiuber-identity-service

Para deployar:

    $ git push heroku main

Y para ver los ultimos logs:

    $ heroku logs --tail

## Base de datos: Redis

La base de datos usada es [Redis](https://redis.io/).    
