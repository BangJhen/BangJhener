import Image from "next/image";
import styles from "./profile-card.module.css";

export function ProfileCard({ name, role, location, imageSrc = "" }) {
  return (
    <article className={styles.card}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.avatarWrap}>
        {imageSrc ? (
          <Image src={imageSrc} alt={name} fill sizes="280px" className={styles.avatarImage} />
        ) : (
          <div className={styles.avatarPlaceholder}>Image coming soon</div>
        )}
      </div>
      <div className={styles.meta}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role}</p>
        <p className={styles.location}>{location}</p>
      </div>
    </article>
  );
}

