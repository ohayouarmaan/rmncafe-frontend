import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { remark } from "remark";
import html from "remark-html";
import { useRef, useEffect } from "react";

export async function getStaticProps() {
  const res = await fetch(`${process.env.SERVER_URL}/portfolio/projects`);
  const data: {
    projects: {
      _id: string;
      title: string;
      description: string;
      url: string;
    }[];
  } = await res.json();
  return {
    props: { data: data.projects },
  };
}

export default function Contact(props: {
  data: { _id: string; title: string; description: string; url: string }[];
}) {
  const router = useRouter();
  const buttonsHolder = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (buttonsHolder.current) {
      buttonsHolder.current.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          router.push(a.href);
        });
      });
    }
  }, []);
  return (
    <main className="bg-[#27374D] px-6 flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <div className="h-[80vh] w-[80vw] relative text-white flex items-center justify-center bg-[#526D82] px-8">
        <h1 className="absolute top-10 left-[50%] translate-x-[-50%] text-4xl uppercase font-bold underline underline-offset-[10px]">
          Projects
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

        {
            props.data.map(project => (
                <div className="bg-[#9DB2BF] relative py-9 text-black max-h-1/2 flex flex-col items-center">
                    <h1 className="text-xl">{project.title}</h1>
                    <div className="w-[80%] bg-black h-[1px]"></div>
                    <p className="text-sm text-left m-4">{project.description.split(" ").slice(0, 50).join(" ") + "... Read More?"}</p>
                    <motion.button whileTap={{ opacity: 0.7 }}  whileHover={{ scale: 0.93 }} className='px-5 bottom-[-5px] left-50% absolute pixel-border bg-teal text-white' onClick={(e) => {router.push(project.url)}}>Check out</motion.button>
                </div>
            ))
        }
        </div>
      </div>
    </main>
  );
}
