import { useEffect, useState } from "react";
import { Product, productsApi } from "@commerce/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/lib/react-query/query-keys";

export function ProductsPage() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.products.all,
    queryFn: productsApi.getAll,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading products.</p>;
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
