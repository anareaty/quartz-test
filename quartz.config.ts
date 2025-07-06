import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */





const config: QuartzConfig = {
  configuration: {
    pageTitle: "Paperless forest",
    pageTitleSuffix: "Сайт про всякие штуки",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ru-RU",
    baseUrl: "anareaty.github.io/quartz-test",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    entriesOnFeedPage: 5,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Philosopher",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "hsl(34, 33%, 98%)",
          lightgray: "hsl(35, 36%, 95%)",
          fadedgray: "hsl(35, 35%, 90%)",
          gray: "hsl(34, 37%, 70%)",
          darkgray: "hsl(31, 35%, 40%)",
          dark: "hsl(31, 45%, 20%)",
          secondary: "hsl(9, 60%, 60%)",
          tertiary: "hsl(9, 60%, 75%)",
          highlight: "hsl(9, 60%, 95%)",
          textHighlight: "rgba(207, 134, 74, 0.2)",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          fadedgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.FeedPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
