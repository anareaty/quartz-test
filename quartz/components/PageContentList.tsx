import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"
import { SortFn, byDateAndAlphabetical, byDateAndAlphabeticalFolderFirst, Props } from "./PageList"
import { htmlToJsx } from "../util/jsx"




export const PageContentList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }
  

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []
        const tree = page.htmlAst
        const filePath = page.filePath
        const content = htmlToJsx(filePath!, tree) as ComponentChildren

        

        return (
          
          <li class="section-li">
            {/*
            <div class="section">
              <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
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
            */}

            
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
            <article class='popover-hint'>{content}</article>

            <p><a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                   "Оставить комментарий"
                  </a></p>

            <hr/>













          

    
      

      

      
        
    














            
            
          </li>
        )
      })}
    </ul>
  )
}

PageContentList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
