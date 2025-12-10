import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";




export default function UnderConstruction() {
    return (

        <Alert variant={'destructive'}>
            <AlertCircle />
            <AlertTitle>
                This Page is Under Construction
            </AlertTitle>
            <AlertDescription>
I am working hard to bring you something amazing. This page is currently being built and will be available soon.
            </AlertDescription>
        </Alert>

    )
}