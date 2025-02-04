import { useQueryUser } from '@/hooks/user-queries'

type Props = {
    type?: 'STANDARD' | 'PRO' | 'BUSINESS' | 'ENTERPRISE' | 'FREE'
    notType?: 'STANDARD' | 'PRO' | 'BUSINESS' | 'ENTERPRISE' | 'FREE'
    children: React.ReactNode
}

export const SubscriptionPlan = ({ children, type, notType }: Props) => {
    const { data } = useQueryUser()
    if (type) return data?.data?.subscription?.plan === type && children
    else return data?.data?.subscription?.plan !== notType && children
}