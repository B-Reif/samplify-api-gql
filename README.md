# samplify-api-gql

GraphQL wrapper around the Research Now [Samplify API](https://researchnow.github.io/samplifyapi-docs/).

Work in progress.

### Setup

* Clone the repository.
* In the same directory, clone [samplify-node](https://github.com/b-reif/samplify-node). This library will look for a dependency called `../samplify-node`.
* Run `yarn install` or `npm install` in the `samplify-api-gql` directory.
* In the root directory, create a file named `.env`. This file will contain your environment variables for API access.
* Specify your CLIENT_ID, USERNAME, PASSWORD, and URL. (See the .env.pattern file for an example.)

### Usage

* Start the server with `node index.js`. The server will start at `localhost:3000`.
* Browse the API with graphiql at `localhost:3000/graphiql`.
