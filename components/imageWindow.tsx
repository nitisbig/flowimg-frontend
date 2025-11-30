'use client'

import { useQuery } from "@tanstack/react-query";


export default function ImgWindow(){
    const {data, isPending} = useQuery({
        queryKey: ['generated-image'],
        queryFn: ()=>null,
        enabled:false
    })

    return(
        <div className="flex-1">
            <div className="flex h-full items-center justify-center">
                <img style={{width: '400px', borderRadius: '15px'}} src={`data:image/png;base64,${data}`} alt="ohit" />
            </div>
        </div>
    )
}