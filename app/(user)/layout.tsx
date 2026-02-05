import NavBar from '@/components/blog/Navbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
     
      :root {
        --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --font-serif: Georgia, 'Times New Roman', Times, serif;
        --color-primary: #10b981;
        --color-primary-dark: #059669;
      }
      
      body {
        font-family: var(--font-sans);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
      }
      
      /* Selection color */
      ::selection {
        background-color: rgba(16, 185, 129, 0.2);
      }
      
      /* Focus ring for accessibility */
      *:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
      
      /* Smooth transitions */
      a, button {
        transition: all 0.2s ease;
      }
      
      /* Article typography */
      .prose {
        color: #292929;
      }
      
      .prose a {
        color: var(--color-primary);
      }
      
      .prose a:hover {
        color: var(--color-primary-dark);
      }
    `}</style>
      <div className=''>
        <NavBar />


        {children}
      </div>
    </div>
  )
}

export default layout