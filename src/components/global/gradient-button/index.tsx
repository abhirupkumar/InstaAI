import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
    type: 'BUTTON' | 'LINK'
    href?: string
    className?: string
}

const GradientButton = ({ children, type, className, href }: Props) => {
    const gradients =
        'rounded-xl p-[2px]'

    switch (type) {
        case 'BUTTON':
            return (
                <div className={gradients}>
                    <Button className={cn(className, 'rounded-xl bg-custom-gradient bg-clip-text text-transparent')}>{children}</Button>
                </div>
            )

        case 'LINK':
            return (
                <div className={gradients}>
                    <Link
                        href={href!}
                        className={cn(className, 'rounded-xl bg-custom-gradient bg-clip-text text-transparent')}
                    >
                        {children}
                    </Link>
                </div>
            )

        default:
            return null
    }
}

export default GradientButton