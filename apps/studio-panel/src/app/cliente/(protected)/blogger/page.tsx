import Link from 'next/link'

import { requireClientAccess } from '@/lib/auth'

const BLOGGER_SITE_EMAIL = 'sportmassagefuengirola@gmail.com'
const BLOGGER_URL = 'https://sportmassagefuengirola.com/admin/blogger/'

export const dynamic = 'force-dynamic'

export default async function ClientBloggerPage() {
  const identity = await requireClientAccess()
  const isSportMassage = identity.email.trim().toLowerCase() === BLOGGER_SITE_EMAIL

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Content tool</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-foreground">Blogger</h1>
        <p className="mt-2 text-slate-500">Create and update the posts that appear on your public website.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {isSportMassage ? (
          <>
            <h2 className="text-lg font-bold text-foreground">Sport Massage Fuengirola</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use the button below to open the Blogger editor for your website. Your public site and your content tool remain separate, so changes are only published when you choose to publish them.</p>
            <a href={BLOGGER_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Open Blogger editor <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <p className="mt-3 text-xs text-slate-400">Direct editor link: {BLOGGER_URL}</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-foreground">Blogger is not activated</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">This content tool has not been activated for the email address on this account yet.</p>
          </>
        )}
      </section>

      <Link href="/cliente/dashboard" className="mt-6 inline-flex text-sm font-semibold text-brand hover:underline">← Back to dashboard</Link>
    </div>
  )
}
