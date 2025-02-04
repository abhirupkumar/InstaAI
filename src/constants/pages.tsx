import {
    AutomationDuoToneBlue,
    ContactsDuoToneBlue,
    HomeDuoToneBlue,
    RocketDuoToneBlue,
    SettingsDuoToneWhite,
} from '@/icons'

export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings',
]

type Props = {
    [page in string]: React.ReactNode
}

export const PAGE_ICON: Props = {
    AUTOMATIONS: <AutomationDuoToneBlue />,
    CONTACTS: <ContactsDuoToneBlue />,
    INTEGRATIONS: <RocketDuoToneBlue />,
    SETTINGS: <SettingsDuoToneWhite />,
    HOME: <HomeDuoToneBlue />,
}

export const PLANS = [
    {
        name: 'FREE',
        description: 'Perfect for getting started',
        price: 0,
        features: [
            'Boost engagement with target responses',
            'No comment automation',
            'Turn followers into customers with targeted messaging',
            'Advanced analytics and insights',
        ],
        planId: null,
        cta: 'Get Started',
    },
    {
        name: 'STANDARD',
        description: 'Standard features for users',
        price: 2999,
        features: [
            'All features from Free Plan',
            '4500 chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: 'plan_PZX6I65iuz8fnA',
        limit: 4500,
        cta: 'Upgrade Now',
    },
    {
        name: 'PRO',
        description: 'Advanced features for pro users',
        price: 6999,
        features: [
            'All features from Free Plan',
            '15000 chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: 'plan_PZX6izDdD7rJOF',
        limit: 15000,
        cta: 'Upgrade Now',
    },
    {
        name: 'BUSINESS',
        description: 'Ultimate features for power users',
        price: 14499,
        features: [
            'All features from Free Plan',
            '50000 chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: 'plan_PZX736UKg4oApf',
        limit: 50000,
        cta: 'Upgrade Now',
    },
    {
        name: 'ENTERPRISE',
        description: 'Unlimited features for power users',
        price: 999999999999999,
        features: [
            'All features from Business Plan',
            'Unlimited chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: null,
        limit: 999999999999999,
        cta: 'Upgrade Now',
    },
]