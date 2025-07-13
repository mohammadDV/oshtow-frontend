import { Suspense } from "react";
import EmailVerification from "./_components/emailVerification";

export default async function EmailVerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmailVerification />
        </Suspense>
    )
}