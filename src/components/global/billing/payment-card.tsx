"use client";

import { onCurrentUser } from '@/actions/user';
import { Button } from '@/components/ui/button'
import { PLANS } from '@/constants/pages';
import { cn } from '@/lib/utils'
import { CircleCheck, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner';

type Props = {
    label: string
    current: 'STANDARD' | 'PRO' | 'BUSINESS' | 'ENTERPRISE' | 'FREE'
    price?: number
    planId?: string | null
    landing?: boolean
    subscriptionId: string | null | undefined
    features: string[]
    status: boolean
    number: number
}

const PaymentCard = ({ current, label, landing, price, planId, subscriptionId, features, status, number }: Props) => {
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
                description: 'Use Proxy to automate your Instagram engagement',
                image: "/images/logo-white.png",
                handler: async function (response: any) {
                    try {
                        const res = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_subscription_id: response.razorpay_subscription_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const result = await res.json();

                        if (result.success) {
                            toast('Success', {
                                description: 'Payment Successful! It takes a few seconds to activate your subscription.',
                            });
                        } else {
                            toast('Error', {
                                description: 'Payment Failed! Please Try again.',
                            });
                        }
                    } catch (error) {
                        toast('Error', {
                            description: 'Payment Verfication Failed!',
                        });
                    }
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
                            ? (current !== 'FREE' && status == false) ? "Your Plan Expired" : 'Your Current Plan'
                            : number < PLANS.findIndex((p) => p.name === current)
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
                        disabled={(label === current && (current !== 'FREE' && status == true)) || label == 'FREE'}
                        onClick={handleSubscription}
                    >
                        {label === current
                            ? (current !== 'FREE' && status == false) ? 'Renew' : 'Active'
                            : 'Upgrade'}
                        {loading == label && <Loader2 className='h-4 w-5 animate-spin' />}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PaymentCard