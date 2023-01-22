import { useRouter } from "next/router";

const BlogItem = (props) => {

    const router = useRouter()

    const onNavigate = () => {
        router.push(`/${slug}`)                                                
    
    }
  const { title, image, description, details, slug } = props;
  return (
    <div className="max-w-sm mx-auto overflow-hidden rounded shadow-lg my-2">
      <img src={image} alt={title} className="w-full h-60" />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-base text-gray-700">{description}</p>
      </div>
      <div className="text-center">
        <button onClick={onNavigate} className="my-1 px-4 py-2 font-semibold text-blue-700-bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
          Read More...
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
