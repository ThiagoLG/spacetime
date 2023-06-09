import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data
  memories.forEach((memory) => {
    memory.coverUrl = memory.coverUrl.replace(
      /(([0-9]{1,3})\.){3}.([0-9]{1,3})/g,
      process.env.NEXT_PUBLIC_CURRENT_IP_ADDRESS as string,
    )
  })

  if (!memories.length) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('MMMM D, YYYY')}
          </time>
          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            href={`/memories/${memory.id}`}
            className="hover: flex items-center gap-2 text-sm text-gray-100 hover:text-gray-50"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
