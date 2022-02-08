
export function Link(props: { children: any, href: string }) {
  const { href, children } = props

  return <a href={href}>{children}</a>
}