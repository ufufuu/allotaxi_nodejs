

const BookingStatus ={
	PENDING: "placed",
	DISPATCHED: "dispathed",
	REFUSED: "refused",
	ACCEPTED: "accepted",
	STARTED: "started",
	COMPLETED: "completed",
	CANCELED : "canceled"
}

const Colors = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue"
};

class Role {
    static USER = "user";
    static DRIVER = "driver";
	static ADMIN = "admin";
}
module.exports ={
	BookingStatus, 
	Colors,
	Role
};