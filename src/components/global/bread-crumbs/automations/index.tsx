'use client'
import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/user-queries'
import { useEditAutomation } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '../../mode-toggle'
import InfoBar from '../../infobar'

type Props = {
    id: string,
    slug: string,
}

const AutomationsBreadCrumb = ({ id, slug }: Props) => {
    const { data } = useQueryAutomation(id)
    const { edit, enableEdit, inputRef, isPending } = useEditAutomation(id)

    const { latestVariable } = useMutationDataState(['update-automation'])

    return (
        <div className="rounded-full w-full p-5 bg-[#5f5f631a] flex items-center">
            <InfoBar slug={id} onlyMenu={true} />
            <div className="flex items-center gap-x-3 min-w-0 ml-4">
                <p className="text-[#9B9CA0] truncate">Automations</p>
                <ChevronRight
                    className="flex-shrink-0"
                    color="#9B9CA0"
                />
                <span className="flex gap-x-3 items-center min-w-0">
                    {edit ? (
                        <Input
                            ref={inputRef}
                            placeholder={
                                isPending ? latestVariable.variables : 'Add a new name'
                            }
                            className="bg-transparent h-auto outline-none text-base border-none p-0"
                        />
                    ) : (
                        <p className="text-[#9B9CA0] truncate">
                            {latestVariable?.variables
                                ? latestVariable?.variables.name
                                : data?.data?.name}
                        </p>
                    )}
                    {edit ? (
                        <></>
                    ) : (
                        <span
                            className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4"
                            onClick={enableEdit}
                        >
                            <PencilIcon size={14} />
                        </span>
                    )}
                </span>
            </div>

            <div className="flex items-center gap-x-5 ml-auto">
                <p className="hidden md:block text-text-secondary/80 text-sm truncate min-w-0">
                    All states are automatically saved
                </p>
                <div className="flex gap-x-5 flex-shrink-0">
                    <p className="text-text-secondary text-sm truncate min-w-0">
                        Changes Saved
                    </p>
                </div>
            </div>
            <ActivateAutomationButton id={id} />
            <div className='mx-3'>
                <ModeToggle />
            </div>
        </div>
    )
}

export default AutomationsBreadCrumb