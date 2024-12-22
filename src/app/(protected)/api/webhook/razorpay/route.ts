import { razorpay } from '@/lib/razorpay';
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto';
import { findUserFromSubscriptionId, updateSubscription } from '@/actions/user/queries';
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

        if (!event.payload.subscription || !event.payload.subscription.entity) {
            return NextResponse.json({ error: 'Invalid subscription' }, { status: 402 });
        }

        const subscribedUser = await findUserFromSubscriptionId(event.payload.subscription.entity.id);
        if (!subscribedUser || !subscribedUser.userId) {
            return NextResponse.json({ error: 'Invalid subscription' }, { status: 403 });
        }

        const planId = event.payload.subscription.entity.plan_id;
        const plan = PLANS.find((p) => p.planId === planId)?.name as "FREE" | "STANDARD" | "PRO" | "ULTIMATE";

        switch (event.event) {
            case 'subscription.created':
                // Handle subscription creation
                console.log('Subscription created:', event.payload.subscription);
                break;

            case 'subscription.upgraded':
                console.log('Subscription upgraded:', event.payload.subscription);
                const updatedSubscription = await updateSubscription(subscribedUser.userId, { subscriptionId: event.payload.subscription.entity.id, plan, planId, status: 'ACTIVE' });
                if (!updatedSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                break;

            case 'subscription.activated':
                console.log('Subscription activated:', event.payload.subscription);
                const activeSubscription = await updateSubscription(subscribedUser.userId, { subscriptionId: event.payload.subscription.entity.id, plan, planId, status: 'ACTIVE' });
                if (!activeSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                break;

            case 'subscription.expired':
                console.log('Subscription expired:', event.payload.subscription);
                const expiredSubscription = await updateSubscription(subscribedUser.userId, { subscriptionId: event.payload.subscription.entity.id, plan, planId, status: 'EXPIRED' });
                if (!expiredSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                break;

            default:
                console.log('Unhandled event type:', event.event);
        }

    } catch (error) {
        NextResponse.json({ error: 'Failed to create subscription' }, { status: 403 });
    }


    return NextResponse.json({ status: 404 })
}