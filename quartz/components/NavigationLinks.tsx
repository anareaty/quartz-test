import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const NavigationLinks: QuartzComponent = () => {
  return (
    <li>
      <a href='/feed'>
        Лента
      </a>
    </li>
  )
}



export default (() => NavigationLinks) satisfies QuartzComponentConstructor
