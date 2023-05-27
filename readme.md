## About

**Live Example hosted on Vercel**: https://tutumenezes.com/

This is a personal website running on NextJS which pulls the majority of it's dynamic content from a NOTION Database. Meanings it's whole backend is resumed to a NOTION database.

You can check both the Backlog, Backend (databases) and Bookmarks for the project [here](https://www.notion.so/tutumenezes/tutumenezes-com-9c571887ad47453e82c8d98bcb8e50e6).

Many projects inspired this one, and I'm currently writing about it here.
But if you're looking for didatic code examples for NextJS + Notion, the projects below should do the job.

##Credits

- Harrisson Mendonça [@euharrisson](https://github.com/euharrison) (super render engine abstraction)
- JJ Kasper [@ijjk](https://github.com/ijjk/notion-blog) (reference)
- Samuel Kraft [@samuel-kraft](https://github.com/samuelkraft/notion-blog-nextjs) (reference)
- Travis Fischer [@transitive-bullshit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) (really good - and newer - Notion API Reference)

\*edit: updated to the oficial [Notion API](https://developers.notion.com/) launched recently.

## Deploy Setup

1. Clone this repo `git clone https://github.com/tutumenezes/tutumenezes.com`
2. Configure project with [`vc`](https://vercel.com/download)
3. [ DEPRECATED ]Add your `NOTION_TOKEN` and `BLOG_INDEX_ID` as environment variables in [your project](https://vercel.com/docs/integrations?query=envir#project-level-apis/project-based-environment-variables), simply google how to get those values, its rlly easy.
4. Add your `NOTION_API_KEY` and `NOTION_DATABASE_ID` as environment variables in [your project](https://vercel.com/docs/integrations?query=envir#project-level-
5. Update PREVIEW_TOKEN and REVALIDATE_TOKEN with randomly generated secrets
6. [ OPTIONAL ] configure your NEXT_PUBLIC_GA_MEASUREMENT_ID and NEXT_PUBLIC_GTM_DOMAIN for analytics
7. Do final deployment with `vc`

## Running Locally

To run the project locally you need to follow steps 1 and 2 of [setup](#deploy-setup) and then follow the below steps

1. Install dependencies `yarn`
2. Expose `NOTION_TOKEN` and `BLOG_INDEX_ID` in your environment (.ENV) `export NOTION_TOKEN='<your-token>'`and `export BLOG_INDEX_ID='<your-blog-index-id>'` or `set NOTION_TOKEN="<your-token>" && set BLOG_INDEX_ID="<your-blog-index-id>"` for Windows (LEGACY)
3. Expose `NOTION_API_KEY` and `NOTION_DATABASE_ID` in your environment (.ENV) `export NOTION_API_KEY='<your-token>'`and `export NOTION_DATABASE_ID='<your-blog-index-id>'` or `set NOTION_API_KEY="<your-token>" && set NOTION_DATABASE_ID="<your-blog-index-id>"` for Windows 
4. Run next in development mode `yarn dev`
5. Build and run in production mode `yarn build && yarn start`

## Notes

**Authorization**: follow the steps on the [Authorization Guide](https://developers.notion.com/docs/authorization) to configure a Notion application and grant access to your database.

**Deprecation Alert**: steps .2 of both [setup](#deploy-setup) and [running locally](#running-locally) will be soon deprecated and removed from environment variables. `NOTION_TOKEN` and `BLOG_INDEX_ID` will no longer be needed. They've been replaced by the new Oficial Notion SDK method for authentication. No more hacky Cookie scrapping needed. ;)

**Keep in Mind**: This project uses the experimental SSG hooks only available in the Next.js canary branch! The APIs used within this example will change over time. Since it is using a private API and experimental features, use at your own risk as these things could change at any moment.

[UPDATE] Now using Notion 12.1, so its a bit safer ;)
