import { ModeToggle } from '@/components/global/mode-toggle';
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { currentUser } from '@clerk/nextjs/server';
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
]

export async function Navbar() {

    const user = await currentUser();

    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image src="/images/logo-white.svg" alt="InstaAI Logo" width={100} height={50} className="block dark:hidden" />
                            <Image src="/images/logo-dark.svg" alt="InstaAI Logo" width={100} height={50} className="hidden dark:block" />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-primary hover:text-primary/90 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='gap-x-4 hidden md:flex'>
                        <ModeToggle />
                        <Link className={buttonVariants({
                            size: 'lg',
                        })} href="/dashboard">
                            {user ? "Dashboard" : "Get Started"}
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {navItems.map((item) => (
                                    <DropdownMenuItem key={item.name} asChild>
                                        <Link href={item.href}>{item.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem>
                                    <Link href="/dashboard" className="w-full">{user ? "Dashboard" : "Get Started"}</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}
