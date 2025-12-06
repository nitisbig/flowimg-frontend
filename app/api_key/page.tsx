
import { fetchAll } from "@/db/action";
import ApiKeyClient from "./ApiKeys";

export default async function ApiKeyPage() {
    const initialKeys = await fetchAll();
    
    return <ApiKeyClient initialKeys={initialKeys} />;
}
