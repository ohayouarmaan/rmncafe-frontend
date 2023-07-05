import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion"

export default function Form() {
  return (
    <form>
      <div className="m-5">
        <div className="">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium  text-white">
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="family-name"
                  className="block p-4 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium  text-white">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full p-4 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm font-medium  text-white">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-1">
              <label htmlFor="about" className="block text-sm pb-1 font-medium  text-white">
                About
              </label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="write a short introduction about you :3"
                  rows={2}
                  className="p-2 block w-full rounded-md border-0 outline-none py-1.5 ring-1 ring-inset ring-white text-white-900 shadow-sm placeholder:text-white-400 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>
        <motion.button whileTap={{ opacity: 0.7 }} whileHover={{ scale: 0.93 }} onClick={(e) => {
          e.preventDefault();
        }} className='px-5 w-full my-9 pixel-border bg-teal' type="submit">
          Submit
        </motion.button>
          <p className="mt-1 text-sm  text-gray-300">
            armaan might mail some cool stuffs to you :D
          </p>
      </div>
    </form>
  );
}
