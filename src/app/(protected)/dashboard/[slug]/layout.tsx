import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import React from 'react'
import {
    PrefetchUserAutnomations,
    PrefetchUserProfile,
} from '@/react-query/prefetch'

type Props = {
    children: React.ReactNode
    params: Promise<{ slug: string }>
}

const Layout = async (props: Props) => {
    const params = await props.params;

    const {
        children
    } = props;


    const query = new QueryClient()

    await PrefetchUserProfile(query)

    await PrefetchUserAutnomations(query)

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="p-3">
                <Sidebar slug={params.slug} />
                <div
                    className="
        lg:ml-[250px] 
        lg:pl-10 
        lg:py-5 
        flex 
        flex-col 
        overflow-auto
        "
                >
                    <InfoBar slug={params.slug} />
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout