
import { Booking } from "../model/booking.model.js";
import { Customer } from "../model/customer.model.js";


export const request = async (request, response, next) => {
      var Date1=new Date(); 
    let day = Date1.getDate();    
    let month = Date1.getMonth()+1;
    let year = Date1.getFullYear();
    let date=day+"/"+month+"/"+year;
    Booking.create({customerId:request.body.customerId,shopId:request.body.shopId,problem:request.body.problem,location:request.body.location,vehicleNo:request.body.vehicleNo,categoryId:request.body.categoryId,vehicleName:request.body.vehicleName,status:'pending',billAmmount:0.0,date:date,time:request.body.time,latLong:request.body.latLong,mechanicId:request.body.mechanicId})
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
    console.log(request.body)
    try{
    const data = await Booking.find({customerId:request.body.customerId}).populate({path:'shopId'}).populate({path:'mechanicId'});
    let bookingHistory={}
   data?response.status(200).json({result:data,status:true}): response.status(401).json({result:"bad request",status:false});
    
   }
   catch(err){
    console.log(err);
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

export const updateCustomerId= (request, response, next) => {
    try {
        let data =  Booking.updateOne({"Id": request.body.customerId},{"customerId":request.body.updateId});
        data? response.status(200).json({ data: data, status: true }): response.status(401).json({ data: "bed request", status: false });
    }
    catch (err) {
        response.status(500).json({ message: "internal server error", status: false });
    }
}