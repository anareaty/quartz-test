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
  
  console.log(props.fileData.slug)

  let slug = props.fileData.slug!

  let num = Number(slug.split("/")[1])

  let startFile = (num - 1) * 10
  let endFile = num * 10 




  let feedFiles = props.allFiles.filter(file => file.frontmatter && file.frontmatter.feed)

  let paginatedFiles = feedFiles.slice(startFile, endFile)


  const listProps = {
      ...props,
      allFiles: paginatedFiles
      
    }
  return (<div class='page-listing'>
    <PageList {...listProps} />
    </div>)
}

Feed.css = concatenateResources(style, PageList.css)


export default (() => Feed) satisfies QuartzComponentConstructor
