'use client'

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { PlaneBlue, InstaAI, Warning } from '@/icons'
import React, { useEffect } from 'react'
import PostButton from '../post'
import DeleteDialog from '../../delete-dialog'
import { useListener } from '@/hooks/use-automations'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    id: string
}

const ThenNode = ({ id }: Props) => {
    const { data } = useQueryAutomation(id)
    const {
        onSetListener,
        deleteMutation,
        listener: Listener,
        onFormSubmit,
        register,
        isPending,
        reset
    } = useListener(data?.data?.listener?.id || '')
    const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')
    const [prompt, setPrompt] = React.useState(data?.data?.listener?.prompt || '');

    useEffect(() => {
        onSetListener(data?.data?.listener?.listener || 'MESSAGE')
        reset({ prompt: prompt || "", reply: data?.data?.listener?.commentReply || '', listnerId: data?.data?.listener?.id })
    }, [reset, prompt])

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
                <DeleteDialog useIcon={true} onYes={() => deleteMutation({ id: data.data.listener!.id })} buttonText='Delete' dialogText='Are you Sure?' className="z-20" />
            </div>
            <div className="bg-background p-3 rounded-xl flex flex-col gap-y-2">
                <div className="flex gap-x-2 items-center">
                    {data.data.listener.listener === 'MESSAGE' ? (
                        <PlaneBlue />
                    ) : (
                        <InstaAI />
                    )}
                    <p className=" text-lg">
                        {data.data.listener.listener === 'MESSAGE'
                            ? 'Send the user a message.'
                            : 'Let InstaAI AI take over'}
                    </p>
                </div>
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-y-2"
                >
                    <Textarea
                        placeholder={
                            Listener === 'INSTAAI'
                                ? 'Add a prompt that your instaai ai can use...'
                                : 'Add a message you want send to your customers'
                        }
                        {...register('prompt')}
                        defaultValue={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-secondary outline-none border-none ring-0 focus:ring-0 min-h-[300px]"
                    />
                    {data?.data?.listener?.prompt && data?.data?.listener?.prompt !== prompt && <Button className="bg-custom-gradient w-full font-medium text-white">
                        <Loader state={isPending}>Save listener</Loader>
                    </Button>}
                </form>
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