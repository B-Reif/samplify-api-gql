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

const lineItemRepository = {
	getProjectLineItems: projectId => [mockLineItem],
	getLineItem: id => mockLineItem,
	addLineItem: () => mockLineItem
};

module.exports = { lineItemRepository };
