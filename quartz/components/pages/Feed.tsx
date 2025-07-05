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
import { FullSlug, isFolderPath, resolveRelative } from "../../util/path"





const Feed: QuartzComponent = (props: QuartzComponentProps) => {

  let entriesOnFeedPage = props.cfg.entriesOnFeedPage

  
  let slug = props.fileData.slug!

  let num = Number(slug.split("/")[1])


  if (num) {

  
  let startFile = (num - 1) * entriesOnFeedPage
  let endFile = num * entriesOnFeedPage




  let feedFiles = props.allFiles.filter(file => file.frontmatter && file.frontmatter.feed)

  let paginatedFiles = feedFiles.slice(startFile, endFile)

  let pagesNum = Math.ceil(feedFiles.length / entriesOnFeedPage)
  let pages = []
  for (let p = 1; p <= pagesNum; p++) {
    let pagePath = resolveRelative(slug, `feed/` + p + '/' as FullSlug)
    pages.push({pagePath, text: p})
  }



 
  
  let lastPage = pages.length
  let lastPageIndex = lastPage - 1


  let beforeStart = num - 3
  if (beforeStart < 0) beforeStart = 0

  let beforeEnd = num - 1
  if (beforeEnd < 0) beforeEnd = 0

  let shownPagesBefore = pages.slice(beforeStart, beforeEnd)

  if (num < 4) shownPagesBefore.shift()

  


  let afterStart = num 
  if (afterStart > lastPageIndex) afterStart = lastPageIndex

  
 

  let afterEnd = num + 2
  if (afterEnd > lastPageIndex - 1) afterEnd = lastPageIndex

  

 

  let shownPagesAfter = pages.slice(afterStart, afterEnd)



  if (num > lastPageIndex - 1) shownPagesAfter.pop()





  const listProps = {
      ...props,
      allFiles: paginatedFiles
      
    }
  return (<div class='page-listing'>
    <PageContentList {...listProps} />

    <ul class='pagination-block'>
      {num != 1 ? <li><a href={resolveRelative(slug, `feed/` + (num - 1) + '/' as FullSlug)}>Назад</a></li> : null}
      {num != 1 ? <li><a href={pages[0].pagePath}>1</a></li> : null}
      {num > 4 ? <li>...</li> : null}
      {shownPagesBefore.map((p) => (
        <li>
          <a href={p.pagePath}>{p.text}</a>        
        </li>
      ))}
      <li>{num}</li>
      {shownPagesAfter.map((p) => (
        <li>
          <a href={p.pagePath}>{p.text}</a>
        </li>
      ))}
      {lastPage && num < lastPage - 3 ? <li>...</li> : null}
      {lastPage && num != lastPage ? <li><a href={pages[lastPage - 1].pagePath}>{lastPage}</a></li> : null}
      {lastPage && num != lastPage ? <li><a href={resolveRelative(slug, `feed/` + (num + 1) + '/' as FullSlug)}>Вперёд</a></li> : null}



      


      
    </ul>
    </div>)

  
  } else return null
}

Feed.css = concatenateResources(style, PageContentList.css)


export default (() => Feed) satisfies QuartzComponentConstructor
