// app/api-keys/ApiKeyClient.tsx (Client Component)
'use client'

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { generateAndStoreAPI } from "@/db/action";

interface ApiItem {
    key: string;
    status: boolean;
}

export default function ApiKeyClient({ initialKeys }: { initialKeys: ApiItem[] }) {
    const [apiList, setApiList] = useState<ApiItem[]>(initialKeys);
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        setIsLoading(true);
        try {
            const newToken = await generateAndStoreAPI();
            setApiList((prev) => [
                { key: newToken, status: true },
                ...prev
            ]);
        } catch (error) {
            console.error("Failed to generate key:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-4 space-y-4">
            <Button onClick={handleClick} disabled={isLoading}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isLoading ? "Generating..." : "Generate Key"}
            </Button>

            <div className="space-y-2">
                {apiList.map((api, index) => (
                    <div key={index} className="p-2 border rounded bg-gray-50 font-mono text-sm">
                        {api.key} <span className={api.status ? "text-green-600" : "text-red-600"}>
                            ({api.status ? 'Active' : 'Inactive'})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}