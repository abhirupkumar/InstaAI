"use client";

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CircleCheck, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner';

type Props = {
    label: string
    current: 'STANDARD' | 'PRO' | 'ULTIMATE' | 'FREE'
    price?: number
    planId?: string | null
    landing?: boolean
    subscriptionId: string | null | undefined
    key?: number
    features: string[]
    status: string | null | undefined
}

const PaymentCard = ({ current, label, landing, price, planId, subscriptionId, key, features, status }: Props) => {
    const [loading, setLoading] = useState("");

    const handleSubscription = async () => {
        setLoading(label);
        const apiUrl = '/api/create-subscription';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId,
                }),
            });

            const { subscriptionId, razorpayKey } = await response.json();

            if (!subscriptionId) {
                toast('Error', {
                    description: "Couldn't create your subscription. Please try again.",
                })
                setLoading("");
                return;
            }

            // Razorpay Checkout options
            const options = {
                key: razorpayKey,
                subscription_id: subscriptionId,
                name: 'Proxy',
                description: 'Thank you for subscribing!',
                handler: function (response: any) {
                    console.log('Subscription Details:', response);
                },
                theme: {
                    color: '#F37254',
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Subscription error:', error);
            toast('Error', {
                description: 'An error occurred. Please try again.',
            })
        } finally {
            setLoading("");
        }
    }

    return (
        <div
            key={key}
            className={cn(
                label !== current
                    ? 'bg-in-active'
                    : 'bg-custom-gradient',
                'p-[2px] rounded-xl overflow-hidden'
            )}
        >
            <div
                className={cn(
                    landing && 'radial--gradient--pink',
                    'flex flex-col rounded-xl pl-5 py-5 pr-10 bg-secondary h-full'
                )}
            >
                {landing ? (
                    <h2 className="text-2xl">
                        {label !== 'FREE' && 'Premium Plan'}
                        {label === 'FREE' && 'Standard'}
                    </h2>
                ) : (
                    <h2 className="text-2xl">
                        {label === current
                            ? 'Your Current Plan'
                            : current !== 'FREE'
                                ? 'Downgrade'
                                : 'Upgrade'}
                    </h2>
                )}
                <p className="text-text-secondary text-sm mb-2">
                    This is what your plan covers for automations and Ai features
                </p>
                {label !== 'FREE' ? (
                    <span className="bg-custom-gradient text-3xl font-bold bg-clip-text text-transparent">
                        {label}
                    </span>
                ) : (
                    <p className="font-bold mt-2 text-text-secondary">Free</p>
                )}
                {label !== 'FREE' ? (
                    <p className="mb-2">
                        <b className="text-xl">₹ {price}</b>/month
                    </p>
                ) : (
                    <p className="text-xl mb-2">₹ 0</p>
                )}

                {features.map((feature, index) => (
                    <p
                        key={index}
                        className="mt-2 text-muted-foreground flex gap-2 "
                    >
                        <CircleCheck className="text-indigo-500" />
                        {feature}
                    </p>
                ))}

                {landing ? (
                    <Button
                        className={cn(
                            'rounded-full mt-5',
                            label !== 'FREE'
                                ? 'bg-custom-gradient text-white'
                                : 'bg-background-80 text-white hover:text-background-80'
                        )}
                    >
                        {label === current
                            ? 'Get Started'
                            : current !== 'FREE'
                                ? 'Free'
                                : 'Get Started'}
                    </Button>
                ) : (
                    <Button
                        className="rounded-full mt-5"
                        disabled={label === current}
                        onClick={handleSubscription}
                    >
                        {label === current
                            ? status == 'expired' ? 'Expired' : 'Active'
                            : 'Upgrade'}
                        {loading == label && <Loader2 className='h-4 w-5 animate-spin' />}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PaymentCard