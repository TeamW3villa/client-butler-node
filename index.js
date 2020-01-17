var _ = require('underscore');

const maximunHours = 8; // maximum allowed hours for a butler
var assignedRequests = {butlers: [], spreadClientIds: []}; // final set of assigned requests

const exampleRequests = [
	{ clientId: 1, requestId: '666', hours: 6 },
	{ clientId: 2, requestId: '111', hours: 1 },
	{ clientId: 1, requestId: '444', hours: 4 },
	{ clientId: 1, requestId: '222', hours: 2 },
	{ clientId: 1, requestId: '222', hours: 2 },
	{ clientId: 3, requestId: '999', hours: 9 },
	{ clientId: 1, requestId: '101010', hours: 10 },
];

// Insert a new set of request as assigned
function insertAssignmentSet (requestSets) {
	assignedRequests['butlers'].push({
		requests: requestSets.request
	});

	requestSets.spreadClientIds.forEach(clientId => {
		assignedRequests['spreadClientIds'].push(clientId);
	});

	assignedRequests['spreadClientIds'] = _.uniq(assignedRequests['spreadClientIds']);
}


// Process the request array to create a matching set of requests for a butler but not more than 8 hours
function allocateAndReport(requests) {
	var sortedRequests = _.sortBy(requests, 'hours').reverse();
	var remainingRequest = []; // to filter requests that are not assigned to butler yet
	var requestSet = {request: [], spreadClientIds: []}; // create a request set to get an equal or near to maximum hours
	var totalHoursSpend = 0; // to calculate the remaining matching set of hours against a processing request
	
	// Start processing the requests
	sortedRequests.forEach(request => {

		if(request['assigned']) { // if request is already assigned do not process it further
			return true;
		}

		// If request is more than maximunHours then directly insert it
		if (request.hours >= maximunHours) {
			request['assigned'] = true; // not to use this request again if already assigned to butler
			insertAssignmentSet({
				request: [request.requestId], 
				spreadClientIds: [request.clientId]
			});
		} else { // if request if of less than maximunHours then create a matching set of requests
			remainingRequest = _.filter(sortedRequests, (req) => { return !req['assigned']});
			requestSet = {request: [], spreadClientIds: []};
			totalHoursSpend = 0; // reset every time when creating a fresh set of request
			for (var i = 0; i < remainingRequest.length; i++) {
				if (totalHoursSpend + remainingRequest[i].hours <= maximunHours) {
					totalHoursSpend += remainingRequest[i].hours;
					remainingRequest[i]['assigned'] = true;
					requestSet['request'].push(remainingRequest[i].requestId);
					requestSet['spreadClientIds'].push(remainingRequest[i].clientId);
				}
			}
			insertAssignmentSet(requestSet);
		}
	});

}

// Run the requests assignment processing
allocateAndReport(exampleRequests);

// Logging the assigned request sets for butler
console.log(JSON.stringify(assignedRequests))