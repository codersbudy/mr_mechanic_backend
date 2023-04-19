
import { Booking } from "../model/booking.model.js";
import { Customer } from "../model/customer.model.js";


export const request = async (request, response, next) => {
    var date = Date.now();

    Booking.create(request.body)
        .then(result => {
            return response.status(200).json({ result: result, status: false })
        })
        .catch(err => {
            console.log(err);
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
    try{
    const data = await Booking.find({customerId:request.body.customerId}).populate({path:'shopId',select:('shopName')}).populate({path:'mechanicId'});
   data?response.status(200).json({result:data,status:true}): response.status(401).json({result:"bad request",status:false});
    
   }
   catch(err){
    return response.status(500).json({message:"internal server error",status:false});
   }
}

export const mechanicHistory = async (request, response, next) => {
    try {
        const data = await Booking.find({mechanicId:request.body.mechanicId}).populate({path:'shopId',select:('shopName')}).populate({path:'customerId'});
        data?response.status(200).json({result:data,status:true}): response.status(401).json({result:"bad request",status:false});
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }
}

export const shopHistory = async (request, response, next) => {
    try {
        const data = await Booking.find({shopId:request.body.shopId}).populate({path:'mechanicId'}).populate({path:'customerId'});
        data?response.status(200).json({result:data,status:true}): response.status(401).json({result:"bad request",status:false});
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