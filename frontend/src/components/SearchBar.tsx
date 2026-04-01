import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher un produit..."
        style={{
          flex: 1,
          padding: '0.6rem 1rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '6px',
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '...' : 'Rechercher'}
      </button>
    </form>
  );
}
