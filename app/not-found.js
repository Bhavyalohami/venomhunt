import { SiteFrame } from "../src/App";

export default function NotFound() {
  return (
    <SiteFrame isHomePage={false}>
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 pb-20 pt-36 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Page not found</h1>
        <p className="mt-4 max-w-xl text-white/70">
          The page you requested does not exist. Explore the latest Venom Hunt blog posts or return
          to the homepage.
        </p>
        <a
          href="/"
          className="interactive mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to home
        </a>
      </main>
    </SiteFrame>
  );
}
