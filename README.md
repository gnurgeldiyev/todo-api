# To-Do App API

An Web API built with Node Express.js to get/post/update/delete To-Do tasks


### Prerequisites

- [Docker](https://docs.docker.com/engine/) & [Docker Compose](https://docs.docker.com/compose/)


### How to run 

- Clone the repo
- `cd repo_folder`
- Run `docker-compose up -d`

## Running the tests

To run the tests you should have a running MongoDB server in your machine. You can edit the `ENV` value in `test.env` file.

```shell
yarn install

yarn test
```

### API endpoints

- ✅ Add a new task `POST - /v1/tasks`
- ⭕️ Get tasks `GET - /v1/tasks`
- ⭕️ Update a task `PUT - /v1/tasks/:id`
- ✅ Delete a task `DELETE - /v1/task/:id`

### Possible improvement

- Adding get/getMany/update endpoints
- Running up a MongoDB server for testing rather than depending on local MongoDB server. This will be necessary when we enable CI/CD pipelines
- More test cases (there is always a case to test automatically :D)
- Types for each data object
- Sending log data to elastic-search or similar env.
- Monitoring application performance 

## Built With

* [Express.JS](https://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/) - Persistent storage
* [Mongoose](https://mongoosejs.com/) - MongoDB ODM
* [Joi](https://joi.dev/api/) - Request validation
* [Winston](https://github.com/winstonjs/winston) - Logger
* [Jest](https://jestjs.io/) - Testing framework
* [Supertest](https://github.com/visionmedia/supertest) - HTTP assertions
