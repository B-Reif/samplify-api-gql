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

const projectRepository = {
	getProjectById: id => mockProject,
	getAllProjects: () => [mockProject],
	createProject: () => mockProject,
	closeProject: () => mockProject
};

module.exports = { projectRepository };
