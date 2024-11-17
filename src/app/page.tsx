import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchForm from '@/components/search-form';
import { APP_NAME, DEFAULT_QUERY } from '@/lib/constants';
import fetchGitHubUserProfile from '@/lib/fetchGitHubUserProfile';
import getQueryParam from '@/lib/getQueryParam';
import type { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = getQueryParam(params);

  return {
    title: query ? `${query} | ${APP_NAME}` : APP_NAME,
  };
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const query = getQueryParam(params) || DEFAULT_QUERY;
  const response = await fetchGitHubUserProfile(query);

  return (
    <>
      <div>
        <Header />
        <main>
          <SearchForm {...response} />
          <ProfileCard data={response.data} />
        </main>
      </div>
    </>
  );
}
