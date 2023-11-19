import dynamic from 'next/dynamic';

const ThemeButton = dynamic(() => import('../components/ThemeButton'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <header>
        <h1>devfinder</h1>
        <ThemeButton />
      </header>
      <main>
        <h1>Hello world!</h1>
      </main>
    </>
  );
}
