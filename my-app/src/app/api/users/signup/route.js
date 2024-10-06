import { connect } from '@/dbConfig/dbConfig.js';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

// Connect to MongoDB
connect();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Log the request body for debugging purposes
    console.log(reqBody);

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password using bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    // Respond with success message and user details (excluding the password)
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isVerified: savedUser.isVerified,
        isAdmin: savedUser.isAdmin,
      },
    });
  } catch (error) {
    // Handle server errors
    console.error("Error creating user:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
