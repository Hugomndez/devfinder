import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchForm from '@/components/SearchForm';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
