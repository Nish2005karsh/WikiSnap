
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black/90">
            <SignUp routing="path" path="/sign-up" />
        </div>
    );
}
