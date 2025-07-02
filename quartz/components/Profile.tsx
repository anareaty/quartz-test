
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Profile: QuartzComponent = () => {
  return <img src='static/avatar.jpg' class='avatar-image' alt='avatar-image'/>
}
Profile.css = `
img.avatar-image {
  border-radius: 50%;
  width: 200px;
  margin: 0 auto;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
