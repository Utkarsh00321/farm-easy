import dbConnect from "@/lib/dbConnect.js";
import cookie from 'cookie';
import Farmer from "../../../models/Farmer.js";
import Vet from "../../../models/Vet.js";
import Worker from "../../../models/Worker.js";



export default async function handler(req, res) {
  dbConnect()
  try {
    const options = {
      // cookie options here
      httpOnly: true,
      maxAge: 3600,
      path: '/',
      sameSite: 'strict'
  };
    const { mobileNumber, passwd, type } = req.body;

    if (!mobileNumber || !passwd || !type) {
      throw new Error("All fields must be entered");
      // return;
    }

    if (type === "farmer") {
      const exist = await Farmer.findOne({ mobileNumber: mobileNumber });
      if (!exist) throw new Error("Invalid Username");

      const isPasswordValid = await exist.isPasswordCorrect(passwd)
      if (!isPasswordValid) throw new Error("Not a valid Password")

      // const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
      const accessToken = await exist.generateAccessToken();
      const refreshToken = await exist.generateRefreshToken();
      exist.refreshToken = refreshToken
      await exist.save({ validateBeforeSave: false });

      res.setHeader('Set-Cookie', cookie.serialize('accessToken', accessToken, options))
      return res.status(200).json(
        { statusCode: 200, message: "Successful" }
      )
    } 
    else if (type === "doctor") {
      const exist = await Vet.finOne({ mobileNumber: mobileNumber });
      if (!exist) throw new Error("Invalid Username");

      const isPasswordValid = await exist.isPasswordCorrect(passwd)
      if (!isPasswordValid) throw new Error("Not a valid Password")

      const accessToken = await exist.generateAccessToken();
      const refreshToken = await exist.generateRefreshToken();
      exist.refreshToken = refreshToken

      await exist.save({ validateBeforeSave: false });
      res.setHeader('Set-Cookie', cookie.serialize('accessToken', accessToken, options))
      return res.status(200).json(
        { statusCode: 200, message: "Successful" }
      )

    } else {
      const exist = await Worker.finOne({ mobileNumber: mobileNumber });
      if (!exist) throw new Error("Invalid Username");

      const isPasswordValid = await exist.isPasswordCorrect(passwd)
      if (!isPasswordValid) throw new Error("Not a valid Password")

      const accessToken = await exist.generateAccessToken();
      const refreshToken = await exist.generateRefreshToken();
      exist.refreshToken = refreshToken
      await exist.save({ validateBeforeSave: false });

      res.setHeader('Set-Cookie', cookie.serialize('accessToken', accessToken, options))
      
      return res.status(200).json(
        { statusCode: 200, message: "Successful" }
      )
    }
  } catch (error) {
    return res.status(400).json(
      {
        statusCode: 400,
        error: error.message
      }
    )
  }
}
