import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { remark } from "remark"
import html from "remark-html"

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/portfolio/about`);
    const data: { about: {_id: string, about: string }[] } = await  res.json();
    const htmlValue = (await remark().use(html).process(data.about[0].about)).toString()
    console.log(htmlValue);
    return {
        props: {
            data: htmlValue
        }
    }
}

export default function About(props: { data: string }) {
    const router = useRouter();
    const [about, setAbout] = useState(props.data);
    const mdContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(mdContainer.current){
            mdContainer.current.querySelectorAll("a").forEach(a => {
                a.addEventListener("click", e => {
                    e.preventDefault();
                    router.push(a.href)
                })
            })
        }
    }, [])

    return (
        <main className="bg-[#001C30] flex flex-col items-center justify-center h-[100vh] w-[100vw]">
            <div className="h-[80vh] w-[80vw] relative text-white flex items-center justify-center bg-[#176B87]">
                <motion.button whileHover={{ scale: 0.93 }} animate={{ scale: 1 }} initial={{ scale: 1 }} whileTap={{ opacity: 0.5 }} className="absolute top-10 left-[5%] translate-x-[-50%] text-5xl" onClick={e => {
                    router.back()
                }}>&#8592;</motion.button>
                <h1 className="absolute top-10 left-[50%] translate-x-[-50%] text-4xl uppercase font-bold underline underline-offset-[10px]">About Me</h1>
                <div ref={mdContainer} className="md-container left h-full p-9 w-1/2 flex flex-col items-center justify-center" dangerouslySetInnerHTML={{ __html: about }}>
                </div>
                <div className="right h-full w-1/2 flex flex-col items-center justify-center">
                    <Image src={"/kitty-chase-pixel.gif"} alt="cat" width={200} height={200}/>
                </div>
            </div>
        </main>
    )
}