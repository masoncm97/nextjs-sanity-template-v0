import { sanityFetch } from 'lib-website/sanity.fetch'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { client } from './sanity.client'
import { createClient } from 'next-sanity'
import type { AuthorPayload, PostPayload, SettingsPayload } from 'types'

export function getSettings() {
  return sanityFetch<SettingsPayload>({
    query: settingsQuery,
    tags: ['settings', 'home', 'page', 'project'],
  })
}

export function getAllPosts() {
  return sanityFetch<PostPayload[]>({
    query: indexQuery,
    tags: ['posts'],
  })
}

export function getAllPostsSlugs() {
  return async function () {
    const slugs =
      (await sanityFetch<string[]>({
        query: postSlugsQuery,
        tags: ['posts'],
      })) || []
    return slugs.map((slug) => ({ slug }))
  }
}

export function getPostBySlug(slug: string) {
  return sanityFetch<PostPayload>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  })
}

// export function getPostAndMoreStories(slug: string, token?: string | null) {
//   return sanityFetch({
//     query: postAndMoreStoriesQuery,
//     params: { slug },
//     tags: [`post:${slug}`],
//   })
// }
