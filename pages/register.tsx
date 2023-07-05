import Image from "next/image"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import Form from "../components/form";

export default function Contact() {
    const router = useRouter();
    return (
        <main className="bg-[#213555] flex flex-col items-center justify-center h-[100vh] w-[100vw]">
            <div className="h-[80vh] w-[80vw] relative text-white flex items-center justify-center bg-[#4F709C]">
                <motion.button whileHover={{ scale: 0.93 }} animate={{ scale: 1 }} initial={{ scale: 1 }} whileTap={{ opacity: 0.5 }} className="absolute top-10 left-[5%] translate-x-[-50%] text-5xl" onClick={e => {
                    router.back()
                }}>&#8592;</motion.button>
                <h1 className="absolute top-10 left-[50%] translate-x-[-50%] text-4xl uppercase font-bold underline underline-offset-[10px]">Sign In</h1>
                <div className="left overflow-y-auto h-full p-9 w-1/2 flex flex-col items-center justify-center">
                    <Form />
                </div>
                <div className="right h-full w-1/2 flex flex-col items-center justify-center">
                    <Image src={"/cat-jumping.gif"} alt="cat" width={200} height={200}/>
                </div>
            </div>
        </main>
    )
}