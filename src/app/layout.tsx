import type { Metadata } from 'next'
import { Nova_Square } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'
import ReactQueryProvider from '@/providers/react-query-provider'
import ReduxProvider from '@/providers/redux-provider'
import CustomClerkProvider from '@/components/global/clerk'

const novaSquare = Nova_Square({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'InstaAI',
  description: 'InstaAI is an AI Social Media Engagement Automation Platform',
  icons: [
    {
      url: '/images/logo-white.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${novaSquare.className} max-w-[2500px]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ReduxProvider>
            <ReactQueryProvider>
              <CustomClerkProvider>
                {children}
              </CustomClerkProvider>
            </ReactQueryProvider>
          </ReduxProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}