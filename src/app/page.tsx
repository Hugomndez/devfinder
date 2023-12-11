import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchForm from '@/components/SearchForm';
import { Metadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams.q;

  return {
    title: query ? `${query} | devFinder` : 'devFinder',
  };
}

export default async function Home({ searchParams }: Props) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : 'octocat';

  return (
    <>
      <div>
        <Header />
        <main>
          <SearchForm />
          <ProfileCard query={query} />
        </main>
      </div>
    </>
  );
}
