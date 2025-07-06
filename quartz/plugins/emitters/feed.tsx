import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { ProcessedContent, QuartzPluginData, defaultProcessedContent } from "../vfile"
import { FullPageLayout } from "../../cfg"
import path from "path"
import {
  FullSlug,
  joinSegments,
  pathToRoot,
} from "../../util/path"
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { Feed } from "../../components"
import { write } from "./helpers"
interface FeedPageOptions extends FullPageLayout {
  sort?: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}





export const FeedPage: QuartzEmitterPlugin<Partial<FeedPageOptions>> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: Feed(),
    ...userOpts,
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "FeedPage",
    getQuartzComponents() {
      return [
        Head,
        Header,
        Body,
        ...header,
        ...beforeBody,
        pageBody,
        ...afterBody,
        ...left,
        ...right,
        Footer,
      ]
    },
    async *emit(ctx, content, resources) {

      
    const cfg = ctx.cfg.configuration
    const allFiles = content.map((c) => c[1].data)

    let feedFiles = allFiles.filter(file => file.frontmatter && file.frontmatter.feed)
    let pagesNum = Math.ceil(feedFiles.length / cfg.entriesOnFeedPage)






    for (let num = 1; num <= pagesNum; num++) {
      let slug = joinSegments("feed", num.toString(), "index") as FullSlug
      const externalResources = pageResources(pathToRoot(slug), resources)
  
      const [tree, file] = defaultProcessedContent({
        slug,
        frontmatter: { title: "Лента"},
      })
      

      const componentData: QuartzComponentProps = {
      ctx,
      fileData: file.data,
      externalResources,
      cfg,
      children: [],
      tree,
      allFiles,
    }


      const rendered = renderPage(cfg, slug, componentData, opts, externalResources)

      yield write({
      ctx,
      content: rendered,
      slug,
      ext: ".html",
    })
    }
    },
  }
}
