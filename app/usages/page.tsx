import UnderConstruction from "@/components/underConstruct";
import ApiKeyDashboard from "@/components/usages/analytics";



export default function Usages(){
    return(
        <div className="flex flex-col gap-7">
            <UnderConstruction />
            <ApiKeyDashboard />
        </div>
    )
}