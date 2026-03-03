import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";
import React from "react";

export default async function HistoryPage({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) {
    const { page } = await searchParams;
    const response = await blogService.getBlogPosts({
        page,
    });
    // console.log("response ------ ", response);
    const posts = response.data?.data || [];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Blog History Page</h1>
            <HistoryTable posts={posts}></HistoryTable>
        </div>
    );
}
