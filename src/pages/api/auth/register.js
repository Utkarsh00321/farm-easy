import dbConnect from "../../../lib/dbConnect.js";
import Farmer from "../../../models/Farmer.js";
import Vet from "../../../models/Vet.js";
import Worker from "../../../models/Worker.js";

export default async function handler(req, res){
    dbConnect();
    try {
        const {name, mobile, address, password, type} = req.body;

        // console.log(req.body);
        if(!name || !mobile || !address || !password || !type) throw new Error("All fields required");

        if(type === "farmer"){
            console.log("Checkpoint 1");
            const existUser = await Farmer.findOne({mobileNumber: mobile});
            if(existUser) throw new Error("User already exists");

            const user = await Farmer.create({
                name: name,
                mobileNumber: mobile,
                address: address,
                password: password,
            })

            const createdUser = await Farmer.findOne({_id: user._id}).select("-password -refreshToken");

            if(!createdUser) throw new Error("Something wrong while registering user");

            return res.status(200).json(
                {
                    statusCode: 200,
                    data: createdUser,
                    message: "User created successfully"
                }
            )
        }
        else if( type === "doctor"){
            console.log("Checkpoint 2");

            const {specialization} = req.body;
            if(!specialization) throw new Error("All fields required");

            const existUser = await Vet.findOne({mobileNumber: mobile});
            if(existUser) throw new Error("User already exists");
            
            const user = await Vet.create({
                name: name,
                mobileNumber: mobile,
                specialization: specialization,
                location: address,
                password: password,
            })

            const createdUser = await Vet.findOne({_id: user._id}).select("-password -refreshToken");
            // console.log(createdUser);
            if(!createdUser) throw new Error("Something wrong while registering user");

            return res.status(200).json(
                {
                    statusCode: 200,
                    data: createdUser,
                    message: "User created successfully"
                }
            )
        }
        else{
            const existUser = await Worker.findOne({mobileNumber: mobile});
            if(existUser) throw new Error("User already exists");

            const user = await Worker.create({
                name: name,
                mobileNumber: mobile,
                address: address,
                password: password,
            })

            const createdUser = await Worker.findOne({_id: user._id}).select("-password -refreshToken");

            if(!createdUser) throw new Error("Something wrong while registering user");

            return res.status(200).json(
                {
                    statusCode: 200,
                    data: createdUser,
                    message: "User created successfully"
                }
            )
        }
    } catch (error) {
        return res.status(401).json(
            {
                statusCode: 401,
                error: error.message
            }
        )
    }
}