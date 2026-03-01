"use client";
import { getBlogs } from "@/actions/blog.action";
// export const dynamic = "force-dynamic";
// search in next js doc : "dynamic"

import { useEffect, useState } from "react";

export default function AboutPage() {
    const [data, setData] = useState();
    const [error, setError] = useState<{ message: string } | null>(null);

    console.log(data);
    console.log(error);

    useEffect(() => {
        (async () => {
            const { data, error } = await getBlogs();

            setData(data);
            setError(error);
        })();
    }, []);

    return (
        <div>
            <h2>This is about page component</h2>
        </div>
    );
}

//* For simulating load time
// await new Promise((resolve)=>setTimeout(resolve, 4000))

//* For simulating error
// throw new Error("Something Went Wrong");
