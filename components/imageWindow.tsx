'use client'

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Helper function to convert Base64 to Blob
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
    // Added saving state to show feedback to user
    const [isSaving, setIsSaving] = useState(false);

    const { data } = useQuery({
        queryKey: ['generated-image'],
        queryFn: () => null, // Replace with your actual fetch logic
        enabled: false
    });

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!data) {
            setImageUrl(null);
            return;
        }

        try {
            // Using the helper function logic you wrote, wrapped in blob creation
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

    // --- NEW SAVE FUNCTION ---
    const handleSave = async () => {
        if (!data) return;

        setIsSaving(true);
        try {
            // 1. Convert the base64 string back to a Blob
            const blob = base64ToBlob(data);

            // 2. Prepare FormData to send to our API
            const formData = new FormData();
            formData.append('file', blob, 'image.png');

            // 3. Send to our Next.js API route
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();
            console.log('Saved successfully:', result);
            alert("Image saved to gallery!"); // Replace with a Toast notification if available

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
                    <p className="text-muted-foreground">No image generated yet</p>
                )}
            </div>
        </div>
    );
}