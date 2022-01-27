import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(
      Math.random().toString(),
      title,
      desc,
      price,
    );
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return [product, productIndex];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    // const product = this.findProduct(prodId)[0];
    // const index = this.findProduct(prodId)[1];
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.desc = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1]; // index of product
    this.products.splice(index, 1); // takes index as starting point then removes 1 element
  }
}
