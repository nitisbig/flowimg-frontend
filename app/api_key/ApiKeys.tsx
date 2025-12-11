'use client'
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, EyeOff, Trash2, LogIn } from "lucide-react";
import { useState, useMemo } from "react";
import { createApiKey, revokeApiKey } from "@/db/action";
import { Copy, Check } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApiItem {
    api: string;
    status: boolean;
}

export default function ApiKeyClient({ initialKeys }: { initialKeys: ApiItem[] }) {
    const [apiList, setApiList] = useState<ApiItem[]>(initialKeys);
    const [isLoading, setIsLoading] = useState(false);
    const [revokingKey, setRevokingKey] = useState<string | null>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
    const router = useRouter();

    const activeKeys = useMemo(() => 
        apiList.filter(api => api.status === true), 
        [apiList]
    );

    async function handleClick() {
        setIsLoading(true);
        try {
            const newToken = await createApiKey();
            setApiList((prev) => [
                { api: newToken, status: true },
                ...prev
            ]);
            toast.success("API key generated successfully");
        } catch (error) {
            console.error("Failed to generate key:", error);
            toast.error("Failed to generate API key");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRevoke(apiKey: string) {
        if (!confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) {
            return;
        }

        setRevokingKey(apiKey);
        try {
            await revokeApiKey(apiKey);
            

            setApiList((prev) =>
                prev.map((item) =>
                    item.api === apiKey ? { ...item, status: false } : item
                )
            );
            
            toast.success("API key revoked successfully");
            router.refresh();
        } catch (error) {
            console.error("Failed to revoke key:", error);
            toast.error("Failed to revoke API key");
        } finally {
            setRevokingKey(null);
        }
    }

    const copy = async (apiKey: string) => {
        await navigator.clipboard.writeText(apiKey);
        setCopiedKey(apiKey);
        setTimeout(() => setCopiedKey(null), 1500);
        toast.success("API key copied to clipboard");
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
            <div className="flex justify-between">
                <Button onClick={handleClick} disabled={isLoading}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {isLoading ? "Generating..." : "Generate new key"}
                </Button>
                <Button variant={'link'}>
                    <Link className="flex justify-center items-center gap-1" href={'docs'}>
                        Docs<LogIn className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activeKeys.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                No active API keys found. Generate one to get started.
                            </TableCell>
                        </TableRow>
                    ) : (
                        activeKeys.map((api, index) => (
                            <TableRow key={index} className="p-2 border rounded font-mono text-sm">
                                <TableCell>
                                    <Badge variant="default" className="gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        Active
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className="flex-1">
                                            {visibleKeys.has(api.api) ? api.api : maskApiKey(api.api)}
                                        </span>
                                        <Button 
                                            onClick={() => toggleVisibility(api.api)} 
                                            variant={'ghost'}
                                            size={'sm'}
                                            title={visibleKeys.has(api.api) ? "Hide key" : "Show key"}
                                        >
                                            {visibleKeys.has(api.api) ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </Button>
                                        <Button 
                                            onClick={() => copy(api.api)} 
                                            variant={'ghost'}
                                            size={'sm'}
                                            title="Copy to clipboard"
                                        >
                                            {copiedKey === api.api ? <Check size={16} /> : <Copy size={16} />}
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button 
                                        variant={'destructive'} 
                                        size={'sm'}
                                        onClick={() => handleRevoke(api.api)}
                                        disabled={revokingKey === api.api}
                                        title="Revoke this API key"
                                    >
                                        {revokingKey === api.api ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            </span>
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}