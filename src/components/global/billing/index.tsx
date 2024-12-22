'use client'
import React from 'react'
import PaymentCard from './payment-card'
import { useQueryUser } from '@/hooks/user-queries'
import Script from 'next/script'
import { PLANS } from '@/constants/pages'

type Props = {}

const Billing = (props: Props) => {
    const { data } = useQueryUser()
    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
                {PLANS.map((plan, index) => <PaymentCard
                    key={index}
                    current={data?.data?.subscription?.plan!}
                    label={plan.name}
                    price={plan.price}
                    planId={plan.planId}
                    customerId={data?.data?.subscription?.customerId}
                    features={plan.features}
                />)}
            </div>
        </>
    )
}

export default Billing