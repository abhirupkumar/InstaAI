'use client'
import { useQueryAutomation } from '@/hooks/user-queries'
import React from 'react'
import ActiveTrigger from './active'
import { Separator } from '@/components/ui/separator'
import ThenAction from '../then/then-action'
import TriggerButton from '../trigger-button'
import { AUTOMATION_TRIGGERS } from '@/constants/automation'
import { useTriggers } from '@/hooks/use-automations'
import { cn } from '@/lib/utils'
import Keywords from './keywords'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    id: string
}

const Trigger = ({ id }: Props) => {
    const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
    const { data } = useQueryAutomation(id)

    if (data?.data && data?.data?.trigger.length > 0) {
        return (
            <div className="flex flex-col gap-y-6 items-center">
                <ActiveTrigger
                    id={data.data.trigger[0].id}
                    type={data.data.trigger[0].type}
                />

                {data?.data?.trigger.length > 1 && (
                    <>
                        <div className="relative w-6/12 my-4">
                            <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                                or
                            </p>
                            <Separator
                                orientation="horizontal"
                                className="border-muted border-[1px]"
                            />
                        </div>
                        <ActiveTrigger
                            id={data.data.trigger[1].id}
                            type={data.data.trigger[1].type}
                        />
                    </>
                )}

                <Keywords id={id} />
                {!data.data.listener && <div className='flex flex-col w-full'>
                    <ThenAction id={id} />
                </div>}
            </div>
        )
    }
    return (
        <TriggerButton label="Add Trigger">
            <div className="flex flex-col gap-y-2">
                {AUTOMATION_TRIGGERS.map((trigger) => (
                    <div
                        key={trigger.id}
                        onClick={() => onSetTrigger(trigger.type)}
                        className={cn(
                            'hover:opacity-80 rounded-xl flex cursor-pointer flex-col p-3 gap-y-2',
                            !types?.find((t) => t === trigger.type)
                                ? 'bg-secondary'
                                : 'bg-custom-gradient font-medium'
                        )}
                    >
                        <div className="flex gap-x-2 items-center">
                            {trigger.icon}
                            <p className="font-bold">{trigger.label}</p>
                        </div>
                        <p className="text-sm font-light">{trigger.description}</p>
                    </div>
                ))}
                <Keywords id={id} />
                <Button
                    onClick={onSaveTrigger}
                    disabled={types?.length === 0}
                    className="bg-custom-gradient font-medium text-white"
                >
                    <Loader state={isPending}>Create Trigger</Loader>
                </Button>
            </div>
        </TriggerButton>
    )
}

export default Trigger