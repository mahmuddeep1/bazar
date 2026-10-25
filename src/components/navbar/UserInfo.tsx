"use client"
import { Person } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleSignOut = async () => {
    setIsOpen(false);
    await authClient.signOut();
    toast.info("আপনি সাইন আউট করেছেন !")
    router.push("/")
}
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            {
                user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <Avatar.Fallback>
                                <Person />
                            </Avatar.Fallback>
                        </Avatar>
                        <span className="text-sm"> {user.name} </span>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[14px] text-gray-500 cursor-pointer">⏷</button>
                        {isOpen && (
                            <div className="absolute right-0 top-12 z-50 w-80 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
                                <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
                                <p className="mb-8 text-gray-500">{user?.email}</p>

                                <Link href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="mb-6 block text-lg text-gray-800">
                                    👤 আমার প্রোফাইল
                                </Link>

                                <button onClick={handleSignOut}
                                    className="text-lg text-red-500 cursor-pointer">↩ সাইন আউট
                                    </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='flex gap-2 px-20 text-sm'>
                        <Link href={"/signin"} className='cursor-pointer hover:bg-gray-200 py-1 px-3 rounded-md'>সাইন ইন</Link>
                        <Link href={"/signup"} className=' bg-[#07883e] text-white py-1 px-3 rounded-md hover:bg-[#067534] cursor-pointer'>সাইন আপ</Link>
                    </div>
                )
            }
        </div>
    )
};

export default UserInfo;