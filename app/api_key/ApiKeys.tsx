// app/api-keys/ApiKeyClient.tsx (Client Component)
'use client'
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { generateAndStoreAPI } from "@/db/action";
import { Copy, Check } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface ApiItem {
    key: string;
    status: boolean;
}

export default function ApiKeyClient({ initialKeys }: { initialKeys: ApiItem[] }) {
    const [apiList, setApiList] = useState<ApiItem[]>(initialKeys);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

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

    const copy = async (apiKey: string) => {
        await navigator.clipboard.writeText(apiKey);
        setCopiedKey(apiKey);
        setTimeout(() => setCopiedKey(null), 1500);
    };

    const toggleVisibility = (apiKey: string) => {
        setVisibleKeys(prev => {
            const newSet = new Set(prev);
            if (newSet.has(apiKey)) {
                newSet.delete(apiKey);
            } else {
                newSet.add(apiKey);
            }
            return newSet;
        });
    };

    const maskApiKey = (key: string) => {
        if (key.length <= 8) return '••••••••';
        return key.substring(0, 4) + '••••••••••••' + key.substring(key.length - 4);
    };

    return (
        <div className="p-4 space-y-4">
            <Button onClick={handleClick} disabled={isLoading}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isLoading ? "Generating..." : "Generate Key"}
            </Button>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apiList.map((api, index) => (
                        <TableRow key={index} className="p-2 border rounded bg-gray-50 font-mono text-sm">
                            <TableCell>{api.status ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <span className="flex-1">
                                    {visibleKeys.has(api.key) ? api.key : maskApiKey(api.key)}
                                </span>
                                <Button 
                                    onClick={() => toggleVisibility(api.key)} 
                                    variant={'ghost'}
                                    size={'sm'}
                                >
                                    {visibleKeys.has(api.key) ? <EyeOff size={16} /> : <Eye size={16} />}
                                </Button>
                                <Button 
                                    onClick={() => copy(api.key)} 
                                    variant={'ghost'}
                                    size={'sm'}
                                >
                                    {copiedKey === api.key ? <Check size={16} /> : <Copy size={16} />}
                                </Button>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant={'destructive'} size={'sm'}>Revoke</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}