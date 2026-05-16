import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'start';
  divider?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  divider = true,
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${align === 'start' ? styles.start : ''}`.trim()}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {divider && <div className={styles.divider} />}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
