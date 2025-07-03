import React from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-dark">
    <Header />
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">{children}</div>
    </main>
    <Footer />
  </div>
)

export default Layout 