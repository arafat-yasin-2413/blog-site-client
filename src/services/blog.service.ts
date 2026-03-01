import { env } from "@/env";

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

            const res = await fetch(url.toString(), config);

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
};
