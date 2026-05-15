import styles from '../pages/BlogPostPage.module.css'

/** Renders a blog paragraph; lines wrapped in ** become subheadings. */
export function renderBlogLine(line: string, key: number) {
  const trimmed = line.trim()
  const boldMatch = trimmed.match(/^\*\*(.+)\*\*$/)
  if (boldMatch) {
    return (
      <h3 key={key} className={styles.subheading}>
        {boldMatch[1]}
      </h3>
    )
  }
  return (
    <p key={key} className={styles.paragraph}>
      {line}
    </p>
  )
}
