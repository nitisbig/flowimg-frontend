import { getImages } from "@/lib/gcp_img"
import Image from "next/image"




export default async function Gallery(){
    const images = await getImages()
    console.log(images)
    return(
        <div className=" flex gap-1">
            {
                images.map((item, id)=>(
                    <div key={id}>

                        <Image src={item.url} 
                        width={144}
                        height={144}
                        alt="img"
                        />
                    </div>
                ))
            }
        </div>
    )
}