// 构建期预渲染：将每个路由渲染为独立静态 HTML（解决 SPA 内页无实质内容的 SEO 问题）
// 输入：dist/index.html（vite build 产物）+ dist-ssr/entry-server.js（vite --ssr 产物）
// 输出：dist/<route>/index.html × N + dist/sitemap.xml
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const template = readFileSync(join(root, 'dist/index.html'), 'utf8')
const { render, seoRoutes, siteUrl } = await import(join(root, 'dist-ssr/entry-server.js'))

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const route of seoRoutes) {
  const html = render(route.path)

  let out = template
    // 注入渲染后的页面主体
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    // 替换每页标题与描述
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${esc(route.description)}" />`,
    )
    // 每页 canonical
    .replace('</head>', `  <link rel="canonical" href="${siteUrl}${route.path}" />\n  </head>`)

  const dir = route.path === '/' ? join(root, 'dist') : join(root, 'dist', route.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), out)
  console.log(`prerendered ${route.path}`)
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const urls = seoRoutes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/insights' ? 'daily' : 'weekly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path.split('/').length - 1 === 1 ? '0.8' : '0.6'}</priority>
  </url>`,
  )
  .join('\n')
writeFileSync(
  join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`sitemap.xml written (${seoRoutes.length} urls)`)
