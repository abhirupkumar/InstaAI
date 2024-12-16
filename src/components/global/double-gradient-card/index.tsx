import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    label: string
    subLabel: string
    description: string
    slug: string
}

const DoubleGradientCard = ({ description, label, subLabel, slug }: Props) => {
    return (
        <div className='p-1 bg-custom-gradient rounded-xl'>
            <div className="relative p-5 rounded-xl bg-card flex flex-col gap-y-20 overflow-hidden">
                <div className="flex flex-col z-40">
                    <h2 className="text-2xl font-medium">{label}</h2>
                    <p className="text-text-secondary text-sm">{subLabel}</p>
                </div>
                <div className="flex justify-between items-center z-40 gap-x-10">
                    <p className="text-text-secondary text-sm">{description}</p>
                    <Link href={process.env.NEXT_PUBLIC_HOST_URL! + '/dashboard/' + slug!.replace('%20', " ") + "/automations"} className="rounded-full bg-light-blue flex hover:bg-blue-600 items-center justify-center w-10 h-10">
                        <ArrowRight color="white" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DoubleGradientCard