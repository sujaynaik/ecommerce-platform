import { useEffect, useState } from "react";
import { Product, productsApi } from "@commerce/api";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await productsApi.getAll();
        setProducts(result);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
