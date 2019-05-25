# WebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker

1. Build Docker image - ```docker build -t barna1988/keep-note-final-webapp .```
2. Run Docker image (docker port = 4200(1) - app port = (4200)) - ```docker run -p 4200:4200 barna1988/keep-note-final-webapp```
3. App will be accessible using - http://localhost:4200
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push barna1988/keep-note-final-webapp:latest```
