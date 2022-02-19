## About

**Live Example hosted on Vercel**: https://tutumenezes.com/

This is a personal website running on NextJS which pulls the majority of it's dynamic content from a NOTION Database.
Meanings it's whole backend is resumed to a NOTION page. I've been writing about the process [here](https://tutumenezes.notion.site/Journal-Log-b60a8497bde94cb4b933d64437228740).

You can check both the Backlog, Backend (databases) and Bookmarks for the project [here](https://www.notion.so/tutumenezes/tutumenezes-com-9c571887ad47453e82c8d98bcb8e50e6).

Many projects inspired this one, and I'm currently writing about it here.
But if you're looking for didatic code examples for NextJS + Notion, the projects below should do the job.

##Credits

- JJ Kasper [@ijjk](https://github.com/ijjk/notion-blog) (the basis from which this project has been forked)
- Samuel Kraft [@samuel-kraft](https://github.com/samuelkraft/notion-blog-nextjs)
- Travis Fischer [@transitive-bullshit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) (really good - and newer - Notion API Reference)

## Setup

1. Clone this repo `git clone https://github.com/tutumenezes/tutumenezes.com`
2. Configure project with [`vc`](https://vercel.com/download)
3. Add your `NOTION_TOKEN` and `BLOG_INDEX_ID` as environment variables in [your project](https://vercel.com/docs/integrations?query=envir#project-level-apis/project-based-environment-variables).(simply google how to get those values, its rlly easy)
4. Do final deployment with `vc`

## Running Locally

To run the project locally you need to follow steps 1 and 2 of [deploying](#deploy-your-own) and then follow the below steps

1. Install dependencies `yarn`
2. Expose `NOTION_TOKEN` and `BLOG_INDEX_ID` in your environment (.ENV) `export NOTION_TOKEN='<your-token>'`and `export BLOG_INDEX_ID='<your-blog-index-id>'` or `set NOTION_TOKEN="<your-token>" && set BLOG_INDEX_ID="<your-blog-index-id>"` for Windows
3. Run next in development mode `yarn dev`
4. Build and run in production mode `yarn build && yarn start`

## Note

**Keep in Mind**: This project uses the experimental SSG hooks only available in the Next.js canary branch! The APIs used within this example will change over time. Since it is using a private API and experimental features, use at your own risk as these things could change at any moment.
