import { CreateProductRequest, Product, productsApi } from "@commerce/api";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type FormValues = CreateProductRequest & {
  status: "ACTIVE" | "INACTIVE";
};

const initialValues: FormValues = {
  name: "",
  sku: "",
  price: 0,
  stock: 0,
  status: "ACTIVE",
};

interface Props {
  product?: Product;
  onSubmit(product: Product): void;
}

export function ProductForm({ product, onSubmit }: Props) {
  const [values, setValues] = useState<FormValues>(() =>
    product ? { ...product } : initialValues,
  );
  const mutation = useMutation({
    mutationFn: (request: FormValues) =>
      product
        ? productsApi.update(product.id, request)
        : productsApi.create(request),
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    mutation.mutate(values, {
      onSuccess: (product) => {
        onSubmit(product);
        setValues(product ? { ...product } : initialValues);
      },
    });
  }

  useEffect(() => {
    setValues(product ? { ...product } : initialValues);
    mutation.reset();
  }, [product]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={values.name} onChange={handleChange} />
      </div>

      <div>
        <label>SKU</label>
        <input name="sku" value={values.sku} onChange={handleChange} />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={values.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={values.stock}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Status</label>
        <select name="status" value={values.status} onChange={handleChange}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending
          ? "Saving..."
          : product
            ? "Update Product"
            : "Save Product"}
      </button>

      {mutation.isError && <p>Failed to save product.</p>}
    </form>
  );
}
