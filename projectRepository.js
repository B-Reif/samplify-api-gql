const { makeClient } = require("./samplifyClient");
const client = makeClient();

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

async function createProject(root, obj, context) {
	const response = await client.createProject(obj);
	const project = response.data;
	console.log(project);
	return project;
}

const projectRepository = {
	getProjectById: id => mockProject,
	getAllProjects: () => [mockProject],
	createProject,
	closeProject: () => mockProject
};

module.exports = { projectRepository };
