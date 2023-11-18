'use client'

import { NextStudio } from 'next-sanity/studio'
import config from 'sanity.config'
import Head from 'next/head'
import { metadata } from 'next-sanity/studio/metadata'

export default function Studio() {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head>
      <NextStudio config={config} />
    </>
  )
}
