'use client'
import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { InstagramBlue, Warning } from '@/icons'
import Image from 'next/image'
import React, { useMemo } from 'react'
import DeleteDialog from '../../delete-dialog'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { usePosts } from '@/hooks/use-automations'

type Props = {
    id: string
}

const PostNode = ({ id }: Props) => {
    const { deleteMutation } = usePosts(id)
    const { latestVariable } = useMutationDataState(['delete-post'])
    const { data } = useQueryAutomation(id)

    return (
        data?.data &&
        data.data.posts.length > 0 && (
            <div className="w-10/12 lg:w-8/12 relative xl:w-4/12 p-5 rounded-xl flex flex-col bg-secondary gap-y-3">
                <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
                    <span className="h-[9px] w-[9px] bg-connector/10 dark:bg-connector/90 rounded-full" />
                    <Separator
                        orientation="vertical"
                        className="bottom-full flex-1 border-[1px] border-connector/10"
                    />
                    <span className="h-[9px] w-[9px] bg-connector/10 dark:bg-connector/90 rounded-full" />
                </div>
                <div className="flex gap-x-2 items-center">
                    <Warning />
                    If they comment on...
                </div>
                <div className="bg-background p-3 rounded-xl flex flex-col gap-y-2">
                    <div className="flex gap-x-2 items-center">
                        <InstagramBlue />
                        <p className="font-bold text-lg">These posts</p>
                    </div>
                    <div className="flex gap-x-2 flex-wrap mt-3">
                        {data.data.posts.map((post) => (!latestVariable || post.id !== latestVariable.variables.id) && (
                            <div
                                key={post.id}
                                className="relative flex flex-col w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                            >
                                <Image
                                    fill
                                    sizes="100vw"
                                    src={post.media}
                                    alt="post image"
                                />
                                <DeleteDialog useIcon={true} onYes={() => deleteMutation({ id: post.id })} buttonText='Delete' dialogText='Are you Sure?' className="z-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    )
}

export default PostNode