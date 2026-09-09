import { useState } from "react";
import { Product, productsApi } from "@commerce/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "src/lib/react-query/query-keys";
import { ProductForm } from "../components/ProductForm";

export function ProductsPage() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product>();
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.products.all,
    queryFn: productsApi.getAll,
  });
  const deleteMutation = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading products.</p>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
          }
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>

      <ProductForm
        product={editingProduct}
        onSubmit={() => {
          setEditingProduct(undefined);
          queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        }}
      />

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>
                <td>
                  <button onClick={() => setEditingProduct(product)}>
                    Edit
                  </button>
                  <button
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {deleteMutation.isError && <p>Failed to delete product.</p>}
    </div>
  );
}
