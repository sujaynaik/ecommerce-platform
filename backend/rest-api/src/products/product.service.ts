import { products } from "./products.data";

export class ProductService {
  getAll() {
    return products;
  }

  getById(id: string) {
    return products.find((p) => p.id === id);
  }
}
