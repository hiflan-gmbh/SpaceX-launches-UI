import Skeleton from '@/components/ui/Skeleton';
import styles from '@/styles/Home.module.css';

export default function Loading() {
  return (
    <div className={styles.main__section}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}
