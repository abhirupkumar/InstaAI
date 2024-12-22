import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto';
import { updateSubscription } from '@/actions/user/queries';
import { PLANS } from '@/constants/pages';

export async function POST(req: NextRequest) {

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const receivedSignature = req.headers.get('x-razorpay-signature');

    let event;
    try {
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

        if (!event.payload.subscription || !event.payload.subscription.entity.plan_id || !event.payload.subscription.notes.userId) {
            return NextResponse.json({ error: 'Invalid subscription' }, { status: 402 });
        }

        const planId = event.payload.subscription.entity.plan_id;
        const plan = PLANS.find((p) => p.planId === planId)?.name as "FREE" | "STANDARD" | "PRO" | "ULTIMATE";
        if (!plan) {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }
        const clerkId = event.payload.subscription.notes.userId;
        console.log('Received event:', event.event, 'for clerkId:', clerkId, 'with plan:', plan, 'and planId:', planId);

        switch (event.event) {
            case 'subscription.upgraded':
                console.log('Subscription upgraded: ', event.payload.subscription);
                const updatedSubscription = await updateSubscription(clerkId, { subscriptionId: event.payload.subscription.entity.id as string, plan, planId: planId as string });
                if (!updatedSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                return NextResponse.json({ clerkId, subscription: event.payload.subscription, event: event.event }, { status: 301 });

            case 'subscription.activated':
                console.log('Subscription activated: ', event.payload.subscription);
                const activeSubscription = await updateSubscription(clerkId, { subscriptionId: event.payload.subscription.entity.id as string, plan, planId: planId as string });
                if (!activeSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                return NextResponse.json({ clerkId, subscription: event.payload.subscription, event: event.event }, { status: 302 });

            case 'subscription.expired':
                console.log('Subscription expired: ', event.payload.subscription);
                const expiredSubscription = await updateSubscription(clerkId, { subscriptionId: event.payload.subscription.entity.id as string, plan, planId: planId as string });
                if (!expiredSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                return NextResponse.json({ clerkId, subscription: event.payload.subscription, event: event.event }, { status: 303 });

            default:
                console.log('Unhandled event type:', event.event);
                return NextResponse.json({ status: 404 });
        }

    } catch (error) {
        NextResponse.json({ error: 'Failed to create subscription' }, { status: 404 });
    }


    return NextResponse.json({ status: 405 })
}