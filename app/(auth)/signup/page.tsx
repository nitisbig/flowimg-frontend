import { SignupForm } from "./SignUpForm"




export default function Register(){
    return(
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <SignupForm />
        </div>
    )
}