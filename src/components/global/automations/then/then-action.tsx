import { useListener } from '@/hooks/use-automations'
import React from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import { SubscriptionPlan } from '../../subscription-plan'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    id: string
}

const ThenAction = ({ id }: Props) => {
    const {
        onSetListener,
        listener: Listener,
        onFormSubmit,
        register,
        isPending,
    } = useListener(id)

    return (
        <TriggerButton label="Then">
            <div className="flex flex-col gap-y-2 ">
                {AUTOMATION_LISTENERS.map((listener) =>
                    listener.type === 'INSTAAI' ? (
                        <SubscriptionPlan
                            key={listener.type}
                            notType="FREE"
                        >
                            <div
                                onClick={() => onSetListener(listener.type)}
                                key={listener.id}
                                className={cn(
                                    Listener === listener.type
                                        ? 'bg-custom-gradient'
                                        : 'bg-secondary',
                                    'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                                )}
                            >
                                <div className="flex gap-x-2 items-center">
                                    {listener.icon}
                                    <p>{listener.label}</p>
                                </div>
                                <p>{listener.description}</p>
                            </div>
                        </SubscriptionPlan>
                    ) : (
                        <div
                            onClick={() => onSetListener(listener.type)}
                            key={listener.id}
                            className={cn(
                                Listener === listener.type
                                    ? 'bg-custom-gradient'
                                    : 'bg-secondary',
                                'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                            )}
                        >
                            <div className="flex gap-x-2 items-center">
                                {listener.icon}
                                <p>{listener.label}</p>
                            </div>
                            <p>{listener.description}</p>
                        </div>
                    )
                )}
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-y-2"
                >
                    {/* <Textarea
                        placeholder={
                            Listener === 'INSTAAI'
                                ? 'Add a prompt that your instaai ai can use...'
                                : 'Add a message you want send to your customers'
                        }
                        {...register('prompt')}
                        className="bg-secondary outline-none border-none ring-0 focus:ring-0"
                    /> */}
                    <Button className="bg-custom-gradient w-full font-medium text-white">
                        <Loader state={isPending}>Add listener</Loader>
                    </Button>
                </form>
            </div>
        </TriggerButton>
    )
}

export default ThenAction