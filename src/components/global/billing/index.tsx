'use client'
import React from 'react'
import PaymentCard from './payment-card'
import { useQueryUser } from '@/hooks/user-queries'
import Script from 'next/script'

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
                <PaymentCard
                    current={data?.data?.subscription?.plan!}
                    label="FREE"
                    customerId={data?.data?.subscription?.customerId}
                />
                <PaymentCard
                    current={data?.data?.subscription?.plan!}
                    label="STANDARD"
                    price={2999}
                    planId={'plan_PZX6I65iuz8fnA'}
                    customerId={data?.data?.subscription?.customerId}
                />
                <PaymentCard
                    current={data?.data?.subscription?.plan!}
                    label="PRO"
                    price={6999}
                    planId={'plan_PZX6izDdD7rJOF'}
                    customerId={data?.data?.subscription?.customerId}
                />
                <PaymentCard
                    current={data?.data?.subscription?.plan!}
                    label="ULTIMATE"
                    price={14499}
                    planId={'plan_PZX736UKg4oApf'}
                    customerId={data?.data?.subscription?.customerId}
                />
            </div>
        </>
    )
}

export default Billing