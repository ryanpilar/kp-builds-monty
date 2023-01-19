/**
    This function, connectMongo() connects to the MongoDB database and throws an error 
    if something goes wrong.

    returns: nothing, but exports connectMongo as a function
 */

import mongoose from "mongoose";

// mongoose deals with promisses, so we use async
const connectMongo = async () => {

    try{
        // mongoose.connect returns a promise
        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }

    catch (err) {

        // if something goes wrong and we can't connect, console error and stop the process
        console.error(err)

        /**
            Exit with failure

            Node normally exits with a 0 status code when no more async operations are pending. 
            exit(1) 
                -   Uncaught Fatal Exception: There was an uncaught exception, and it was not 
                    handled by a domain or an uncaughtException event handler.
         */
        process.exit(1)
    }
}

export default connectMongo;
