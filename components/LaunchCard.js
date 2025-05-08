import Image from 'next/image';
import styles from '@/styles/LaunchCard.module.css';
import skeletonStyles from '@/styles/Skeleton.module.css';

export default function LaunchCard({ launch, onClick }) {
  const formatedDate = (date) => {
    return date.slice(0, 10).split('-').reverse().join('-');
  };

  const status =
    launch.success === true
      ? 'success'
      : launch.success === false
      ? 'failure'
      : 'unknown';

  return (
    <article key={launch.id} className={styles.launch_card} onClick={onClick}>
      {launch.links.patch.small ? (
        <Image
          src={launch.links.patch.small}
          alt={`${launch.name} patch`}
          width={200}
          height={200}
          className={styles.image}
        />
      ) : (
        <div className={skeletonStyles.skeleton_image}></div>
      )}

      <h2>{launch.name}</h2>
      <div className={styles.card__content}>
        <p>Date: {formatedDate(launch.date_utc)}</p>
        <p>Launch Status: {status}</p>
      </div>
    </article>
  );
}
