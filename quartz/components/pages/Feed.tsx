import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import style from "../styles/listPage.scss"
import { PageContentList } from "../PageContentList"
import { SortFn } from "../PageList"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
import { trieFromAllFiles } from "../../util/ctx"





const Feed: QuartzComponent = (props: QuartzComponentProps) => {
  
  let entriesOnPage = 10

  
  let slug = props.fileData.slug!

  let num = Number(slug.split("/")[1])

  let startFile = (num - 1) * entriesOnPage
  let endFile = num * entriesOnPage




  let feedFiles = props.allFiles.filter(file => file.frontmatter && file.frontmatter.feed)

  let paginatedFiles = feedFiles.slice(startFile, endFile)

  let pagesNum = Math.ceil(feedFiles.length / entriesOnPage)
  let pages = []
  for (let p = 1; p <= pagesNum; p++) {
    pages.push(p)
  }


  const listProps = {
      ...props,
      allFiles: paginatedFiles
      
    }
  return (<div class='page-listing'>
    <PageContentList {...listProps} />

    <ul class='pagination-block'>
      {pages.map((p) => {(
        <li>{p}</li>
      ))}



      


      
    </ul>
    </div>)
}

Feed.css = concatenateResources(style, PageContentList.css)


export default (() => Feed) satisfies QuartzComponentConstructor
