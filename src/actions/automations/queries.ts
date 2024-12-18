'use server'

import { SAMPLE_AI_PROMPT } from '@/constants/prompt'
import { client } from '@/lib/prisma'
import { v4 } from 'uuid'

export const createAutomation = async (clerkId: string, id?: string) => {
    return await client.user.update({
        where: {
            clerkId,
        },
        data: {
            automations: {
                create: {
                    ...(id && { id }),
                },
            },
        },
    })
}

export const deleteAutomation = async (id?: string) => {
    return await client.automation.delete({
        where: {
            id
        },
    })
}

export const getAutomations = async (clerkId: string) => {
    return await client.user.findUnique({
        where: {
            clerkId,
        },
        select: {
            automations: {
                orderBy: {
                    createdAt: 'asc',
                },
                include: {
                    keywords: true,
                    listener: true,
                },
            },
        },
    })
}

export const findAutomation = async (id: string) => {
    return await client.automation.findUnique({
        where: {
            id,
        },
        include: {
            keywords: true,
            trigger: true,
            posts: true,
            listener: true,
            User: {
                select: {
                    subscription: true,
                    integrations: true,
                },
            },
        },
    })
}

export const updateAutomation = async (
    id: string,
    update: {
        name?: string
        active?: boolean
    }
) => {
    return await client.automation.update({
        where: { id },
        data: {
            name: update.name,
            active: update.active,
        },
    })
}

export const upsertListener = async (
    automationId: string,
    listener: 'PROXYAI' | 'MESSAGE',
    prompt?: string,
    reply?: string,
    listnerId?: string
) => {
    if (listnerId) {
        return await client.listener.update({
            where: {
                id: listnerId,
            },
            data: {
                prompt: prompt || '',
            },
        })
    }
    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            listener: {
                create: {
                    listener,
                    prompt: prompt || (listener === 'PROXYAI' ? SAMPLE_AI_PROMPT : 'Hello, Nice to meet you!'),
                    commentReply: reply,
                },
            },
        },
    })
}

export const deleteListenerQuery = async (
    id: string,
) => {
    return await client.listener.delete({
        where: {
            id: id,
        }
    })
}

export const addTrigger = async (automationId: string, trigger: string[]) => {
    if (trigger.length === 2) {
        return await client.automation.update({
            where: { id: automationId },
            data: {
                trigger: {
                    createMany: {
                        data: [{ type: trigger[0] }, { type: trigger[1] }],
                    },
                },
            },
        })
    }
    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            trigger: {
                create: {
                    type: trigger[0],
                },
            },
        },
    })
}

export const addKeyWord = async (automationId: string, keyword: string) => {
    return client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            keywords: {
                create: {
                    word: keyword,
                },
            },
        },
    })
}

export const deleteTriggerQuery = async (id: string) => {
    return client.trigger.delete({
        where: { id },
    })
}

export const deleteKeywordQuery = async (id: string) => {
    return client.keyword.delete({
        where: { id },
    })
}

export const deletePostQuery = async (id: string) => {
    return client.post.delete({
        where: { id },
    })
}

export const addPost = async (
    autmationId: string,
    posts: {
        postid: string
        caption?: string
        media: string
        mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    }[]
) => {
    return await client.automation.update({
        where: {
            id: autmationId,
        },
        data: {
            posts: {
                createMany: {
                    data: posts,
                },
            },
        },
    })
}