
'use server'

import { PLANS } from '@/constants/pages'
import { client } from '@/lib/prisma'

export const findUser = async (clerkId: string) => {
    return await client.user.findUnique({
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
}

export const findUserFromSubscriptionId = async (subscriptionId: string) => {
    return await client.subscription.findUnique({
        where: {
            subscriptionId,
        }
    })
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
    props: { subscriptionId?: string; plan?: 'FREE' | 'STANDARD' | 'PRO' | 'ULTIMATE', planId?: string, status: 'ACTIVE' | 'PENDING' | 'CANCELED' | 'INCOMPLETE' | 'EXPIRED' }
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