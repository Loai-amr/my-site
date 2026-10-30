import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

// Server-rendered markdown for blog posts: GFM (tables, task lists), heading ids, and highlight.js
// classes on fenced code blocks (colours in globals.css). Raw HTML in the markdown is not rendered,
// and unsafe URLs are stripped.
/** react-markdown passes the hast `node` to custom components; it must not reach the DOM. */
function dom<T extends { node?: unknown }>({ node, ...rest }: T) {
  void node;
  return rest;
}

export default function MarkdownContent({ source }: { source: string }) {
  return (
    <div className="blog-prose">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          // The page title is the only h1.
          h1: (props) => <h2 {...dom(props)} />,
          a: (props) =>
            props.href?.startsWith("http") ? <a {...dom(props)} target="_blank" rel="noopener noreferrer" /> : <a {...dom(props)} />,
          // eslint-disable-next-line @next/next/no-img-element -- images can come from any host
          img: (props) => <img {...dom(props)} alt={props.alt ?? ""} loading="lazy" decoding="async" />,
        }}
      >
        {source}
      </Markdown>
    </div>
  );
}
