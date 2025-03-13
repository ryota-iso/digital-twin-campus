export const config = {
  siteMeta: {
    title: 'SFC デジタルツインキャンパス',
    description: '', // TODO: Add default description
    ogImageUrl: 'ogp.png', // TODO: Add default ogImage,
  },
  siteRoot: import.meta.env.MODE === 'production' ? 'http://localhost:3000' : 'http://localhost:3000', // TODO: Change to your site URL
}
