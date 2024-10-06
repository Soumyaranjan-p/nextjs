 import {connect} from '@/dbConfig/dbConfig.js'

import User from '@/models/userModels'
import {NextRequest,NextResponse}  from 'next/server';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
connect()
   export async function POST(request){
    try{
              const reqBody=request.json();
              const { email,password}=reqBody;

           console.log(reqBody);
           const user = await User.findOne({email});
           if(!user){
            return NextResponse.json({error:"user not found"},{status: 404})
           }
                         //if password is correct
                         const validPassword= await bcryptjs.compare(password,user.password);
                         if(!validPassword){
                            return NextResponse.json({error:"Invalid password"},{status:400})
                         }

                         //CREATE USER TOKEN
                         const tokenData={
                            id:user._id,
                            username:user.username,
                            email : user.email
                         }
                         //create token
                          const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET, {expiresIn:"1h"})
                          const response=NextResponse.json({

                          message:"Login Successful",
                          success:true,

                          })
                          response.cookies.set("token",token,{
                            httpOnly:true,

                          })

                          return response;

                       

    }  catch(error){
        return NextResponse.json({error:error.message}, {status:500})
    }
   }