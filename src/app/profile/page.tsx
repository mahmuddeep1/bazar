"use client";
import { Person } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { Avatar, Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // সাইন ইন না থাকলে signin পেজে পাঠিয়ে দেওয়া হবে
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/signin");
        }
    }, [isPending, session, router]);

    const handleUpdate = async () => {
        if (!name.trim()) {
            toast.error("কোনো নাম লেখা হয়নি!");
            return;
        }
        setLoading(true);
        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট হয়নি");
            } else {
                toast.success("নাম আপডেট হয়েছে");
                setName("");
                router.refresh();
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("নাম আপডেট করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.info("আপনি সাইন আউট করেছেন !");
        router.push("/");
    };

    return (
        <main className="min-h-screen bg-[#F0F5F0] px-5 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
                <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

                <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
                    <Avatar>
                        <Avatar.Fallback>
                            <Person />
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">{user?.name || "User"}</h2>
                        <p className="break-all text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <Button
                        variant="secondary"
                        className="border-red-400 text-red-500"
                        onPress={handleSignOut}>
                        ↩ সাইন আউট
                    </Button>
                </div>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
                    <h2 className="font-semibold text-gray-800">তথ্য</h2>

                    <div className="mt-8">
                        <label className="mb-2 block text-sm text-gray-700">নাম</label>
                        <Input
                            className="w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={user?.name || "আপনার নাম লিখুন"} />
                        <Button
                            className="mt-4 w-full bg-green-700 font-medium text-white rounded-md"
                            isDisabled={loading}
                            onPress={handleUpdate}>
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;