"use client"

import { Printer, Settings } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRef } from "react"

import { ContentForm } from "@/components/content-form"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function Home() {
  const searchParams = useSearchParams()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            Tailwind Typography Playground
          </h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the content.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <ContentForm />
              </div>
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            onClick={iframeRef?.current?.contentWindow?.print}
          >
            <Printer className="size-3.5" />
            Print
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 lg:grid-cols-3">
          <div className="hidden flex-col items-start gap-8 lg:flex">
            <ContentForm />
          </div>
          <div className="flex flex-col p-4 lg:col-span-2">
            <iframe
              ref={iframeRef}
              src={`/preview?${searchParams}`}
              className="size-full"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
