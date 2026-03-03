"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

// zod schema
const blogSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be less than 200 characters"),
    content: z
        .string()
        .min(10, "Content must be at least 10 characters")
        .max(5000, "Content must be less than 5000 characters"),
    tags: z.string(),
});

export function CreateBlogFormClient() {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
        validators: {
            onSubmit: blogSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating ....");

            const blogData = {
                ...value,
                tags: value.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter((item) => item !== ""),
            };

            console.log(blogData);

            try {
                //* POST LOGIC HERE
                toast.success("Post Created Successfully", { id: toastId });
            } catch (err) {
                toast.error("Something Went Wrong. Please Try Again", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a Post</CardTitle>
                <CardDescription>
                    Enter your thoughts to create a post
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="blog-post"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        {/* Title field */}
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Title
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Blog title"></Input>

                                        {isInvalid && (
                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }></FieldError>
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        {/* Content Field */}
                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Content
                                        </FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }placeholder="Write your blog"></Textarea>

                                        {isInvalid && (
                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }></FieldError>
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        {/* Tags Field */}
                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Tags (comma separated)
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            } placeholder="nextjs, web"></Input>

                                        {isInvalid && (
                                            <FieldError
                                                errors={
                                                    field.state.meta.errors
                                                }></FieldError>
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-5 justify-end">
                <Button
                    form="blog-post"
                    className="cursor-pointer w-full"
                    type="submit">
                    Submit
                </Button>
                
            </CardFooter>
        </Card>
    );
}
