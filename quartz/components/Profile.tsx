
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Profile: QuartzComponent = () => {
  return <div> 
    <img src='static/avatar.jpg' class='avatar-image' alt='avatar-image'/>
    {Component.Flex(
     <div>
       <div>ff</div>
       <div>hh</div>
     </div>
     
    )}
    </div>
}
Profile.css = `
img.avatar-image {
  border-radius: 50%;
  width: 180px;
  margin: 0 auto;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
