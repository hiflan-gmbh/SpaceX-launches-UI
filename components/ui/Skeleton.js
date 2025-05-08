import styles from '@/styles/Skeleton.module.css';

export default function Skeleton() {
  return (
    <div className={styles.launch_card}>
      <div className={styles.skeleton_image}></div>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
    </div>
  );
}
