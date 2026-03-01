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
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

// zod schema
const formSchema = z.object({
    name: z.string().min(1, "This field is required"),
    password: z.string().min(8, "Minimum length is Eight"),
    email: z.email(),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const handleGoogleLogin = async () => {
        const data = authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000",
        });

        console.log(data);
    };

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            // const userData = {
            //     name: value.name,
            //     email: value.email,
            //     password: value.password,
            // }

            const toastId = toast.loading("Creating user");

            try {
                const { data, error } = await authClient.signUp.email(value);

                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success("User Created Successfully", { id: toastId });
            } catch (err) {
                toast.error("Something Went Wrong. Please Try Again", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="register-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                    <FieldGroup>
                        {/* Name field */}
                        <form.Field
                            name="name"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Name
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
                                            }></Input>

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
                        {/* Email Field */}
                        <form.Field
                            name="email"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Email
                                        </FieldLabel>
                                        <Input
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }></Input>

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
                        {/* Password Field */}
                        <form.Field
                            name="password"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Password
                                        </FieldLabel>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }></Input>

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
                    form="register-form"
                    className="cursor-pointer w-full"
                    type="submit">
                    Register
                </Button>
                <Button
                    onClick={() => handleGoogleLogin()}
                    variant="outline"
                    type="button"
                    className="w-full">
                    Continue with Google
                </Button>
            </CardFooter>
        </Card>
    );
}
