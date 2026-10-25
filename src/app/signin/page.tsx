"use client";
import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// sessionStorage থেকে ইমেইল পড়া (useEffect + setState ছাড়া, তাই lint error নেই)
const subscribe = () => () => {};
const getEmail = () => sessionStorage.getItem("signupEmail") || "";
const getServerEmail = () => "";

function SignInPage() {
    const router = useRouter();
    const savedEmail = useSyncExternalStore(subscribe, getEmail, getServerEmail);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                console.log(error);
                toast.error(error.message || `Login failed! (${error.status} ${error.statusText})`);
                return;
            }

            sessionStorage.removeItem("signupEmail");
            toast.success("সফলভাবে সাইন ইন হয়েছে");
            router.push("/");
        } catch (err) {
            console.error("signin crash:", err);
            toast.error("সার্ভারে সমস্যা হয়েছে, Terminal এর error দেখুন");
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) {
            console.log(error);
            toast.error(error.message || "Google দিয়ে সাইন ইন হয়নি");
        }
    };

    const handleGithubSignIn = async () => {
        const { error } = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });
        if (error) {
            console.log(error);
            toast.error(error.message || "GitHub দিয়ে সাইন ইন হয়নি");
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#26332b]">সাইন ইন করুন</h1>
                    <p className="mt-2 text-sm text-gray-600">সাইন ইন করে সব বিস্তারিত দাম দেখুন।</p>
                </div>

                <div className="rounded-2xl border border-[#dce6dd] bg-[#fbfcfb] p-5 sm:p-7 shadow-sm">
                    <Form
                        className="flex w-full flex-col gap-4"
                        render={(props) => <form {...props} />}
                        onSubmit={onSubmit}>
                        {/* key দিলে hydration এর পর saved ইমেইল ঠিকমতো বসবে */}
                        <TextField
                            key={savedEmail}
                            isRequired
                            name="email"
                            type="email"
                            defaultValue={savedEmail}
                            className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-[#26332b]">ইমেইল</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600" />
                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-[#26332b]">পাসওয়ার্ড</Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="তোমার পাসওয়ার্ড"
                                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600" />
                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <Button
                            type="submit"
                            className="mt-1 w-full rounded-lg bg-[#07883e] py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#067534]">
                            সাইন ইন করুন
                        </Button>
                    </Form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-500">অথবা</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            onPress={handleGoogleSignIn}
                            type="button"
                            variant="secondary"
                            className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-2 py-2.5 text-sm text-[#26332b] hover:bg-gray-50">
                            <Image src={"/google-logo.png"} alt="google" width={20} height={20} />
                            Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button
                            onPress={handleGithubSignIn}
                            type="button"
                            variant="secondary"
                            className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-2 py-2.5 text-sm text-[#26332b] hover:bg-gray-50">
                            <Image src={"/github_logo.webp"} alt="github" width={20} height={20} />
                            GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link href="/signup" className="font-medium text-[#07883e] hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-500 transition hover:text-green-700">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default SignInPage;