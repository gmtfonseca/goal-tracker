# Goal tracker

Simple REST API to track personal goals. This is an educational project which is intended to present a NodeJS + Express + Mongoose architecture that I've personally found to be really clean for small and medium-sized projects.

## Motivation
When I first started writing my web servers in Node.js, I struggled to find a good architecture to guide the development of my REST APIs. They were either extremely simple, therefore messy for a medium to large-sized project, or slightly outdated (e.g. most of them didn't make usage of ES8 async operation).

These issues motivated me to build a simple REST API to guide new Node.js developers on their projects. Since testing is a must nowadays, I also made sure to include integration tests for all the routes.

## Main stack
Since this is supposed to be a template for REST APIs, I included some of the most popular libraries I've faced:

- [express](https://github.com/weavejester/compojure): Fast, unopinionated, minimalist web framework for node
- [mongoose](https://github.com/Automattic/mongoose): MongoDB object modeling designed to work in an asynchronous environment
- [express-async-handler](https://www.npmjs.com/package/express-async-handler): Simple middleware for handling exceptions inside of async express routes
- [winston](https://github.com/winstonjs/winston): A logger for just about everything

Check the package.json file for more details and also my dev dependencies.

## Running

To start a web server for the application, run:

    npm start
    
## Testing

    npm test    

## Future work

Unfortunetely, I still didn't get the time to implement Authentication and Authorization, so I'll probably be doing this in the near future.
