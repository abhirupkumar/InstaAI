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

        if (!event.payload.subscription || !event.payload.subscription.entity || !event.payload.notes.userId) {
            return NextResponse.json({ error: 'Invalid subscription' }, { status: 402 });
        }

        const planId = event.payload.subscription.entity.plan_id;
        const plan = PLANS.find((p) => p.planId === planId)?.name as "FREE" | "STANDARD" | "PRO" | "ULTIMATE";
        const userId = event.payload.subscription.notes.userId;

        switch (event.event) {
            case 'subscription.upgraded':
                console.log('Subscription upgraded: ', event.payload.subscription);
                const updatedSubscription = await updateSubscription(userId, { subscriptionId: event.payload.subscription.id, plan, planId });
                if (!updatedSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                break;

            case 'subscription.activated':
                console.log('Subscription activated: ', event.payload.subscription);
                const activeSubscription = await updateSubscription(userId, { subscriptionId: event.payload.subscription.id, plan, planId });
                if (!activeSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                break;

            case 'subscription.expired':
                console.log('Subscription expired: ', event.payload.subscription);
                const expiredSubscription = await updateSubscription(userId, { subscriptionId: event.payload.subscription.id, plan, planId });
                if (!expiredSubscription) {
                    return NextResponse.json({ error: 'Failed to update subscription!' }, { status: 403 });
                }
                break;

            default:
                console.log('Unhandled event type:', event.event);
                NextResponse.json({ status: 404 });
        }
        return NextResponse.json({ status: 200 });

    } catch (error) {
        NextResponse.json({ error: 'Failed to create subscription' }, { status: 404 });
    }


    return NextResponse.json({ status: 405 })
}