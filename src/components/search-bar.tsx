'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-3xl mx-auto p-4">
      <div className="flex-1 relative">
        <Input
          type="search"
          placeholder="Search for EDC gear..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
      
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          <SelectItem value="knives">Knives</SelectItem>
          <SelectItem value="wallets">Wallets</SelectItem>
          <SelectItem value="watches">Watches</SelectItem>
          <SelectItem value="tools">Tools</SelectItem>
        </SelectContent>
      </Select>
      
      <Button type="submit">Search</Button>
    </form>
  );
}