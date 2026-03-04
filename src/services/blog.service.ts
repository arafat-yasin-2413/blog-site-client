import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

//* Not Dynamic and No { cache no-store } : SSG --> Static Page
//* { cache: no-store } : SSR --> Dynamic Page
//* next: { revalidate: 10 } : ISR --> Mixed Between Static and Dynamic

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
    page?: string;
    limit?: string;
}

export interface BlogData {
    title: string;
    content: string;
    tags?: string[];
}

export const blogService = {
    getBlogPosts: async function (
        params?: GetBlogsParams,
        options?: ServiceOptions,
    ) {
        try {
            const url = new URL(`${API_URL}/posts`);

            // console.log(Object.entries(params));
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }

            // console.log(url.toString());
            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            config.next = { ...config.next, tags: ["blogPosts"] };

            const res = await fetch(url.toString(), config);
            // const res = await fetch(url.toString(), {
            //     next: {
            //         tags: ["blogPosts"]
            //     }
            // });

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    getBlogById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return {
                data: null,
                error: { message: "Something Went Wrong (get post by id)." },
            };
        }
    },

    createBlogPost: async (blogData: BlogData) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(blogData),
            });

            const data = await res.json();

            if (data.error) {
                return {
                    data: null,
                    error: {
                        message: "Error: Post not created.",
                    },
                };
            }

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
};
