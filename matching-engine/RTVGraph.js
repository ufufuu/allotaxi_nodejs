// Assuming the external functions and imports are available in JS environment:
// getDistance, getDistanceMatrix, gridWorldDistance, gridWorldDistanceMatrix
// redis key name, refer to README for the data strutur

const RIDE_REQUEST = 'realTimeRideRequest'
const DRIVER_LOCATION = 'driverLocation'
const DRIVER_ON_GOING_RIDE = 'driverOngoingRide'

class RTVGraph {
    constructor(constraintsParam, useGridWorld = false) {
        this.rtvGraph = [];
        this.maxMatchDistance = constraints_param.maxMatchDistance;
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

    RTVGraphFindFeasibleTrips(rvGraph, driverList) {
        for (const [request, request2] of rvGraph.requestsGraph) {
            for (const driver of driverList) {
                if (driver.ongoingRide.length === 0) {
                    if (
                        this._getDistance(driver.location, request.startLocation) < this.maxMatchDistance &&
                        this._getDistance(driver.location, request2.startLocation) < this.maxMatchDistance
                    ) {
                        const locationList = [
                            driver.location,
                            request.startLocation,
                            request2.startLocation,
                            request.endLocation,
                            request2.endLocation
                        ];
                        const distanceMatrix = this._getDistanceMatrix(locationList, locationList);

                        const delaylist = [];
                        delaylist.push(
                            (distanceMatrix[1][2] + distanceMatrix[2][3] - distanceMatrix[1][3]) +
                            (distanceMatrix[2][3] + distanceMatrix[3][4] - distanceMatrix[2][4])
                        );
                        delaylist.push(
                            distanceMatrix[1][2] + distanceMatrix[2][4] + distanceMatrix[4][3] - distanceMatrix[1][3]
                        );
                        delaylist.push(
                            distanceMatrix[2][1] + distanceMatrix[1][3] + distanceMatrix[3][4] - distanceMatrix[2][4]
                        );
                        delaylist.push(
                            (distanceMatrix[2][1] + distanceMatrix[1][4] - distanceMatrix[2][4]) +
                            (distanceMatrix[1][4] + distanceMatrix[4][3] - distanceMatrix[1][3])
                        );

                        const delayMin = Math.min(...delaylist);
                        const index = delaylist.indexOf(delayMin);

                        const separateDistance =
                            distanceMatrix[0][1] + distanceMatrix[1][3] +
                            distanceMatrix[0][2] + distanceMatrix[2][4];

                        let joinDistance;
                        if (index === 0) {
                            joinDistance =
                                distanceMatrix[0][1] + distanceMatrix[1][2] +
                                distanceMatrix[2][3] + distanceMatrix[3][4];
                        }
                        if (index === 1) {
                            joinDistance =
                                distanceMatrix[0][1] + distanceMatrix[1][2] +
                                distanceMatrix[2][4] + distanceMatrix[4][3];
                        }
                        if (index === 2) {
                            joinDistance =
                                distanceMatrix[0][2] + distanceMatrix[2][1] +
                                distanceMatrix[1][3] + distanceMatrix[3][4];
                        }
                        if (index === 3) {
                            joinDistance =
                                distanceMatrix[0][2] + distanceMatrix[2][1] +
                                distanceMatrix[1][4] + distanceMatrix[4][3];
                        }

                        if (joinDistance < separateDistance) {
                            if (index < 2) {
                                // The original code is incomplete here, so stopping translation at this point
                            }
                        }
                    }
                }
            }
        }
    }
}
module.exports = new RTVGraph();