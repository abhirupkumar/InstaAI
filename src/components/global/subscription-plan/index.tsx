import { useQueryUser } from '@/hooks/user-queries'

type Props = {
    type: 'STANDARD' | 'PRO' | 'BUSINESS' | 'ENTERPRISE' | 'FREE'
    children: React.ReactNode
}

export const SubscriptionPlan = ({ children, type }: Props) => {
    const { data } = useQueryUser()
    return data?.data?.subscription?.plan === type && children
}