import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehyperSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

import { schema } from "./schema"

export default function Preview({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { content } = schema.parse(searchParams)

  // TODO: configurable preview. e.g, paper size, font-family etc.

  return (
    <div className="py-8 print:p-0">
      <div className="mx-auto min-h-[296mm] w-[210mm] bg-white p-[10mm] shadow-xl shadow-slate-700/10 print:shadow-none">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehyperSanitize]}
          className="prose prose-sm max-w-none"
        >
          {content}
        </Markdown>
      </div>
    </div>
  )
}
