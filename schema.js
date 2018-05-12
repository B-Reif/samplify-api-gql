const { makeExecutableSchema } = require("graphql-tools");
const fetch = require("node-fetch");

const gql = String.raw;

/**
 * TODO:
 * Link Create Project mutation with Add Line Item mutation
 * Add endLinks field to line items
 * Add pricing and feasibility
 * Add updateProject, updateLineItem
 * Add "data endpoints" (countries/languages, attributes, categories)
 */

// Construct a schema, using GraphQL schema language
const typeDefs = gql``;

const resolvers = {};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { schema };
