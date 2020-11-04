# Spaced Repetition Capstone

By William Wong and Hunter Kreshock

## Summary

A full-stack app created to help a user learn Spanish vocabulary through the use of the spaced repetition technique. Words that you get wrong will be seen more frequently than words you get correct until you master them all. Implemented using singly linked list and completed following strict test specifications. 

## Live Links

[Live Demo](https://spaced-repetition-client.now.sh)

[Server Repo](https://github.com/dc5will/spaced-repetition-server-william-hunter)

## Screenshots 

<img src="./screenshots/spacedrep.png" width="800">

<img src="./screenshots/spacedrep3.JPG" width="800">

<img src="./screenshots/spacedrep2.png" width="800">

<img src="./screenshots/spacedrep4.JPG" width="800">

<img src="./screenshots/spacedrep5.JPG" width="800">

## API Documentation

[Heroku API](https://immense-harbor-42592.herokuapp.com/)

Endpoints: /auth /token /language /head /guess /user

This API is supported by a database with tables the users' information, our language (which can be expanded to feature other languages), and the words to practice.

## Technologies

* Front-end: React.js, React Router, React Context, CSS3, Cypress Testing 
* Back-end: Node.js, Knex.js, Express, Mocha/Chai
* Database: PostgreSQL
* Deployment: Vercel, Heroku, Heroku Postgres
* Development: Git, GitHub

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

## Scripts

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.

<img src="./screenshots/spacedrep-cypress.JPG" width="800">

