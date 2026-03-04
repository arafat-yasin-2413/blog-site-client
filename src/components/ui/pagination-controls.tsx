"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
    meta: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
    const { limit: pageSize, page: currentPage, total, totalPages } = meta;

    const searchParams = useSearchParams();
    const router = useRouter();
    // console.log('client searchparams by hook : ', searchParams.get("page"));

    // console.log(params)

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
        console.log(params);
    };

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);

    return (
        <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
            <div className="text-sm text-muted-forgrouond">
                Showing {start} to {end} of {total} results
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(1)}
                    disabled={currentPage === 1}>
                    <ChevronsLeft className="h-4 w-4"></ChevronsLeft>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4"></ChevronLeft>
                </Button>

                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    <ChevronRight className="h-4 w-4"></ChevronRight>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(totalPages)}
                    disabled={currentPage === totalPages}>
                    <ChevronsRight className="h-4 w-4"></ChevronsRight>
                </Button>
            </div>
        </div>
    );
}
