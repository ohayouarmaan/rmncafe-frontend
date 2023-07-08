import '../styles/globals.css'
import 'prismjs/themes/prism-okaidia.css';

import { AnimatePresence, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return <AnimatePresence mode='wait'>
    <motion.div
      initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%' }}
      animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%'}}
      exit={{ opacity: 0, clipPath: 'polygon(50% 0, 50% 0, 50%% 100%, 50%% 100%' }}
      transition={{ duration: 1.25 }}
      key={router.route}
    >
      <Component {...pageProps} />
    </motion.div>
  </AnimatePresence>
}
