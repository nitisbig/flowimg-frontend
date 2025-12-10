export const dynamic = 'force-dynamic';

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getImages } from "@/lib/gcp_img"
import { Library } from "lucide-react";
import Image from "next/image"



export default async function Gallery() {
    const images = await getImages();

    return (
        <div className="flex flex-col gap-0.5">
            <Separator />
            <Alert>
                <Library />
                <AlertTitle>
                    Explore Public Library
                </AlertTitle>
            </Alert>
            
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">

                {images.map((item, id) => (
                    <div
                        key={id}
                        className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        <Image
                            src={item.url}
                            width={200}
                            height={200}
                            alt="img"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
