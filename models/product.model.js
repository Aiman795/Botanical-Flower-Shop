import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: String,
  price: 
  { 
    type: Number, 
    required: true 
  },
  stockQuantity: 
  { 
    type: Number, 
    required: true 
  },
  category: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
