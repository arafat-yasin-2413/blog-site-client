"use client";
import { error } from "node:console";
import React, { useEffect } from "react";

export default function AboutError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, []);

    return (
        <div>
            <h1>Something Went Wrrong... (aboutError)</h1>

            <button onClick={() => reset()}>Retry</button>
        </div>
    );
}
