import Product from "../infrastructure/schemas/Product.js";
import { createProductDto } from "./dto/products.js";
import { ValidationError } from "../domain/errors/validation-error.js";
import { NotFoundError } from "../domain/errors/not-found-error.js";

import mongoose from "mongoose"

export const getProducts = async (req, res) => {
  const { categoryId } = req.query;

  // If categoryId is provided, filter by category
  const filter = categoryId && categoryId !== "ALL" ? { categoryId } : {};

  try {
    const products = await Product.find(filter);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    //! We need to make sure that the data is always in the correct format
    const product = createProductDto.safeParse(req.body);

    if (!product.success) {
      throw new ValidationError(product.error.message);
    }

    await Product.create({
      categoryId: product.data.categoryId,
      image: product.data.image,
      name: product.data.name,
      price: product.data.price,
      description: product.data.description,
    });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("categoryId");
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return res.status(200).json(product).send();
  } catch (error) {
    next(error);
  }
};
