"use client";
import React from "react";
import Link from "next/link";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function SignUpPage() {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name")?.toString() ?? "";
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";
        const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

        if (password !== confirmPassword) {
            toast.error("দুটি পাসওয়ার্ড মিলছে না !");
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/signin",
            });
            console.log({ data, error });

            if (error) {
                toast.error(error.message || `Signup failed! (${error.status} ${error.statusText})`);
                return;
            }

            // শুধু ইমেইল রাখা হচ্ছে, পাসওয়ার্ড sessionStorage এ রাখা নিরাপদ না
            sessionStorage.setItem("signupEmail", email);
            toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");
            router.push("/signin");
        } catch (err) {
            console.error("signup crash:", err);
            toast.error("সার্ভারে সমস্যা হয়েছে, Terminal এর error দেখুন");
        }
    };

    const handleGoogleSignUp = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) {
            console.log(error);
            toast.error(error.message || "Google দিয়ে সাইন আপ হয়নি");
        }
    };

    const handleGithubSignUp = async () => {
        const { error } = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });
        if (error) {
            console.log(error);
            toast.error(error.message || "GitHub দিয়ে সাইন আপ হয়নি");
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#26332b]">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>
                <div className="rounded-2xl border border-[#dce6dd] bg-[#fbfcfb] p-5 sm:p-7 shadow-sm">
                    <Form
                        className="flex w-full flex-col gap-4"
                        render={(props) => <form {...props} />}
                        onSubmit={onSubmit}>
                        <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-[#26332b]">নাম</Label>
                            <Input
                                name="name"
                                placeholder="যেমন: রহিম উদ্দিন"
                                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600" />
                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="flex flex-col gap-1.5"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "সঠিক ইমেইল ঠিকানা লিখুন।";
                                }
                                return null;
                            }}>
                            <Label className="text-sm font-medium text-[#26332b]">ইমেইল</Label>
                            <Input
                                name="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600" />
                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            minLength={8}
                            className="flex flex-col gap-1.5"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
                                }
                                return null;
                            }}>
                            <Label className="text-sm font-medium text-[#26332b]">পাসওয়ার্ড</Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600" />
                            <Description className="text-xs text-gray-500">
                                কমপক্ষে ৮ অক্ষর ব্যবহার করুন।
                            </Description>
                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                            className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-[#26332b]">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </Label>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="আবার লিখুন"
                                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600" />
                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        <Button
                            type="submit"
                            className="mt-1 w-full rounded-lg bg-[#07883e] py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#067534]">
                            অ্যাকাউন্ট তৈরি করুন
                        </Button>
                    </Form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-500">অথবা</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            onPress={handleGoogleSignUp}
                            type="button"
                            variant="secondary"
                            className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-2 py-2.5 text-sm text-[#26332b] hover:bg-gray-50">
                            <Image src={"/google-logo.png"} alt="google" width={20} height={20} />
                            Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button
                            onPress={handleGithubSignUp}
                            type="button"
                            variant="secondary"
                            className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-2 py-2.5 text-sm text-[#26332b] hover:bg-gray-50">
                            <Image src={"/github_logo.webp"} alt="github" width={20} height={20} />
                            GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/signin" className="font-medium text-[#07883e] hover:underline">
                            সাইন ইন করুন
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

export default SignUpPage;