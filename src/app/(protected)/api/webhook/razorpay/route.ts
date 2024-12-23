import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto';
import { PLANS } from '@/constants/pages';
import { updateSubscription } from '@/actions/user/queries';

export async function POST(req: NextRequest) {

    console.log('Webhook received at:', new Date().toISOString());

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const receivedSignature = req.headers.get('x-razorpay-signature');

    let event;
    const request = await req.json();
    const body = JSON.stringify(request);
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

    if (receivedSignature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    event = request;

    if (!event.payload.subscription || !event.payload.subscription.entity.plan_id || !event.payload.subscription.entity.id) {
        return NextResponse.json({ error: 'Invalid subscription' }, { status: 402 });
    }

    const planId = event.payload.subscription.entity.plan_id;
    const plan = PLANS.find((p) => p.planId == planId)?.name as "FREE" | "STANDARD" | "PRO" | "ULTIMATE";
    if (!plan) {
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    const subscriptionId = event.payload.subscription.entity.id;
    const clerkId = event.payload.subscription.entity.notes.userId;

    switch (event.event) {
        case 'subscription.upgraded':
            return NextResponse.json({ status: 201 });

        case 'subscription.activated':
            const activeSubscription = await updateSubscription(clerkId, { subscriptionId: subscriptionId as string, plan, planId: planId as string });
            if (!activeSubscription) {
                return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
            }
            return NextResponse.json({ status: 202 });

        case 'subscription.expired':
            return NextResponse.json({ status: 203 });

        default:
            console.log('Unhandled event type:', event.event);
            return NextResponse.json({ status: 404 });
    }

}