import { razorpay } from '@/lib/razorpay';
import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto';

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

        switch (event.event) {
            case 'subscription.created':
                // Handle subscription creation
                console.log('Subscription created:', event.payload.subscription);
                break;

            case 'subscription.upgraded':
                // Handle subscription upgrade
                console.log('Subscription upgraded:', event.payload.subscription);
                break;

            case 'subscription.activated':
                // Handle subscription activation
                console.log('Subscription activated:', event.payload.subscription);
                break;

            case 'subscription.expired':
                // Handle subscription expired
                console.log('Subscription expired:', event.payload.subscription);
                break;

            default:
                console.log('Unhandled event type:', event.event);
        }

    } catch (error) {
        NextResponse.json({ error: 'Failed to create subscription' }, { status: 403 });
    }


    return NextResponse.json({ status: 404 })
}