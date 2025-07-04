import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const NavigationLinks: QuartzComponent = ({fileData} : QuartzComponentProps) => {
  const linkDest = resolveRelative(fileData.slug!, `feed/1` as FullSlug)
  return (
    <li>
      <a href={linkDest}>
        Лента
      </a>
    </li>
  )
}



export default (() => NavigationLinks) satisfies QuartzComponentConstructor
