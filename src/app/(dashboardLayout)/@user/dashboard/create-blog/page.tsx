import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {

    const {data} = await blogService.getBlogPosts({}, {cache: "no-store"});
    console.log(data.data);

    return (
        <div>
            {/* <CreateBlogFormServer></CreateBlogFormServer> */}

            <CreateBlogFormClient></CreateBlogFormClient>

            {data.data.map((item:BlogPost)=> <p key={item.id}>{item.title}</p>)}
        </div>
    );
}
