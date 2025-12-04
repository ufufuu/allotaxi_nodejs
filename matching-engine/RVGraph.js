const { getDistance, getDistanceMatrix } = require("./googleMapApiAdapter");
const { gridWorldDistance, gridWorldDistanceMatrix }  = require("./utils");

//import { getDistance, getDistanceMatrix } from 'googleMapApiAdapter';
//import { gridWorldDistance, gridWorldDistanceMatrix } from 'utils';

class RVGraph {
    constructor(constraints_param, useGridWorld = false) {
        /*
        constraints_param format:
        {
            // max distance between driver's location and request's start point allowed to be matched
            maxMatchDistance: Number,
            maxCost: Number
        }
        */
        this.rvGraph = [];
        this.requestsGraph = [];
        this.maxMatchDistance = constraints_param.maxMatchDistance;
        this.maxCost = constraints_param.maxCost;
        this.useGridWorld = useGridWorld;
    }

    _getDistanceMatrix(origins, destinations) {
        if (this.useGridWorld) {
            return gridWorldDistanceMatrix(origins, destinations);
        } else {
            return getDistanceMatrix(origins, destinations);
        }
    }

    _getDistance(origin, destination) {
        if (this.useGridWorld) {
            return gridWorldDistance(origin, destination);
        } else {
            return getDistance(origin, destination);
        }
    }

    satifiedAllConstraints(minShareDistance, separatedDistance, waitingDistance) {
        if (minShareDistance < separatedDistance) {
            return true;
        }
        // waitingTime: this.maxMatchDistance
        if (waitingDistance < this.maxMatchDistance) {
            return true;
        }
        return false;
    }

    /*
    Input
        requests format:
        [{  id: string,
            userId: string,
            startLocation: {
                latitude: number,
                longitude: number
            },
            endLocation: {
                latitude: number,
                longitude: number
            },
            timestamp: number
        }]

    Output:
    [
        ['request1', 'request2'],
        ['request1', 'request3']
    ]
    */
    RVGraphPairwiseRequests(rideRequests) {
        // Generate all pairwise combinations of rideRequests
        for (let i = 0; i < rideRequests.length; i++) {
            for (let j = i + 1; j < rideRequests.length; j++) {
                const request = rideRequests[i];
                const request2 = rideRequests[j];

                // create locationList containing two requests' start and end points
                const locationList = [
                    request.startLocation,
                    request2.startLocation,
                    request.endLocation,
                    request2.endLocation
                ];

                // calculate the matrix with those four points
                const distanceMatrix = this._getDistanceMatrix(locationList, locationList);

                const separatedRideDistance = distanceMatrix[0][2] + distanceMatrix[1][3];

                const possibleDistance = [];
                for (let a = 0; a < 2; a++) {
                    for (let b = 1; b >= 0; b--) {
                        if (a === b) continue;
                        for (let c = 2; c < 4; c++) {
                            for (let d = 3; d > 1; d--) {
                                if (c === d) continue;
                                const pathDistance = distanceMatrix[a][b] + distanceMatrix[b][c] + distanceMatrix[c][d];
                                possibleDistance.push(pathDistance);
                            }
                        }
                    }
                }
                const shareRideDistance = Math.min(...possibleDistance);

                if (shareRideDistance < separatedRideDistance) {
                    this.requestsGraph.push([request, request2]);
                }
            }
        }
    }
}
module.exports = new RVGraph();