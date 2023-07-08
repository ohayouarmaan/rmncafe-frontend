import { motion } from "framer-motion"

export default function BlogPage () {
    return (
        <div className="text-white p-[5%] bg-black min-h-screen w-[100vw] flex items-center justify-center ">
            <div className="container overflow-y-auto max-h-[80vh] grid gap-9 grid-cols-2 w-[80vw] p-3 pixel-border">
                {
                    [1,2,3,4,5,6].map( i => <div key={i} className="card bg-gray-700 min-h-[300px] rounded-xl">{i}</div> )
                }
            </div>
        </div>
    )
}