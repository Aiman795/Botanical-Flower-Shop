// // import Product from '../models/product.model.js';

// // Create a new product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, stockQuantity, category } = req.body;
//     const existingProduct = await Product.findOne({ name });
//     if (existingProduct) {
//       return res.status(400).json({ message: 'Product with this name already exists' });
//     }
//     const product = new Product({ name, description, price, stockQuantity, category });
//     await product.save();
//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating product', error: error.message });
//   }
// };

// // Get all products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

// // Get a product by name
// export const getProductByName = async (req, res) => {
//   try {
//     const { name } = req.params;
//     const product = await Product.findOne({ name });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// };

// // Update a product by name
// export const updateProductByName = async (req, res) => {
//   try {
//     const { name } = req.params;
//     const updatedProduct = await Product.findOneAndUpdate({ name }, req.body, {
//       new: true, // Return the updated document
//       runValidators: true, // Validate the updates against the schema
//     });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product updated successfully', updatedProduct });
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating product', error: error.message });
//   }
// };

// // Delete a product by name
// export const deleteProductByName = async (req, res) => {
//   try {
//     const { name } = req.params;
//     const deletedProduct = await Product.findOneAndDelete({ name });
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// };
