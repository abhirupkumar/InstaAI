
'use server'

import { client } from '@/lib/prisma'
import { razorpay } from '@/lib/razorpay'

export const findUser = async (clerkId: string) => {
    const userData = await client.user.findUnique({
        where: {
            clerkId,
        },
        include: {
            subscription: true,
            integrations: {
                select: {
                    id: true,
                    token: true,
                    expiresAt: true,
                    name: true,
                },
            },
        },
    })

    if (!userData) return userData;
    if (userData?.subscription?.plan == 'FREE' || !userData?.subscription?.subscriptionId) return {
        ...userData,
        isSubscribed: false,
    };

    const subscription = await razorpay.subscriptions.fetch(userData?.subscription?.subscriptionId);

    return {
        ...userData,
        isSubscribed: subscription.status === 'active',
    }
}

export const createUser = async (
    clerkId: string,
    firstname: string,
    lastname: string,
    email: string
) => {
    return await client.user.create({
        data: {
            clerkId,
            firstname,
            lastname,
            email,
            subscription: {
                create: {},
            },
        },
        select: {
            firstname: true,
            lastname: true,
        },
    })
}

export const updateSubscription = async (
    clerkId: string,
    props: { subscriptionId?: string; plan?: 'FREE' | 'STANDARD' | 'PRO' | 'ULTIMATE', planId?: string }
) => {
    return await client.user.update({
        where: {
            clerkId,
        },
        data: {
            subscription: {
                update: {
                    data: {
                        ...props,
                    },
                },
            },
        },
    })
}