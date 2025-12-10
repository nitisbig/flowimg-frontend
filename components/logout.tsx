


'use client'

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";


export default function Logout() {
    const router = useRouter()
    async function handleClick() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    }
    return (
        <div>

            <Button variant={'destructive'} onClick={handleClick}>Logout</Button>
        </div>
    )
}