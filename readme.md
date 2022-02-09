**Live Example hosted on Vercel**: https://mude-blog.vercel.app/

1. Clone this repo `git clone https://github.com/ijjk/notion-blog.git`
1. Configure project with [`vc`](https://vercel.com/download)
2. Add your `NOTION_TOKEN` and `BLOG_INDEX_ID` as environment variables in [your project](https://vercel.com/docs/integrations?query=envir#project-level-apis/project-based-environment-variables). See [here](#getting-blog-index-and-token) for how to find these values
3. Do final deployment with `vc`

## Running Locally

To run the project locally you need to follow steps 1 and 2 of [deploying](#deploy-your-own) and then follow the below steps

1. Install dependencies `yarn`
2. Expose `NOTION_TOKEN` and `BLOG_INDEX_ID` in your environment `export NOTION_TOKEN='<your-token>'`and `export BLOG_INDEX_ID='<your-blog-index-id>'` or `set NOTION_TOKEN="<your-token>" && set BLOG_INDEX_ID="<your-blog-index-id>"` for Windows
3. Run next in development mode `yarn dev`
4. Build and run in production mode `yarn build && yarn start`

## Credits

- JJ Kasper [@ijjk](https://github.com/ijjk/notion-blog) for original code example

**Note**: This project uses the experimental SSG hooks only available in the Next.js canary branch! The APIs used within this example will change over time. Since it is using a private API and experimental features, use at your own risk as these things could change at any moment.
