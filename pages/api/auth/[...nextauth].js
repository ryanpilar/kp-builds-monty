//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    @desc    [...nextauth] using the tripple dots we can catch all the routes. Any route directed to this path will be caught by
//             this folder, and auth.
//              -   must return a nextauth function
//
//    @route   ALL    /api/auth/
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../mongo/connectMongo";

import User from "../../../models/User";

import { compare } from "bcryptjs";



export default NextAuth({
  // OAuth authentication providers...
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // name of the credentials provider:
      name: "Credentials",

      //  this is the function that will run when the user is authorized:
      //  this will then store the user token inside the cookies
      //  2 params - credentials (access username and password) & req
      async authorize(credentials, req) {

        await connectMongo() 

        // check user existence
        const result = await User.findOne({email: credentials.email}).lean()
        console.log('credentials email', credentials.email);
        console.log('result', result);


        if ( !result ) { 
          throw new Error ("No user found with that email, please sign up!")
        }

        // compare passwords with bcrypt. compare() returns a boolean
        const checkPassword = await compare( credentials.password, result.password)

        if ( !checkPassword || result.email !== credentials.email ) {
          throw new Error("Username or password do not match")
        }

        return result
      }
    })
  ],
  // to avoid '[next-auth][warn][NO_SECRET]' being printed in the terminal
  secret: 'ZWJ7dnJH39i07NQiyuTA2xpyDtfhhBG1kwMV8O0mdlk='

});
