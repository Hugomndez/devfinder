import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchForm from '@/components/search-form';
import getUserData from '@/lib/getUserData';
import { Metadata } from 'next';

type GenerateMetadataProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: GenerateMetadataProps): Promise<Metadata> {
  const { q: _query } = await searchParams;

  return {
    title: _query ? `${_query} | devFinder` : 'devFinder',
  };
}

export default async function Home({ searchParams }: GenerateMetadataProps) {
  const { q: _query } = await searchParams;
  const query = typeof _query === 'string' ? _query : 'octocat';
  const userData = getUserData(query);

  return (
    <>
      <div>
        <Header />
        <main>
          <SearchForm userDataPromise={userData} />
          <ProfileCard userDataPromise={userData} />
        </main>
      </div>
    </>
  );
}
