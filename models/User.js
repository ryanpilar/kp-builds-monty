import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  }
);

/**
    We do the following because we don't want to create a new model every single time we hit 
    an API route in Next.js. If you don't do that and just go with model('Test', testSchema), 
    you might face an error that would prevent creating/updating etc.
 */
const User = models.User || model("User", userSchema);

// ** remember we want to export a mongoose model
module.exports = User;
