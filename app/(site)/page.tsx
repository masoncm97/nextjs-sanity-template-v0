// import PreviewSuspense from '@sanity/preview-kit'
import PreviewSuspense from 'next-sanity/preview'
import IndexPage from 'components/IndexPage'
import { getAllPosts, getSettings } from 'lib/sanity.routes'
import type { AuthorPayload, PostPayload, SettingsPayload } from 'types'
import { lazy } from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { defineMetadata } from 'lib-website/utils.metadata'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

interface PageData {
  posts: PostPayload[]
  settings: Settings
  preview: boolean
  token: string | null
}

export const generateMetadata = async (ctx): Promise<PageData> => {
  const { preview = false, previewData = {} } = ctx
  const [settings, posts = []] = await Promise.all([
    getSettings(),
    getAllPosts(),
  ])
  console.log('shit')
  console.log('posts', posts)

  // return defineMetadata({
  //   posts,
  //   settings,
  //   preview,
  //   token: previewData.token ?? null,
  // })
}

export default async function Page() {
  const [settings, posts = []] = await Promise.all([
    getSettings(),
    getAllPosts(),
  ])

  if (!posts && !draftMode().isEnabled) {
    notFound()
  }

  return <IndexPage posts={posts} settings={settings} />
}
