import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { CreditCardIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
    slug: String;
}

const UpgradeCard = (props: Props) => {
    return (
        <div className="bg-background shadow-xl p-3 rounded-2xl flex flex-col gap-y-3">
            <span className="text-sm">
                Upgrade to {''}
                <span
                    className="bg-custom-gradient 
        font-bold 
        bg-clip-text 
        text-transparent"
                >
                    InstaAI AI
                </span>
            </span>
            <p className="text-[#9B9CA0] font-light text-sm">
                Unlock all features <br /> including AI and more
            </p>
            <Link
                href={process.env.NEXT_PUBLIC_HOST_URL! + '/dashboard/' + props.slug + "/settings"}
                className={cn(buttonVariants({
                    size: 'lg',
                }),
                    `bg-custom-gradient
     text-white 
     rounded-full 
    font-bold`)}
            >
                <CreditCardIcon />
                Upgrade
            </Link>
        </div>
    )
}

export default UpgradeCard