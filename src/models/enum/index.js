const BookingStatus ={
	PENDING: 1,
	DISPATCHED: "dispatched",
	REFUSED: "refused",
	ACCEPTED: 2,
	STARTED: 3,
	COMPLETED: 9,
	CANCELED : "canceled"
};

const UserRole = {
    USER : "user",
    DRIVER : "driver",
	ADMIN : "admin",
};

const Colors = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue"
};

module.exports ={
	BookingStatus, 
	UserRole,
	Colors
};