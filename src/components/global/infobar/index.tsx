'use client'

import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
import { usePaths } from '@/hooks/user-nav'
import { Menu } from 'lucide-react'
import React from 'react'
import Sheet from '../sheet'
import Items from '../sidebar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import { SubscriptionPlan } from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import { LogoSmall } from '@/svgs/logo-small'
import CreateAutomation from '../create-automation'
import Search from './search'
import { Notifications } from './notifications'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'
import Image from 'next/image'
import { ModeToggle } from '../mode-toggle'
import { SheetTitle } from '@/components/ui/sheet'
import Link from 'next/link'

type Props = {
    slug: string,
    onlyMenu?: boolean
}

const InfoBar = ({ slug, onlyMenu = false }: Props) => {
    const { page } = usePaths()
    const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

    if (onlyMenu) {
        return (
            <MenuButton page={page} slug={slug} />
        )
    }

    return (
        currentPage && (
            <div className="flex flex-col">
                <div className="flex gap-x-3 lg:gap-x-5 justify-end items-center">
                    <span className="lg:hidden flex items-center flex-1 gap-x-2">
                        <MenuButton page={page} slug={slug} />
                    </span>
                    <Search />
                    <CreateAutomation />
                    <Notifications />
                    <ModeToggle />
                    <ClerkAuthState />
                </div>
                <MainBreadCrumb
                    page={page === slug ? 'Home' : page}
                    slug={slug}
                />
            </div>
        )
    )
}

const MenuButton = ({ page, slug }: { page: string, slug: string }) => {
    return (
        <span className="lg:hidden flex items-center gap-x-2">

            <Sheet
                trigger={<Menu />}
                className="lg:hidden"
                side="left"
            >
                <SheetTitle className="hidden">Menu
                </SheetTitle>
                <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-secondary
dark:bg-black bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
                    <Link href="/" className="flex gap-x-2 items-center p-5 justify-center">
                        <Image
                            src="/images/logo-white.png"
                            alt="InstaAI Logo"
                            height={100}
                            width={300}
                        />
                    </Link>
                    <div className="flex flex-col py-3">
                        <Items
                            page={page}
                            slug={slug}
                        />
                    </div>
                    <div className="px-16">
                        <Separator
                            orientation="horizontal"
                            className="bg-[#333336]"
                        />
                    </div>
                    <div className="px-3 flex flex-col gap-y-5">
                        <div className="flex gap-x-3">
                            <HelpDuoToneWhite />
                            <p className="text-[#9B9CA0]">Help</p>
                        </div>
                    </div>
                    <SubscriptionPlan type="FREE">
                        <div className="flex-1 flex flex-col justify-end">
                            <UpgradeCard slug={slug} />
                        </div>
                    </SubscriptionPlan>
                </div>
            </Sheet>

        </span>
    )
}

export default InfoBar