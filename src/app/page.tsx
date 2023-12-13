import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchForm from '@/components/SearchForm';
import { Metadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams: { q } }: Props): Promise<Metadata> {
  return {
    title: q ? `${q} | devFinder` : 'devFinder',
  };
}

export default async function Home({ searchParams: { q } }: Props) {
  const query = typeof q === 'string' ? q : 'octocat';

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
