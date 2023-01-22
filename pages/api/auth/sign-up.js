//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    @desc    Add User entry to MongoDB and send back a response to the client
//
//
//    @route   Post    /api/auth/sign-up
// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import connectMongo from "../../../mongo/connectMongo";
import User from "../../../models/User";
import { hash } from "bcryptjs";

const signUp = async (req, res) => {
  try {
    // only accepte POST requests!
    if (req.method !== "POST") {
      return res
        .status(500)
        .json({ message: "HTTP method not valid, only POST accepted" });
    }
    // check for form data!
    if (!req.body) {
      return res.status(404).json({ error: "Don't have form data...!" });
    }
    const { username, email, password } = req.body;
    console.log("req", req.body);

    // connect to mongoDB
    console.log("CONNECTING TO MONGO");
    await connectMongo();

    // check for duplicate users in mongo
    const checkExisting = await User.findOne({ email: email });

    if (checkExisting) {
      // 422 if duplicate is found
      return res.status(422).json({ message: "User already exists" });
    }

    // hash the password 
    const hashed = await hash(password, 12);
    console.log("has/hed", hashed);

    // create new user in mongo
    await User.create(
      {
        username,
        email,
        password: hashed,
      },
      function (err, data) {
        // 404 if errors exist
        if (err) return res.status(404).json({ err });

        // 201 if document was successfully created
        console.log("CREATED DOCUMENT");
        res.status(201).json({ status: true, user: data });
      }
    );
  } catch (error) {
    res.json({ error });
  }
};

export default signUp;
