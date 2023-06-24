import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import nlwSpacetimeLogoSvg from '../assets/nlw-spacetime-logo.svg'
import { CalendarPlus } from 'lucide-react'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'Spacetime',
  description:
    'A time capsule, developed using React, Next.js, TailwindCSS e TypeScript ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token')
 
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover p-10 lg:px-28 lg:py-16">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute bottom-2 right-2 top-2 w-2 bg-stripes"></div>

            {/* SignIn */}
            <div className="fixed left-0 top-0 flex w-full flex-row items-center justify-between rounded-b-[35px] bg-black/80 px-4 py-5 lg:relative lg:mb-6 lg:bg-transparent lg:p-0">
              {isAuthenticated ? <Profile /> : <SignIn />}
              <Link href="/">
                <Image
                  src={nlwSpacetimeLogoSvg}
                  alt={'Application Logo'}
                  className={`scale-75 sm:scale-100 lg:hidden sm:block ${!isAuthenticated ? 'hidden' : ''}`}
                />
              </Link>
              <Link
                href="/memories/new"
                className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600 lg:hidden"
              >
                <CalendarPlus size={20} />
                <span className='hidden md:block'>REGISTER MOMORY</span>
              </Link>
            </div>
            <div className="h-5 lg:hidden"></div>

            {/* Hero */}
            <Hero />

            {/* Copyright */}
            <Copyright />
          </div>

          {/* Right */}
          <div className="flex max-h-screen flex-col bg-[url(../assets/bg-stars.svg)] bg-cover lg:overflow-y-scroll">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
