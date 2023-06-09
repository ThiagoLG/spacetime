import { CalendarPlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import nlwSpacetimeLogoSvg from '../assets/nlw-spacetime-logo.svg'

export function Hero() {
  return (
    <div className="mt-8 w-full space-y-5 lg:mt-0">
      <Link href="/">
        <Image
          src={nlwSpacetimeLogoSvg}
          alt={'Application Logo'}
          className="hidden lg:block"
        />
      </Link>

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Your time capsule
        </h1>
        <p className="text-lg leading-relaxed">
          Collect memorable moments of your journey and share them with the
          world!
        </p>
      </div>
      <Link
        href="/memories/new"
        className="flex w-fit items-center justify-center gap-4 rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        <CalendarPlus size={20} /> REGISTER MOMORY
      </Link>
    </div>
  )
}
