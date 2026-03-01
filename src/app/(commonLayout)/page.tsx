import BlogCard from "@/components/modules/homepage/BlogCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
    const { data } = await blogService.getBlogPosts({
        isFeatured: false,
    
    }, {
        cache: "no-store",
    });

    // console.log(data);

    return (
        <div className="grid grid-cols-3 max-w-7xl mx-auto gap-5 mt-5 border p-4">
            {data?.data?.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post}></BlogCard>
            ))}
        </div>
    );
}
