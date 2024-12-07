import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {
    const { onSubscribe, isProcessing } = useSubscription()
    return (
        <Button
            disabled={isProcessing}
            onClick={onSubscribe}
            className="bg-gradient-to-br
     text-white 
     rounded-full 
    from-red-500 
    via-purple-500
    to-orange-500 
    font-bold"
        >
            {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
            Upgrade
        </Button>
    )
}

export default PaymentButton