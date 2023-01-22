/**
    This function, connectMongo() connects to the MongoDB database and throws an error 
    if something goes wrong.

    exports connectMongo as a function
 */

import mongoose from "mongoose";

const connectMongo = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    /**
        readyState property is going to return 3 values. If we have a successful connection
        we can expect a return of 1.

            -   0 for disconnected
            -   1 for connected
            -   2 for connecting
            -   3 for disconnecting
    */
    if (conn.connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (err) {
    
    // if something goes wrong and we can't connect, console error and stop the process
    console.error(err);

    /**
        Exit with failure

        Node normally exits with a 0 status code when no more async operations are pending. 
        exit(1) 
            -   Uncaught Fatal Exception: There was an uncaught exception, and it was not 
                handled by a domain or an uncaughtException event handler.
    */
    process.exit(1);
  }
};

export default connectMongo;
