import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { seoRoutes, siteUrl } from '@/data/seo'

// 客户端路由切换时同步 title / description / canonical（预渲染静态 meta 由构建期注入）
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const r = seoRoutes.find((x) => x.path === pathname) ?? seoRoutes[0]
    document.title = r.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', r.description)
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = siteUrl + r.path
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
