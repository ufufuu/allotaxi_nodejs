//import gMapApi from 'googleMapApiAdapter';
const gMapApi = require("./googleMapApiAdapter");

const { loc } = require("./loc");
const RVGraph = require("./RVGraph");
const RTVGraph = require("./RTVGraph");
const  { AssignTrips } = require("./assignTrips");

class DynamicTripVehicleAssignmentMatcher {
	
    constructor(constraintsParam, useGridWorld = false) {
        this.constraintsParam = constraints_param;
        this.useGridWorld = useGridWorld;
    }

    match(requests, drivers, currentTime = null, showDetails = false) {
		
        const g =  RVGraph(this.constraintsParam, this.useGridWorld);
        g.RVGraphPairwiseRequests(requests);
        if (showDetails) {
            console.log("rrGraph: ", g.requestsGraph);
        }
        g.RVGraphPairwiseDriverRequest(requests, drivers);
        if (showDetails) {
            console.log("rvGraph: ", g.rvGraph);
        }

        const driversInRV = [];
        for (const [d] of g.rvGraph) {
            if (!driversInRV.includes(d)) {
                driversInRV.push(d);
            }
        }

        const g2 = new RTVGraph(this.constraints_param, this.useGridWorld);
        g2.RTVGraphFindFeasibleTrips(g, driversInRV);
        if (showDetails) {
            console.log("rtvGraph: ", g2.rtvGraph);
        }

        const g3 = new AssignTrips(this.constraints_param.maxCost, this.useGridWorld);
        g3.assignment(g2.rtvGraph, showDetails);

        if (showDetails) {
            console.log("assignment: ", g3.assignList);
            console.log("assigned V: ", g3.assignedV);
            console.log("assigned R: ", g3.assignedR);
        }

        for (const [r, d] of g3.assignList) {
            d.ongoingRide.push(r);
        }

        const remainingReq = requests.filter(r => !g3.assignedR.includes(r));
        return [g3.assignList, remainingReq];
    }
}

function Test() {
    const requests = [
        {
            id: '1',
            userId: 'eric',
            startLocation: loc['city_one'],
            endLocation: loc['sai_ying_pun_station'],
            timestamp: 1553701760965,
            isOnCar: false
        },
        {
            id: '2',
            userId: 'tony',
            startLocation: loc['cu'],
            endLocation: loc['hku'],
            timestamp: 1553701760965,
            isOnCar: false
        },
        {
            id: '3',
            userId: 'alex',
            startLocation: loc['cu'],
            endLocation: loc['city_one'],
            timestamp: 1553701760965,
            isOnCar: false
        },
    ];

    const onGoingReq1 = {
        id: '4',
        userId: 'David',
        startLocation: loc['cu'],
        endLocation: loc['hku'],
        timestamp: 1553701060965,
        isOnCar: false
    };

    const drivers = [
        {
            userId: 'Antony',
            location: loc['cu'],
            ongoingRide: [],
            capacity: 2
        },
        {
            userId: 'Elven',
            location: loc['science_park'],
            ongoingRide: [],
            capacity: 2
        }
    ];

    const dMatcher = new DynamicTripVehicleAssignmentMatcher({ maxMatchDistance: 5000, maxCost: 5000 });
    const [M, R] = dMatcher.match(requests, drivers);
    for (const [r, d] of M) {
        console.log(r.userId, '->', d.userId);
    }
    console.log('remaining request: ', R.length);
}
module.exports = new DynamicTripVehicleAssignmentMatcher();