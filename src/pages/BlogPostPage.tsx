import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { PageLayout, PageHero, BrandJsonLd } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BLOG_POSTS, getPostBySlug, BlogPost } from '../data/blogPosts'
import { BRAND } from '../lib/brand'
import layout from '../components/PageLayout/PageLayout.module.css'
import styles from './BlogPostPage.module.css'
import { renderBlogLine } from '../lib/renderBlogLine'

function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const url = `${BRAND.url}/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.url,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'en',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BlogPostPage() {
  const params = useParams()
  const slug = params.slug ?? ''

  const post = useMemo(() => getPostBySlug(slug), [slug])

  const metaTitle = post ? post.title : 'Blog post'
  const metaDescription = post ? post.metaDescription : `Blog posts from ${BRAND.name}`

  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    path: post ? `/blog/${post.slug}` : '/blog',
  })

  const related = useMemo(() => {
    if (!post) return []
    return BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)
  }, [post])

  if (!post) {
    return (
      <PageLayout>
        <BrandJsonLd />
        <PageHero eyebrow="Blog" title="Article not found." description="The link may be broken or the post was moved." />
        <section className={layout.sectionAlt}>
          <div className="container">
            <div className={`${styles.notFound} reveal`}>
              <h2 className="h2 reveal" style={{ margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Try the blog index instead.
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                Browse all articles and pick the one that matches what you are building right now.
              </p>
              <div style={{ marginTop: 22 }}>
                <Link to="/blog" className="btn btn-primary">
                  Go to blog <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <BrandJsonLd />
      <BlogPostingJsonLd post={post} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={`${post.excerpt} ${post.readTime}.`}
      />

      <section className={layout.sectionAlt}>
        <div className="container">
          <div className={styles.metaRow}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
              Published {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' })}
            </span>
            <span style={{ flex: 1 }} />
            <Link to="/blog" className="btn btn-ghost" style={{ padding: '10px 14px' }}>
              Back to blog
            </Link>
          </div>

          <article className={`${styles.article} reveal`}>
            {post.content.map((line, i) => renderBlogLine(line, i))}

            <div className={styles.ctaInline}>
              <h2 className="h2" style={{ margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Want this applied to your outbound?
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                We diagnose the system, not the symptoms. If you want a call, book 15 minutes and we will tell you what to change first.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link to="/book" className="btn btn-primary">
                  Book a call <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <div style={{ marginTop: 44 }}>
              <span className="eyebrow-2 reveal">Related</span>
              <div className={styles.relatedGrid}>
                {related.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className={styles.relatedCard}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                      {p.category}
                    </span>
                    <h3 className="serif" style={{ fontSize: 20, margin: '10px 0 10px', letterSpacing: '-0.02em' }}>
                      {p.title}
                    </h3>
                    <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>
                      {p.excerpt}
                    </p>
                    <span className={styles.relatedArrow}>Read →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}

