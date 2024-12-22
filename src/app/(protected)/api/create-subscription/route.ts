import { findUser } from '@/actions/user/queries';
import { razorpay } from '@/lib/razorpay';
import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const user = await currentUser()
    if (!user) return NextResponse.json({ status: 401 });
    const dbUser = await findUser(user.id);
    if (!dbUser) return NextResponse.json({ status: 401 });

    const { planId } = await req.json();
    if (!planId || planId == '') {
        return NextResponse.json({ status: 402 });
    }
    try {
        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            total_count: 12, // Number of billing cycles
            customer_notify: 1, // Notify customer via email
        });

        return NextResponse.json({
            subscriptionId: subscription.id,
            razorpayKey: process.env.RAZORPAY_KEY_ID!,
            userId: dbUser.id,
        }, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: 'Failed to create subscription' }, { status: 403 });
    }


    return NextResponse.json({ status: 404 })
}