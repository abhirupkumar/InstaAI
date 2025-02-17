'use client'
import { usePaths } from '@/hooks/user-nav'
import { cn, getMonth } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import DeleteDialog from '../delete-dialog'
import { useEditAutomation } from '@/hooks/use-automations'
import DeleteAutomationButton from './delete-automation-button'

type Props = {}

const AutomationList = (props: Props) => {
    const { data } = useQueryAutomations()
    const { latestVariable } = useMutationDataState(['create-automation', 'delete-automation'])
    const { pathname } = usePaths()

    const optimisticUiData = useMemo(() => {
        if ((latestVariable && latestVariable?.variables && data)) {
            const test = [latestVariable.variables, ...data.data]
            // remove duplicates
            test.filter((item, index) => test.indexOf(item) === index)
            return { data: test }
        }
        return data || { data: [] }
    }, [latestVariable, data])

    if (data?.status !== 200 || data.data.length <= 0) {
        return (
            <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
                <h3 className="text-lg text-gray-400">No Automations </h3>
                <CreateAutomation />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-3">
            {optimisticUiData && optimisticUiData.data.length && optimisticUiData.data.map((automation) => (
                <div
                    key={automation.id}
                    className="bg-secondary hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] flex border-[#545454]"
                >
                    <Link href={`${pathname}/${automation.id}`} className="flex flex-col flex-1 items-start">
                        <h2 className="text-xl font-semibold">{automation.name}</h2>
                        <p className="text-muted-foreground text-sm font-light mb-2">
                            This is from the comment
                        </p>

                        {automation.keywords.length > 0 ? (
                            <div className="flex gap-x-2 flex-wrap mt-3">
                                {
                                    //@ts-ignore
                                    automation.keywords.map((keyword, key) => (
                                        <div
                                            key={keyword.id}
                                            className={cn(
                                                'rounded-full px-4 py-1 capitalize',
                                                (0 + 1) % 1 == 0 &&
                                                'bg-keyword-green/15 border-2 border-keyword-green',
                                                (1 + 1) % 2 == 0 &&
                                                'bg-keyword-purple/15 border-2 border-keyword-purple',
                                                (2 + 1) % 3 == 0 &&
                                                'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                                                (3 + 1) % 4 == 0 &&
                                                'bg-keyword-red/15 border-2 border-keyword-red'
                                            )}
                                        >
                                            {keyword.word}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="rounded-full border-2 mt-3 border-dashed border-black/40 dark:border-white/60 px-3 py-1">
                                <p className="text-sm text-black/40 dark:text-[#bfc0c3]">No Keywords</p>
                            </div>
                        )}
                    </Link>
                    <div className="flex flex-col justify-between">
                        <p className="capitalize text-sm font-light text-[#9B9CA0]">
                            {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
                            {automation.createdAt.getUTCDate() === 1
                                ? `${automation.createdAt.getUTCDate()}st`
                                : `${automation.createdAt.getUTCDate()}th`}{' '}
                            {automation.createdAt.getUTCFullYear()}
                        </p>
                        <DeleteAutomationButton id={automation.id} />

                        {automation.listener?.listener === 'INSTAAI' ? (
                            <GradientButton
                                type="BUTTON"
                            >
                                InstaAI AI
                            </GradientButton>
                        ) : (
                            <Button>
                                Free
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AutomationList