import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { razorpay } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
    try {
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await req.json();

        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

        // Step 1: Validate the signature
        const generatedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 });
        }

        const subscription = await razorpay.subscriptions.fetch(razorpay_subscription_id);

        if (subscription.status === 'active') {
            return NextResponse.json({ success: true, message: 'Subscription Verified!' }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'Subscription is not active!' }, { status: 402 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch subscription' }, { status: 500 });
    }
}
