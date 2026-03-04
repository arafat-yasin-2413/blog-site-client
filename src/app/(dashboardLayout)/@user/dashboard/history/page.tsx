import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
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
    const pagination = response.data?.pagination || {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1,
    };

    // console.log("pagination data : ******* ", pagination);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Blog History Page</h1>
            <HistoryTable posts={posts}></HistoryTable>

            <PaginationControls meta={pagination}></PaginationControls>
        </div>
    );
}
