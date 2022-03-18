import React from 'react';
import clsx from 'clsx';

import Navbar from '@/components/Navbar';

export default function App(): JSX.Element {
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={clsx('sticky top-0', onTop || 'shadow-sm shadow-base-content/10')}>
        <Navbar />
      </header>
      <main className="">
        <h1>Hello World</h1>
      </main>
    </>
  );
}
