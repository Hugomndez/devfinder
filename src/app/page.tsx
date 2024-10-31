import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchForm from '@/components/search-form';
import getUserData from '@/lib/getUserData';
import { Metadata } from 'next';

type GenerateMetadataProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
  const { q: _query } = await props.searchParams;

  return {
    title: _query ? `${_query} | devFinder` : 'devFinder',
  };
}

export default async function Home(props: GenerateMetadataProps) {
  const { q: _query } = await props.searchParams;
  const query = typeof _query === 'string' ? _query : 'octocat';

  const { data, isError, message } = await getUserData(query);

  return (
    <>
      <div>
        <Header />
        <main>
          <SearchForm
            isError={isError}
            message={message}
          />
          <ProfileCard data={data} />
        </main>
      </div>
    </>
  );
}
