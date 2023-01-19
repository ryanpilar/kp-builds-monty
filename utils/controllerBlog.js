/**
    controllerBlog.js exports an object containing arrow functions that control 
    various operations of the Blog. Includes:
        -   getBlogEntries


    todo:
        -   go into /api/blog-entry/add and decouple the Blog.create() code
            and add it here instead.
 */

import connectMongo from "./connectMongo";
import Blog from "../models/testBlogModel";


const controllerBlog = {
    getBlogEntries: async (req, res) => {

        try {
            await connectMongo();

            /**
                lean() tells Mongoose to skip hydrating the result documents.
                This makes queries faster and less memory intensive, but the 
                result documents are plain old JavaScript objects (POJOs), 
                not Mongoose documents
             */
            const documents = await Blog.find({}).lean()                                 
            return documents
    
        } catch {
            console.error()
            throw new Error('error from controllerBlog/getBlogEntries!')
        }
    },
}

export default controllerBlog;
