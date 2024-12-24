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
            'Automate comment replies to enhance audience interaction',
            'Turn followers into customers with targeted messaging',
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
            '10000 chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: 'plan_PZX6I65iuz8fnA',
        cta: 'Upgrade Now',
    },
    {
        name: 'PRO',
        description: 'Advanced features for pro users',
        price: 6999,
        features: [
            'All features from Free Plan',
            '50000 chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: 'plan_PZX6izDdD7rJOF',
        cta: 'Upgrade Now',
    },
    {
        name: 'ULTIMATE',
        description: 'Ultimate features for power users',
        price: 14499,
        features: [
            'All features from Free Plan',
            'Unlimited chats per month',
            'AI-powered response generation',
            'Advanced analytics and insights',
        ],
        planId: 'plan_PZX736UKg4oApf',
        cta: 'Upgrade Now',
    },
]