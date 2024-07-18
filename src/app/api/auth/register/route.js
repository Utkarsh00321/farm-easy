import dbConnect from '@/lib/dbConnect.js';
import Farmer from '@/models/Farmer.js';
import Vet from '@/models/Vet.js';
import Worker from '@/models/Worker';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  try {
    // console.log(req.json());
    const { name, mobile, address, password, type } = await req.json();
    console.log(name);

    if (!name || !mobile || !address || !password || !type) throw new Error("All fields required");

    let user, createdUser;

    if (type === "farmer") {
      const existUser = await Farmer.findOne({ mobileNumber: mobile });
      if (existUser) throw new Error("User already exists");

      user = await Farmer.create({
        name,
        mobileNumber: mobile,
        address,
        password,
      });

      createdUser = await Farmer.findOne({ _id: user._id }).select("-password -refreshToken");

      if (!createdUser) throw new Error("Something went wrong while registering user");

    } else if (type === "doctor") {
      const { specialization } = await req.json();
      if (!specialization) throw new Error("All fields required");

      const existUser = await Vet.findOne({ mobileNumber: mobile });
      if (existUser) throw new Error("User already exists");

      user = await Vet.create({
        name,
        mobileNumber: mobile,
        specialization,
        location: address,
        password,
      });

      createdUser = await Vet.findOne({ _id: user._id }).select("-password -refreshToken");

      if (!createdUser) throw new Error("Something went wrong while registering user");

    } else if (type === "worker") {
      const existUser = await Worker.findOne({ mobileNumber: mobile });
      if (existUser) throw new Error("User already exists");

      user = await Worker.create({
        name,
        mobileNumber: mobile,
        address,
        password,
      });

      createdUser = await Worker.findOne({ _id: user._id }).select("-password -refreshToken");

      if (!createdUser) throw new Error("Something went wrong while registering user");

    } else {
      throw new Error("Invalid user type");
    }

    return NextResponse.json(
      {
        statusCode: 200,
        data: createdUser,
        message: "User created successfully"
      },
      { status: 200 }
    );

  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      {
        statusCode: 401,
        error: error.message
      },
      { status: 401 }
    );
  }
}
