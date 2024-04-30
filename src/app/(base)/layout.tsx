import Navbar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import React from 'react'

type Props = {
    children: React.ReactNode
}

async function layout({children}: Props) {
  
  return (
    <main className="fixed h-screen w-screen">
    <Navbar />
    <ResizablePanelGroup direction="horizontal">
   
        <SideBar />
      <ResizableHandle withHandle />
      <ResizablePanel
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 70px)" }}
        defaultSize={85}
        className="relative py-20"
      >
        <main className="container flex flex-col gap-8">
            {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  </main>
  )
}

export default layout