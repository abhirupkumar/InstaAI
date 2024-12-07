'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { AutomationDuoToneWhite } from '@/icons'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'

type Props = {}

const CreateAutomation = (props: Props) => {
    const mutationId = useMemo(() => v4(), [])

    console.log(mutationId)
    const { isPending, mutate } = useCreateAutomation(mutationId)

    return (
        <Button
            className="lg:px-10 py-6 hover:opacity-80 text-white rounded-full bg-gradient-to-br from-red-500 via-purple-500 to-orange-500  font-medium"
            onClick={() =>
                mutate({
                    name: 'Untitled',
                    id: mutationId,
                    createdAt: new Date(),
                    keywords: [],
                })
            }
        >
            <Loader state={isPending}>
                <AutomationDuoToneWhite />
                <p className="md:inline hidden">Create an Automation</p>
            </Loader>
        </Button>
    )
}

export default CreateAutomation