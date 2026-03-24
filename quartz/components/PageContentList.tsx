import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"
import { SortFn, byDateAndAlphabetical, byDateAndAlphabeticalFolderFirst } from "./PageList"
import { htmlToJsx } from "../util/jsx"
import { ComponentChildren } from "preact"



type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps



export const PageContentList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }
  

  return (
    <ul class="section-ul">
      {list.map((page: any) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []
        const tree = page.htmlAst
        const filePath = page.filePath
        const description = page.frontmatter?.description

        
          
        return (
          <li class="section-li feed-section">
           
            <div class='feed-page-header'>
              <div class='popover-hint'>

                <h2>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                   {title}
                  </a>
                </h2>

                <div>
                  {description}
                </div>

                <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>


                <ul class="tags">
                {tags.map((tag: any) => (
                  <li>
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
                
              
            </div>
            </div>
            <article class='popover-hint'>
              {contentBefore}
              {contentAfter ? <details class='more'>
                <summary class='internal'>Читать дальше...</summary>
                {contentAfter}
              </details> : null }
            </article>

            

            <hr/>
            
          </li>
        )
      })}
    </ul>
  )
}


