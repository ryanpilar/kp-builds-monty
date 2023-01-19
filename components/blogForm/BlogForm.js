/**
    The useRef Hook allows you to persist values between renders. It can 
    be used to store a mutable value that does not cause a re-render when 
    updated. It can be used to access a DOM element directly.
 */
import { useRef } from "react";

const BlogForm = ({ addBlogHandler }) => {

  // these are also referenced in the inputs below
  const titleRef = useRef()
  const imageRef = useRef()
  const descriptionRef = useRef()
  const detailsRef = useRef()

  const formSubmitHandler = (e) => {
    // e is going to have the form body

    // prevent automatic refresh form submission
    e.preventDefault()                              

    const formData = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      description: descriptionRef.current.value,
      details: detailsRef.current.value
    }

    addBlogHandler(formData)
  }


  return (
    // on submission of this form we want to call a function, hence onClick
    <form onSubmit={formSubmitHandler} className="max-w-lg w-ful mx-auto">
      <div className="flex flex-wrap -mx-3 mb-6">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Title
        </label>
        <input
          placeholder="title"
          type="text"
          className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          ref={titleRef}
        />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Image
        </label>
        <input
          placeholder="image"
          type="text"
          className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          ref={imageRef}
        />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Description
        </label>
        <input
          placeholder="description"
          type="text"
          className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          ref={descriptionRef}
        />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <label
          htmlFor=""
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Details
        </label>
        <input
          placeholder="Details"
          type="text"
          className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          ref={detailsRef}
        />
      </div>
      <button type='submit' className="my-1 px-4 py-2 font-semibold text-red-700 text-blue-700-bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
          Submit
        </button>
    </form>
  );
};

export default BlogForm;
