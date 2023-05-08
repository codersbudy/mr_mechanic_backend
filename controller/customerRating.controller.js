import  {customerRating}  from "../model/customerRating.model.js";


export const ratinglist = (request, response, next) => {
    customerRating.find()
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error" });
        })
}


export const ratingsave = (request, response, next) => {
    customerRating.create()
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error" });
        })
}

