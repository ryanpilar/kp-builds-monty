//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    @desc    Add blog entry to MongoDB and send back a response to the client
//               
//
//    @route   Post /blog-entry/add
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import connectMongo from "../../../mongo/connectMongo";
import Blog from "../../../models/BlogPost";

const addEntry = async (req, res) => {

  try {
    // do not execute anymore code if req.method is not equal to a POST
    if (req.method !== "POST") return;

    // for data coming from /pages/add-blog
    const { image, title, description, details } = req.body;

    // simple validation, if not present, return and don't execute anymore code
    if (!image || !title || !description || !details) return;

    // slug to be based on title
    // urls dont do well with spaces, so replace ' ' with '-'
    const slug = title.split(" ").join('-').toLowerCase();

    // connect to mongoDB
    console.log("CONNECTING TO MONGO");
    await connectMongo();

    // add document to mongo using mongoose
    console.log("CREATING DOCUMENT");
    console.log("req.body", req.body);

    const blogData = await Blog.create({
      image,
      title,
      description,
      details,
      slug,
    },
      // handle mongoose errors
      (err) => {

        if (err) {

          console.log("error", err);
          res.render("error/404WithMsg", {
            msg: `error happened while creating this entry -> ${req.body}`,
          });

        } else {
          console.log("Document has been added to database");
        }
      }
    );

    // respond to client
    console.log("CREATED DOCUMENT");
    res.json({ blogData });

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export default addEntry;
