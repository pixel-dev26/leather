import styles from "./ui.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "ghostLight" | "text";
  className?: string;
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  if (variant === "text") {
    return (
      <a href={href} className={`${styles.textLink} ${className}`}>
        <span className={styles.textLine} aria-hidden />
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={`${styles.btn} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden />
    </a>
  );
}
