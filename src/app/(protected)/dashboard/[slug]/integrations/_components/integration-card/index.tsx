'use client'
import { onOAuthInstagram } from '@/actions/integrations'
import { onUserInfo } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {
    title: string
    description: string
    icon: React.ReactNode
    strategy: 'INSTAGRAM' | 'CRM'
}

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {

    const onInstaOAuth = () => onOAuthInstagram(strategy)

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: onUserInfo,
    })

    const integrated = data?.data?.integrations.find(
        (integration) => integration.name === strategy
    )

    return (
        <div className="bg-gradient-to-br from-red-500 via-purple-500 to-orange-500 rounded-2xl p-1">
            <div className="bg-secondary rounded-2xl gap-x-5 p-4 flex items-center justify-between">
                {icon}
                <div className="flex flex-col flex-1">
                    <h3 className="text-xl"> {title}</h3>
                    <p className="text-[#9D9D9D] text-base ">{description}</p>
                </div>
                <Button
                    onClick={onInstaOAuth}
                    disabled={integrated?.name === strategy}
                    className="bg-gradient-to-br text-white rounded-full text-lg from-blue-500 font-medium to-violet-500 hover:opacity-70 transition duration-100"
                >
                    {integrated ? 'Connected' : 'Connect'}
                </Button>
            </div>
        </div>
    )
}

export default IntegrationCard