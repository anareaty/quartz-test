
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import Flex from "./Flex"

const Profile: QuartzComponent = () => {
  return <div class='profile-card'> 
    <img src='static/avatar.jpg' class='avatar-image' alt='avatar-image'/>
    <div class="social-links">
      <a src="">github</a>
      <a src="">mastodon</a>
    </div>
    </div>
}
Profile.css = `
img.avatar-image {
  border-radius: 50%;
  margin: 0;
}
div.profile-card {
  width: 180px;
  margin: 0 auto;
}
div.social-links {
  display: flex;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
