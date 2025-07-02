
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Profile: QuartzComponent = () => {
  const title = "fff"
  return <h1>{title}</h1>
}
Profile.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
