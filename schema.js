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
const typeDefs = gql`
    enum Device {
        mobile
        desktop
        tablet
    }

    enum ExclusionType {
        PROJECT
        TAG
    }
    
    enum ProjectState {
        PROVISIONED
        LAUNCHED
        PAUSED
        CLOSED
    }

    enum LineItemState {
        PROVISIONED
        AWAITING_APPROVAL
        LAUNCHED
        PAUSED
        CLOSED
        INVOICED
    }

    scalar Timestamp
    scalar Email
    scalar CountryISOCode
    scalar LanguageISOCode

    input ProjectCategory {
        surveyTopic: [ID!]!
    }

    input ProjectExclusions {
        type: ExclusionType!
        list: [String!]!
    }

    input Filter {
        attributeId: ID!
        options: [ID!]!
    }

    input Quota {
        attributeId: ID!
        options: [QuotaOption!]!
    }

    input QuotaOption {
        option: [ID!]
        perc: Float!
    }

    input QuotaPlan {
        filters: [Filter!]!
    }

    input QuotaGroup {
        name: String!
        quotas: [Quota!]!
    }

    interface Report {
        attempts: Int
        completes: Int
        screenouts: Int
        overquotas: Int
        starts: Int
        conversion: Float
        remainingCompletes: Int
        actualMedianLOI: Int
        incurredCost: Float
        estimatedCost: Float
    }

    type Query {
		allProjects: [Project]
        project(extProjectId: ID!): Project
        allLineItems(extProjectId: ID!): [LineItem]
        lineItem(extProjectId: ID!, extLineItemId: ID!): LineItem
	}

    type Mutation {
        createProject(
            extProjectId: ID!,
            title: String!,
            notificationEmails: [Email!]!,
            devices: [Device!]!,
            category: ProjectCategory!,
            lineItems: [LineItem!]!,
            exclusions: ProjectExclusions
        ): Project
        buyProject(
            extProjectId: ID!,
            extLineItemId: ID!,
            surveyURL: String!,
            surveyTextURL: String!
        ): LineItem
        closeProject(extProjectId: ID!): Project
        addLineItem(
            extLineItemId: ID!,
            title: String!,
            countryISOCode: CountryISOCode!,
            languageISOCode: LanguageISOCode!,
            surveyURL: String,
            surveyTestURL: String,
            indicativeIncidence: Float!,
            daysInField: Int!,
            lengthOfInterview: Int!,
            requiredCompletes: Int!,
        )
    }

    type Project {
        extProjectId: ID!
        title: String!
        notificationEmails: [Email!]!
        devices: [Device!]!
        category: ProjectCategory!
        lineItems: [LineItem!]!
        exclusions: ProjectExclusions
        state: ProjectState
        stateLastUpdatedAt: Timestamp
        createdAt: Timestamp
        updatedAt: Timestamp
    }

    type ProjectReport implements Report {
        project: Project
        attempts: Int
        completes: Int
        screenouts: Int
        overquotas: Int
        starts: Int
        conversion: Float
        remainingCompletes: Int
        actualMedianLOI: Int
        incurredCost: Float
        estimatedCost: Float
    }

    type LineItemReport implements Report {
        lineItem: LineItem!
        attempts: Int
        completes: Int
        screenouts: Int
        overquotas: Int
        starts: Int
        conversion: Float
        remainingCompletes: Int
        actualMedianLOI: Int
        incurredCost: Float
        estimatedCost: Float
    }
    
    type LineItem {
        quotaPlan: QuotaPlan!
        quotaGroups: [QuotaGroup!]!
        countryISOCode: CountryISOCode!
        languageISOCode: LanguageISOCode!
        state: LineItemState!
        stateReason: String
        stateLastUpdatedAt: Timestamp
        createdAt: Timestamp
        updatedAt: Timestamp
        launchedAt: Timestamp
    }

`;

const resolvers = {};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { schema };
