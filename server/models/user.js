import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  car: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  phone_price: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

export default User;