import { Suspense } from "react";
import CheckVerification from "./_components/checkVerification";

export default async function CheckVerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckVerification />
        </Suspense>
    )
}