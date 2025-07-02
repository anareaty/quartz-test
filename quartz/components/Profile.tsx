
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Profile: QuartzComponent = () => {
  const title = "fff"
  if (title) {
    return <h1>{title}</h1>
  } else {
    return null
  }
}
Profile.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
