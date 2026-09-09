import { FormEvent, useState } from "react";
import { productsApi, Product } from "@commerce/api";
import { Button, Heading, Input, Text } from "@commerce/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./styles.css";

const key = ["products"];

export default function App() {
  const client = useQueryClient();
  const [form, setForm] = useState({ name: "", sku: "", price: "", stock: "" });
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: key, queryFn: productsApi.getAll });
  const create = useMutation({
    mutationFn: () =>
      productsApi.create({
        name: form.name,
        sku: form.sku,
        price: Number(form.price),
        stock: Number(form.stock),
        status: "ACTIVE",
      }),
    onSuccess: () => {
      setForm({ name: "", sku: "", price: "", stock: "" });
      client.invalidateQueries({ queryKey: key });
    },
  });
  function submit(event: FormEvent) {
    event.preventDefault();
    create.mutate();
  }
  return (
    <section className="remote-panel">
      <div className="remote-heading">
        <div>
          <Text className="eyebrow">CATALOG OPERATIONS</Text>
          <Heading level={2}>Products</Heading>
        </div>
        <Text>{data.length} active records</Text>
      </div>
      <form className="product-form" onSubmit={submit}>
        <Input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          required
        />
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <Input
          type="number"
          min="0"
          step="1"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? "Adding..." : "Add product"}
        </Button>
      </form>
      {isLoading && <Text>Loading catalog...</Text>}
      {isError && <Text>Unable to load the catalog.</Text>}
      {create.isError && (
        <Text>Could not create this product. Check the SKU and values.</Text>
      )}
      <div className="product-grid">
        {data.map((product: Product) => (
          <article className="product-card" key={product.id}>
            <div className="product-art">{product.name.slice(0, 1)}</div>
            <div>
              <Text className="product-name">{product.name}</Text>
              <Text className="muted">{product.sku}</Text>
              <div className="product-meta">
                <strong>${product.price.toFixed(2)}</strong>
                <span>{product.stock} in stock</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
