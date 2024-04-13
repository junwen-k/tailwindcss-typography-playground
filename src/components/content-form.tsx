import { zodResolver } from "@hookform/resolvers/zod"
import debounce from "just-debounce-it"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { schema } from "@/app/preview/schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export const ContentForm = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: schema.parse(Object.fromEntries(searchParams)),
  })

  useEffect(() => {
    const debouncedFormWatch = debounce<Parameters<typeof form.watch>[0]>(
      (values, { name }) => {
        // We only debounce text fields.
        if (name && !["content"].includes(name)) {
          return
        }

        replace(
          `${pathname}?${new URLSearchParams({
            ...Object.fromEntries(searchParams),
            content: values?.content ?? "",
          })}`
        )
      },
      500
    )

    const debouncedSubscription = form.watch(debouncedFormWatch)

    return () => {
      debouncedFormWatch.cancel()
      debouncedSubscription.unsubscribe()
    }
  }, [form, pathname, replace, searchParams])

  return (
    <Form {...form}>
      <form className="grid w-full items-start gap-6">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[50vh]"
                    placeholder="Markdown / HTML"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
