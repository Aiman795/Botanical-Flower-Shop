import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName:
  {
    type: String,
    required: true
  },
  address:
  {
    type: String,
    required: true
  },
  contact: { 
    type: String, 
    required: true, 
    match: /^[0-9]{11}$/  //  Only allows 11-digit numbers
  },
  productName: 
  { 
    type: String,
    required: true 
  },
  quantity: 
  { 
    type: Number,
    required: true 
  },
  date:
  { 
    type: Date, 
    default: Date.now 
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
