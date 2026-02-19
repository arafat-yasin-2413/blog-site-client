"use client";
import React, { useEffect } from "react";

export default function AboutError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, []);

    return (
        <div>
            <h1>Something Went Wrrong. Please Try Again.. (aboutError)</h1>

            <button className="bg-green-500 p-2" onClick={() => reset()}>Retry</button>
        </div>
    );
}
