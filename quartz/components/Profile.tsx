
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import Flex from "./Flex"
import { FullSlug, resolveRelative } from "../util/path"

const Profile: QuartzComponent = ({displayClass, fileData}) => {
  const imageLinkDest = resolveRelative(fileData.slug!, '/static/avatar.jpg' as FullSlug)
  return <div class={classNames(displayClass, "profile-card")}> 
    <img src={imageLinkDest} class='avatar-image' alt='avatar-image'/>
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
  width: 150px;
}
div.profile-card {
  text-align: center;
  margin-right: 2rem;
}
div.social-links {
  display: flex;
  justify-content: center;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor






  
  

  
  
