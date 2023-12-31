import 'styles/index.css'

import { Footer } from 'components-website/global/Footer'
import { Navbar } from 'components-website/global/Navbar'
import { PreviewBanner } from 'components-website/preview/PreviewBanner'
import { token } from 'lib-website/sanity.fetch'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const PreviewProvider = dynamic(
  () => import('components-website/preview/PreviewProvider'),
)

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled

  const layout = (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {isDraftMode && <PreviewBanner />}
      <Suspense>
        <Navbar />
      </Suspense>
      <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
        <Suspense>{children}</Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  )

  if (isDraftMode) {
    return <PreviewProvider token={token!}>{layout}</PreviewProvider>
  }

  return layout
}
