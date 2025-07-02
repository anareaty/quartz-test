
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Profile: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  return <img src="">
}

Profile.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
