import { toPlainText } from '@portabletext/react'
import { ProjectPage } from 'components-website/pages/project/ProjectPage'
import ProjectPreview from 'components-website/pages/project/ProjectPreview'
import {
  getHomePageTitle,
  getProjectBySlug,
  getProjectsPaths,
} from 'lib-website/sanity.fetch'
import { projectBySlugQuery } from 'lib-website/sanity.queries'
import { defineMetadata } from 'lib-website/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params

  const [homePageTitle, project] = await Promise.all([
    getHomePageTitle(),
    getProjectBySlug(slug),
  ])

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: project?.overview ? toPlainText(project.overview) : '',
    image: project?.coverImage,
    title: project?.title,
  })
}

export async function generateStaticParams() {
  const slugs = await getProjectsPaths()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjectSlugRoute({ params }: Props) {
  const data = await getProjectBySlug(params.slug)

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={projectBySlugQuery}
      params={params}
      initialData={data}
      as={ProjectPreview}
    >
      <ProjectPage data={data} />
    </LiveQuery>
  )
}
