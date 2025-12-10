
import { getMyKeys } from "@/db/action";
import ApiKeyClient from "./ApiKeys";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NotLoggedIn from "@/components/notLoggedPage";

export default async function ApiKeyPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) return <NotLoggedIn />
    
    const initialKeys = await getMyKeys();
    return <ApiKeyClient initialKeys={initialKeys} />;
}
