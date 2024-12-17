'use client'
import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { PlaneBlue, ProxyAi, Warning } from '@/icons'
import React from 'react'
import PostButton from '../post'
import DeleteDialog from '../../delete-dialog'
import { useListener } from '@/hooks/use-automations'

type Props = {
    id: string
}

const ThenNode = ({ id }: Props) => {
    const { data } = useQueryAutomation(id)
    const { deleteMutation } = useListener(data?.data?.listener?.id || '')
    const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

    return !data?.data?.listener ? (
        <></>
    ) : (
        <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-secondary gap-y-3">
            <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
                <span className="h-[9px] w-[9px] bg-connector/10 dark:bg-connector/90  rounded-full" />
                <Separator
                    orientation="vertical"
                    className="bottom-full flex-1 border-[1px] border-connector/10"
                />
                <span className="h-[9px] w-[9px] bg-connector/10 dark:bg-connector/90 rounded-full" />
            </div>
            <div className="flex gap-x-2">
                <div className="flex gap-x-2 flex-1">
                    <Warning />
                    Then...
                </div>
                <div className="flex gap-x-2">
                    <DeleteDialog onYes={() => deleteMutation({ id: data.data.listener!.id })} buttonText='Delete' dialogText='Are you Sure?' className="z-20" />
                </div>
            </div>
            <div className="bg-background p-3 rounded-xl flex flex-col gap-y-2">
                <div className="flex gap-x-2 items-center">
                    {data.data.listener.listener === 'MESSAGE' ? (
                        <PlaneBlue />
                    ) : (
                        <ProxyAi />
                    )}
                    <p className=" text-lg">
                        {data.data.listener.listener === 'MESSAGE'
                            ? 'Send the user a message.'
                            : 'Let Proxy AI take over'}
                    </p>
                </div>
                <p className="font-light text-text-secondary">
                    {data.data.listener.prompt}
                </p>
            </div>
            {data.data.posts.length > 0 ? (
                <></>
            ) : commentTrigger ? (
                <PostButton id={id} />
            ) : (
                <></>
            )}
        </div>
    )
}

export default ThenNode