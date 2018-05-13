const { makeExecutableSchema } = require("graphql-tools");
const fetch = require("node-fetch");

const gql = String.raw;

/**
 * TODO:
 * Specify Mutation type and resolvers
 * Add endLinks field to line items
 * Add pricing and feasibility
 * Add updateProject, updateLineItem
 * Add "data endpoints" (countries/languages, attributes, categories)
 * Add actual API
 */

//     type Mutation {
//         createProject(
//             extProjectId: ID!,
//             title: String!,
//             notificationEmails: [Email!]!,
//             devices: [Device!]!,
//             category: ProjectCategory!,
//             lineItems: [LineItem!]!,
//             exclusions: ProjectExclusions
//         ): Project
//         buyProject(
//             extProjectId: ID!,
//             extLineItemId: ID!,
//             surveyURL: String!,
//             surveyTextURL: String!
//         ): LineItem
//         closeProject(extProjectId: ID!): Project
//         addLineItem(
//             extLineItemId: ID!,
//             title: String!,
//             countryISOCode: CountryISOCode!,
//             languageISOCode: LanguageISOCode!,
//             surveyURL: String,
//             surveyTestURL: String,
//             indicativeIncidence: Float!,
//             daysInField: Int!,
//             lengthOfInterview: Int!,
//             requiredCompletes: Int!,
//         )
//     }

const mockProject = {
	extProjectId: "0",
	title: "Mock Project",
	countryISOCode: "US",
	languageISOCode: "EN",
	notificationEmails: [],
	devices: [],
	category: {
		surveyTopic: "Mock"
	},
	lineItems: [],
	exclusions: {
		type: "PROJECT",
		list: []
	},
	state: "PROVISIONED",
	stateLastUpdatedAt: "00:00",
	createdAt: "00:00",
	updatedAt: "00:00"
};

const mockLineItem = {
	state: "PROVISIONED",
	stateReason: "Mock",
	stateLastUpdatedAt: "00:00",
	createdAt: "00:00",
	updatedAt: "00:00",
	launchedAt: "00:00",
	quotaPlan: {
		filters: []
	},
	quotaGroups: []
};

const typeDefs = gql`
	# Enums
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

	# Scalars
	scalar Timestamp

	scalar Email

	scalar CountryISOCode

	scalar LanguageISOCode

	type ProjectCategory {
		surveyTopic: [ID!]!
	}

	type Filter {
		attributeId: ID!
		options: [ID!]!
	}

	type ProjectExclusions {
		type: ExclusionType!
		list: [String!]!
	}

	type QuotaGroup {
		name: String!
		quotas: [Quota!]!
	}

	type Quota {
		attributeId: ID!
		options: [QuotaOption!]!
	}

	type QuotaOption {
		option: [ID!]
		perc: Float!
	}

	type QuotaPlan {
		filters: [Filter!]!
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
		allProjects: [Project!]
		project(extProjectId: ID!): Project
		allLineItems(extProjectId: ID!): [LineItem!]
		lineItem(extProjectId: ID!, extLineItemId: ID!): LineItem
	}

	type Mutation {
		test: String
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

	type LineItem {
		state: LineItemState!
		stateReason: String
		stateLastUpdatedAt: Timestamp
		createdAt: Timestamp
		updatedAt: Timestamp
		launchedAt: Timestamp
		quotaPlan: QuotaPlan!
		quotaGroups: [QuotaGroup!]!
	}

	type Project {
		extProjectId: ID!
		title: String!
		countryISOCode: CountryISOCode!
		languageISOCode: LanguageISOCode!
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
`;

const resolvers = {
	Query: {
		allProjects: () => [mockProject],
		project: id => mockProject,
		allLineItems: extProjectId => [mockLineItem],
		lineItem: (extProjectId, extLineItemId) => mockLineItem
	},
	Report: {
		__resolveType(obj) {
			if (obj.project) return "ProjectReport";
			if (obj.lineItem) return "LineItemReport";
			return null;
		}
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { schema };
