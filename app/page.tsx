import Page from '@/Com/Home'; // Make sure this matches your folder structure path
import { json } from 'react-router-dom';

export default async function HomePage() {
  // Fetching live data securely on the server
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store", 
  });
  
  if (!res.ok) {
    // Optional fallback if your API route goes down
    return <div className="p-10 text-center">Failed to load trending products.</div>;
  }

  const datas = await res.json();

  // Passing the data down cleanly via the 'products' prop
  return <Page products={datas.data || []} />;
}
