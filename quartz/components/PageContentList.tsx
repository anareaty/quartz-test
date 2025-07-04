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


        console.log(tree)


        let childrenBefore = []
        let childrenAfter = []

        let breakNum = 0

        let lastEndLine = 0

        let children = tree.children 
        for (let i = 0; i < children.length; i++) {
          let item = children[i]
          if (i == 0 || !item.position || item.position.end.line < 30) {
            childrenBefore.push(item)
          

          } else {
            breakNum = i
            break
          }
        }

        for (let i = breakNum; i < children.length; i++) {
          let item = children[i]
          childrenAfter.push(item)
          if (item.position) {
            lastEndLine = item.position.end.line
          }
          
        }

        let treeBefore = {
            type: tree.type,
            children: childrenBefore
          }
        treeBefore.children = childrenBefore
        let jsxBefore = htmlToJsx(filePath!, treeBefore) as ComponentChildren

        let jsxAfter: ComponentChildren = null

        if (childrenAfter.length > 0) {
          let treeAfter = {
            type: tree.type,
            children: childrenAfter
          }
          treeAfter.children = childrenAfter
          jsxAfter = htmlToJsx(filePath!, treeAfter) as ComponentChildren
        }


        



        //const content = htmlToJsx(filePath!, tree) as ComponentChildren

        

        return (
          
          <li class="section-li feed-section">
           
            <div class='page-header'>
              <div class='popover-hint'>

                <h2>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h2>

                <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>


                <ul class="tags">
                {tags.map((tag) => (
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
              {jsxBefore}
              {(childrenAfter.length > 0 && lastEndLine > 60) ? <details class='more'>
                <summary class='internal'>Читать дальше...</summary>
                {jsxAfter}
              </details> : jsxAfter }
            </article>

            <p><a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                   Оставить комментарий
                  </a></p>

            <hr/>
            
          </li>
        )
      })}
    </ul>
  )
}


