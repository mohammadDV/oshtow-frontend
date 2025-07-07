import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { VerificationService } from "@/app/profile/layout";

export async function POST(request: NextRequest) {
    try {
        const userData: VerificationService = await request.json();
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'userData',
            value: JSON.stringify(userData),
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to set cookie' },
            { status: 500 }
        );
    }
}