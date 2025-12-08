'use client'

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import EmptyHero from "./emptyHero";

const base64ToBlob = (base64Data: string, contentType = 'image/png') => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
}

export default function ImgWindow() {

    const [isSaving, setIsSaving] = useState(false);

    const { data } = useQuery({
        queryKey: ['generated-image'],
        queryFn: () => null,
        enabled: false
    });

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!data) {
            setImageUrl(null);
            return;
        }

        try {

            const blob = base64ToBlob(data);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        } catch (error) {
            console.error('Error converting base64 to object URL:', error);
            setImageUrl(null);
        }
    }, [data]);

    const handleDownload = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `generated-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSave = async () => {
        if (!data) return;

        setIsSaving(true);
        try {

            const blob = base64ToBlob(data);

            const formData = new FormData();
            formData.append('file', blob, 'image.png');
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();
            console.log('Saved successfully:', result);
            alert("Image saved to gallery!"); 

        } catch (error) {
            console.error('Error saving image:', error);
            alert("Failed to save image.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="flex-1">
            <div className="flex flex-col h-full items-center justify-center gap-4">
                {imageUrl ? (
                    <>
                        <img
                            style={{ width: '400px', borderRadius: '15px' }}
                            src={imageUrl}
                            alt="Generated image"
                        />
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleDownload}>
                                Download
                            </Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save to Cloud"}
                            </Button>
                        </div>
                    </>
                ) : (
                    <EmptyHero />
                )}
            </div>
        </div>
    );
}