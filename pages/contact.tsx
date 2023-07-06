import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { remark } from "remark";
import html from "remark-html";
import { useRef, useEffect } from "react";

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/portfolio/contact");
  const data: { contact: { _id: string; name: string; url: string }[] } = await res.json();
  return {
    props: { data: data.contact },
  };
}

export default function Contact(props: {
  data: { _id: string; name: string; url: string }[];
}) {
  const router = useRouter();
  const buttonsHolder = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(buttonsHolder.current){
        buttonsHolder.current.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", e => {
                e.preventDefault();
                router.push(a.href);
            })
        })
    }
  }, [])
  return (
    <main className="bg-[#2D4356] flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <div className="h-[80vh] w-[80vw] relative text-white flex items-center justify-center bg-[#435B66]">
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
        <h1 className="absolute top-10 left-[50%] translate-x-[-50%] text-4xl uppercase font-bold underline underline-offset-[10px]">
          Contact Me
        </h1>
        <div ref={buttonsHolder} className="left h-full p-9 w-1/2 flex flex-col items-center justify-center">
          <p className="text-xl">You can contact me via these:</p>
          <br />
          {props.data.map((contact) => (
            <motion.a whileTap={{ opacity: 0.7 }} whileHover={{ scale: 0.93 }}className="pixel-border text-center px-7 w-[60%] block" key={contact._id} href={contact.url}>{contact.name}</motion.a>
          ))}
        </div>
        <div className="right h-full w-1/2 flex flex-col items-center justify-center">
          <Image
            src={"/cats-animated.gif"}
            alt="cat"
            width={200}
            height={200}
          />
        </div>
      </div>
    </main>
  );
}
