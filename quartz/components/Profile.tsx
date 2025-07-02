
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import Flex from "./Flex"

const Profile: QuartzComponent = () => {
  return <div> 
    <img src='static/avatar.jpg' class='avatar-image' alt='avatar-image'/>
    {
      Flex({
  components: [
    {
      Component: <div>ggg</div>,
      grow: true, // Search will grow to fill available space
    },
    { Component: <div>ggg</div> }, // Darkmode keeps its natural size
  ],
  direction: "row",
})
    }
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
