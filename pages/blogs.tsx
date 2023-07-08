import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<
    {
      _id: string;
      title: string;
      description: string;
      content: string;
      datePublished: string;
    }[]
  >([]);
  const router = useRouter();
  const [paginationLimit, setPaginationLimit] = useState({
    from: 0,
    to: 10,
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/blog?from=${paginationLimit.from}&to=${paginationLimit.to}`
        );
        const data: {
          blogs: {
            _id: string;
            title: string;
            description: string;
            content: string;
            datePublished: string;
          }[];
        } = await res.json();
        setBlogs(data.blogs);
      } catch (e: any) {
        console.log("wtf");
        console.log(e.message);
      }
    })();
  }, [paginationLimit]);

  return (
    <div className="text-white p-[5%] bg-[#4C4B16] min-h-screen w-[100vw] flex items-center justify-center ">
      <div className="h-[80vh] w-[80vw] relative text-white flex items-center justify-center bg-[#898121] px-8">
        <h1 className="absolute top-10 left-[50%] translate-x-[-50%] text-4xl uppercase font-bold underline underline-offset-[10px]">
          Blogs
        </h1>
        <motion.button
          whileHover={{ scale: 0.93 }}
          animate={{ scale: 1 }}
          initial={{ scale: 1 }}
          whileTap={{ opacity: 0.5 }}
          className="absolute top-10 left-[5%] translate-x-[-50%] text-5xl"
          onClick={(e) => {
            router.back();
          }}
        >
          &#8592;
        </motion.button>
        <div className="grid gap-9 p-5 grid-cols-3 w-full h-[60%] overflow-y-auto">
          {blogs.length > 0 ? (
            blogs.map((i) => (
              <div className="bg-[#F7F1E5] relative py-9 text-black max-h-1/2 flex flex-col items-center">
                <h1 className="text-xl">{i.title}</h1>
                <div className="w-[80%] bg-black h-[1px]"></div>
                <p className="text-sm text-left m-4">
                  {i.description.split(" ").slice(0, 50).join(" ") +
                    "... Read More?"}
                </p>
                <motion.button
                  whileTap={{ opacity: 0.7 }}
                  whileHover={{ scale: 0.93 }}
                  className="px-5 bottom-[-5px] left-50% absolute pixel-border bg-teal text-white"
                  onClick={(e) => {
                    router.push(`/blog/${i._id}`);
                  }}
                >
                  Check out
                </motion.button>
              </div>
            ))
          ) : (
            <h1 className="text-center">No blogs written by this lazy cat 🥹</h1>
          )}
        </div>
      </div>
    </div>
  );
}
