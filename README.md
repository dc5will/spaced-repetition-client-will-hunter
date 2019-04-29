# Spaced Repetition Capstone

By William Wong and Hunter Kreshock

## Summary

Learn Spanish through the use of the spaced repetition technique. Words that you get wrong will be seen more frequently than words you get correct until you master them all. 

## Live Link

[Live Demo](https://spaced-repetition-will-hunter.now.sh)

[Server Repo](https://github.com/thinkful-ei-armadillo/spaced-repetition-server-william-hunter)

## Technologies

Front-end: React, React Router, HTML, CSS, JavaScript

Back-end: Node.js, Express

Data persistence: PostgresQL

Deployment: Zeit NOW, Heroku

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

## Scripts

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## API Documentation

[Heroku API](https://tranquil-harbor-49659.herokuapp.com/)

Endpoints: /auth /token /language /head /guess /user

This API is supported by a database with tables the users' information, our language (which can be expanded to feature other languages), and the words to practice.
