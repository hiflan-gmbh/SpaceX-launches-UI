import styles from '@/styles/Home.module.css';
import axios from 'axios';
import Head from 'next/head';

import LaunchList from '@/components/LaunchList';
import Pagination from '@/components/Pagination';

const LIMIT = 12;

export default async function Home({ searchParams = {} }) {
  const currentPage = parseInt(searchParams.page || 1);
  const queryOptions = {
    select: 'id name date_utc success upcoming details failures links',
    sort: 'date_utc',
    limit: LIMIT,
    page: currentPage,
  };

  const url = 'https://api.spacexdata.com/v5/launches/query';

  let data;
  try {
    const response = await axios.post(url, { options: queryOptions });
    data = response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error('Data not found. Please check the requested resource.');
      } else if (status === 500) {
        throw new Error('Internal server error. Please try again later.');
      } else if (status === 400) {
        throw new Error('Bad request. Please check your query parameters.');
      } else {
        throw new Error('An unexpected error occurred. Please try again.');
      }
    } else {
      throw new Error(
        'Failed to connect to the server. Please check your network connection.'
      );
    }
  }

  const isLoading = false;
  return (
    <>
      <Head>
        <title>SpaceX Launch Tracker</title>
        <meta name="description" content="space x monitor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={styles.main__section}>
          {data.docs.map((launch) => (
            <LaunchList launch={launch} key={launch.id} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            totalResults={data.totalDocs}
          />
        </section>
      </main>
    </>
  );
}
