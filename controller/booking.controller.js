
import { Booking } from "../model/booking.model.js";


export const request = async (request, response, next) => {
    var date = Date.now();

    Booking.create({ 'customerId': request.body.customerId, 'status': "pending", 'shopId': request.body.shopId, 'problem': request.body.problem, 'location': request.body.location, 'vehicleNo': request.body.vehicleNo, 'categoryId': request.body.categoryId, 'vehicleName': request.body.vehicleName, 'time': request.body.time, 'latLong': request.body.latLong })
        .then(result => {
            return response.status(200).json({ result: result, status: false })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false });
        })
}

export const updateStatus = async (request, response, next) => {
    try {
        let status = await Booking.findById(request.body._id);
        if (status.status == "pending" || status.status == "accept") {
            let update = await Booking.updateOne({ _id: status._id },{status: request.body.status})
            response.status(200).json({ update: update, status: true });
        }
        else 
            response.status(401).json({ message: "bad request" });
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }

}

export const addMechanic = async (request, response, next) => {
    try {
        let status = await Booking.findById(request.body.bookingId);
        if (status["mechanicId"] == undefined) {
            let update = await Booking.updateOne({_id: request.body.bookingId},{mechanicId: request.body.mechanicId})
            response.status(200).json({ update: update, status: true });
         }
        else 
            response.status(401).json({ message: "bad request" });
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }

}

export const bill = async (request, response, next) => {
    try {
        let status = await Booking.findById(request.body.bookingId);
        if (status.status == "accept") {
            let update = await Booking.updateOne({_id: request.body.bookingId}, {billAmmount: request.body.billAmmount,actualProblem: request.body.actualProblem})
            response.status(200).json({ update: update, status: true });
        }
        else
            response.status(401).json({ message: "bad request" });
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }

}

export const customerHistory = async (request, response, next) => {
    try {
        let data = await sequalize.query("select  mechanics.mechanicName,mechanics.contact,shops.shopName,shops.address,shops.contact,bookings.vehicleNo,bookings.status,bookings.actualProblem,bookings.billAmmount,bookings.date from bookings inner join mechanics on mechanics.id=bookings.mechanicId inner join shops on bookings.shopId=shops.id where bookings.customerId=" + request.body.customerId + " and bookings.status='not resolve' or bookings.status='resolve'")
        if (data)
            response.status(200).json({ data: data[0], status: true });
        response.status(401).json({ data: "bed request", status: false });
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ message: "internal server error", status: false });
    }
}

export const mechanicHistory = async (request, response, next) => {
    try {
        let data = await sequalize.query("select  customers.customerName,customers.contact,bookings.vehicleNo,bookings.vehicleName,bookings.status,bookings.actualProblem,bookings.billAmmount,bookings.date from bookings inner join customers on customers.id=bookings.customerId inner join shops on bookings.shopId=shops.id where bookings.mechanicId=" + request.body.mechanicId + " and bookings.status='not resolve' or bookings.status='resolve'")
        if (data)
            response.status(200).json({ data: data[0], status: true });
        response.status(401).json({ data: "bed request", status: false });
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }
}

export const shopHistory = async (request, response, next) => {
    try {
        let data = await sequalize.query("select  customers.customerName,customers.contact, mechanics.mechanicName,mechanics.contact,bookings.vehicleNo,bookings.status,bookings.actualProblem,bookings.billAmmount,bookings.date from bookings inner join mechanics on mechanics.id=bookings.mechanicId inner join customers on bookings.customerId=customers.id where bookings.shopId=" + request.body.shopId + " and bookings.status='not resolve' or bookings.status='resolve'")
        if (data)
            response.status(200).json({ data: data[0], status: true });
        response.status(401).json({ data: "bed request", status: false });
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ message: "internal server error", status: false });
    }
}

export const id = async (request, response, next) => {
    try {
        let data = await Booking.findById(request.body.bookingId);
        data? response.status(200).json({ data: data, status: true }): response.status(401).json({ data: "bed request", status: false });
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }
}



