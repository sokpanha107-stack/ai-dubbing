"use client"

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background p-4">
      <header className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground">🛡️ Admin Dashboard</h1>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-destructive/15 px-3 py-1.5 text-xs font-semibold text-destructive"
        >
          ចាកចេញ (Logout)
        </button>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">ស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រង Admin ជាន់ខ្ពស់!</p>
        <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold text-foreground">ប្រព័ន្ធដំណើរការធម្មតា ១០០%</p>
          <p className="mt-1 text-xs text-muted-foreground">Master Key: @2000 ដំណើរការបានជោគជ័យ។</p>
        </div>
      </div>
    </div>
  )
}
