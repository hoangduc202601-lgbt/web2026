'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6 search-section">
      <input 
        className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" 
        type="text" 
        name="search" 
        placeholder="Tìm kiếm" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        type="submit"
        className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03"
        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        <i className="zmdi zmdi-search"></i>
      </button>
    </form>
  );
}

