import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SearchInput from '@/components/SearchInput';

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <main>
          <SearchInput />
          <ProfileCard />
        </main>
      </div>
    </>
  );
}
