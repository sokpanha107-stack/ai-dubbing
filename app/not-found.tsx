'client'

export default function NotFound() {
  return (
    <html>
      <body className="flex h-dvh flex-col items-center justify-center bg-[#0b0f1a] text-white">
        <div className="text-center space-y-3 p-6">
          <h2 className="text-3xl font-bold">404 — Page Not Found</h2>
          <p className="text-sm text-gray-400">Could not find the requested resource on SAVPD.io</p>
          <a
            href="/"
            className="inline-block mt-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Return Home
          </a>
        </div>
      </body>
    </html>
  );
}
