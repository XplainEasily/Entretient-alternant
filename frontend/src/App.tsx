import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { Product } from './types';
import { getProducts, searchProducts } from './api/products';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Impossible de contacter le backend.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    try {
      const results = query ? await searchProducts(query) : await getProducts();
      setProducts(results);
    } catch {
      setError('Erreur lors de la recherche.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Catalogue produits</h1>
        {searchQuery && (
          <p style={{ color: '#555', marginTop: '0.25rem' }}>
            Résultats pour &laquo;&nbsp;{searchQuery}&nbsp;&raquo;
          </p>
        )}
      </header>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && (
        <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>
      )}

      {loading ? (
        <p style={{ color: '#555' }}>Chargement...</p>
      ) : (
        <>
          <p style={{ color: '#555', marginBottom: '1rem' }}>
            {products.length} produit(s) affiché(s)
          </p>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <li
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{product.name}</h3>
        <p style={{ color: '#555', fontSize: '0.9rem' }}>{product.description}</p>
        <span
          style={{
            display: 'inline-block',
            marginTop: '0.4rem',
            fontSize: '0.75rem',
            background: '#eff6ff',
            color: '#2563eb',
            borderRadius: '4px',
            padding: '0.1rem 0.5rem',
          }}
        >
          {product.category}
        </span>
      </div>
      <span style={{ fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
        {product.price.toFixed(2)} €
      </span>
    </li>
  );
}
