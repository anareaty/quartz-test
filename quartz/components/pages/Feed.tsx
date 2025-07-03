import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import style from "../styles/listPage.scss"
import { PageList, SortFn } from "../PageList"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
import { trieFromAllFiles } from "../../util/ctx"





const Feed: QuartzComponent = (props: QuartzComponentProps) => {
  let feedFiles = props.allFiles.filter(file => file.frontmatter && file.frontmatter.feed)
  const listProps = {
      ...props,
      limit: 10,
      allFiles: feedFiles
      
    }
  return (<PageList {...listProps} />)
}

Feed.css = concatenateResources(style, PageList.css)


export default (() => Feed) satisfies QuartzComponentConstructor