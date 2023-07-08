import { motion } from "framer-motion";
import React from "react"
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from "rehype-react";
import rehypePrism from "@mapbox/rehype-prism";
import remarkGfm from "remark-gfm";
import rehypeKatex from 'rehype-katex';
import rehypeDocument from "rehype-document";
import rehypeMermaid from "rehype-mermaidjs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { unified } from "unified";

enum networkStatus {
  loading,
  error,
  loaded,
}

export default function Blog() {
  const router = useRouter();
  const [status, setStatus] = useState<networkStatus>(networkStatus.loading);
  const [blogData, setBlogData] = useState<{
    content: string;
    description: string;
    title: string;
    _id: string;
    datePublished: string;
  } | null>(null);
  const [content, setContent] = useState<any>()
  useEffect(() => {
    console.log(router.query);
    if (!router.isReady) return;
    (async () => {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/blog/${router.query._id}`
        );
        const data: {
          content: string;
          description: string;
          title: string;
          _id: string;
          datePublished: string;
        } = await response.json();
        if (Object.keys(data).includes("content")) {
          setBlogData(data);
          setStatus(networkStatus.loaded);
        } else {
          setStatus(networkStatus.error);
        }
      } catch (e: any) {
        setStatus(networkStatus.error);
      }
    })();
  }, [router.isReady, router.query, blogData]);

  useEffect(() =>  {
    (async () => {
        if(status == networkStatus.loaded && blogData) {
            setContent((await (unified()
                              .use(remarkParse)
                              .use(remarkRehype)
                              .use(remarkGfm)
                              .use(rehypePrism)
                              .use(rehypeKatex)
                              .use(rehypeDocument, {
                                css: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css'
                              })

                              .use(rehypeMermaid)
                              .use(rehypeReact, { createElement: React.createElement })
                              .process(blogData?.content))).result)
        }
    })()
  }, [ status, blogData ])
  const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const formatDate = (d: string) => {
    const _date: Date = new Date(d);
    const date = `${_date.getDate()}${nthNumber(_date.getDate())}, ${_date.toLocaleString("default", { month: 'long' })} ${_date.getFullYear()}`;
    return date;
  };

  return (
    <main className="min-h-screen w-[100vw] flex flex-col items-center justify-center">
      <div className="flex flex-col min-h-screen py-20 w-[80%]">
        {status == networkStatus.loaded && blogData ? (
          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl">{blogData.title}</h1>
              <div className="flex flex-col items-end justify-center">
                <p className="text-2xl">{formatDate(blogData.datePublished)}</p>
                <p className="text-lg text-gray-600">{(() => {
                    const _date = new Date(blogData.datePublished);

                    return _date.toLocaleString("default", {weekday: "long"})
                })()}</p>
              </div>
            </div>
            <hr className="bg-white mt-3 mb-8"/>
            <div className="markdown-container leading-5 px-8">
                <div>{ content }</div>
            </div>
          </div>
        ) : status == networkStatus.error ? (
          <div>
            <h1>bro this thing doesn&apos;t even exist 💀</h1>
          </div>
        ) : status == networkStatus.loading ? (
          <div>
            <h1>Loading</h1>
          </div>
        ) : null}
      </div>
    </main>
  );
}
