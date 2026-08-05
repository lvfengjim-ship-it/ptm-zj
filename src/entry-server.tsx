import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

// SSR 入口：构建期将每个路由渲染为静态 HTML
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

// 供 prerender 脚本读取路由与 meta
export { seoRoutes, siteUrl } from './data/seo'
