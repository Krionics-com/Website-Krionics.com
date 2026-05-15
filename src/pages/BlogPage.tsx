import { Link } from 'react-router-dom'
import { PageLayout, PageHero, BrandJsonLd } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BLOG_POSTS, BlogPost } from '../data/blogPosts'
import styles from './BlogPage.module.css'
import layout from '../components/PageLayout/PageLayout.module.css'
import { BRAND } from '../lib/brand'

function formatPostDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

function groupByCategory(posts: BlogPost[]) {
  const map = new Map<string, number>()
  for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1)
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
}

export function BlogPage() {
  usePageMeta({
    title: 'Blog — Pipeline systems for B2B teams',
    description:
      'Practical notes on building pipeline systems: cold outbound operations, deliverability, sequence iteration, and AI voice agents.',
    path: '/blog',
  })

  const categories = groupByCategory(BLOG_POSTS)

  return (
    <PageLayout>
      <BrandJsonLd />
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Practical notes on<br />
            pipeline systems.
          </>
        }
        description={`Read how ${BRAND.name} thinks about cold outbound, deliverability, and AI voice agents — written for B2B operators.`}
      />

      <section className={layout.sectionAlt}>
        <div className="container">
          <div className={`${styles.topGrid} reveal`}>
            <div className={styles.intro}>
              <h2 className="h2 reveal" style={{ margin: '0 0 12px', letterSpacing: '-0.02em', maxWidth: '26ch' }}>
                New posts, zero fluff.
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.7, maxWidth: '62ch' }}>
                Each article is built like an operations memo: what to measure, what to change, and what to
                do next. If you are running outbound, these are the details that protect your sender reputation
                and keep meetings coming.
              </p>
            </div>

            <div className={styles.categoryBox}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
                Topics we cover
              </span>
              <ul className={styles.catList}>
                {categories.slice(0, 6).map(([cat, count]) => (
                  <li key={cat}>
                    <span className={styles.catDot} />
                    <span className={styles.catName}>{cat}</span>
                    <span className={styles.catCount}>{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={layout.section}>
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <span className="eyebrow-2 reveal">Latest</span>
            <h2 className="h1 reveal" style={{ margin: '20px 0 16px', letterSpacing: '-0.02em' }}>
              Articles
            </h2>
            <p className="muted reveal" style={{ margin: 0, fontSize: 15, lineHeight: 1.7, maxWidth: '64ch' }}>
              Start with the posts that match what you are building right now — systems, deliverability,
              or voice qualification.
            </p>
          </div>

          <div className={styles.grid}>
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className={`${styles.card} reveal`}>
                <div className={styles.cardTop}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                    {post.category}
                  </span>
                  <span className={styles.date}>
                    {formatPostDate(post.date)} · {post.readTime}
                  </span>
                </div>
                <h3 className="serif" style={{ fontSize: 22, margin: '10px 0 10px', letterSpacing: '-0.02em' }}>
                  <Link to={`/blog/${post.slug}`} className={styles.cardLink}>
                    {post.title}
                  </Link>
                </h3>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                  {post.excerpt}
                </p>
                <div style={{ marginTop: 18 }}>
                  <Link to={`/blog/${post.slug}`} className="btn btn-ghost" style={{ padding: '12px 18px' }}>
                    Read article <span className="arrow">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalBand}>
        <div className="container">
          <div className={styles.finalInner}>
            <div>
              <h2 className="h1" style={{ margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Want this applied to your system?
              </h2>
              <p className="muted" style={{ margin: 0, maxWidth: '60ch', fontSize: 15, lineHeight: 1.7 }}>
                Book a short call. We will diagnose your ICP, infrastructure, and where the pipeline is leaking.
              </p>
            </div>
            <Link to="/book" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Book a call <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

