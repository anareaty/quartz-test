import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const NavigationLinks: QuartzComponent = ({fileData} : QuartzComponentProps) => {
  const linkDest = resolveRelative(fileData.slug!, `feed/1` as FullSlug)
  return (
    <li class='nav-link'>
      <a href={linkDest}>
        Лента
      </a>
    </li>
  )
}

NavigationLinks.css = `
.nav-link {
list-style: none;
}
`



export default (() => NavigationLinks) satisfies QuartzComponentConstructor
