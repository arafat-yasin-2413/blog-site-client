import React from "react";

export default async function AboutPage() {

    await new Promise((resolve)=>setTimeout(resolve, 4000))

    return (
        <div>
            <h2>This is about page component</h2>
        </div>
    );
}
