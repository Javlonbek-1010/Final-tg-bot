import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true,  },
  chatId: { type: String, required: true, unique: true },
  username: { type: String,  required: false, default: null },
  active: { type: Boolean, default: true },
  balance: { type: Number, default: 4000  },
}, 
{ timestamps: true }

);

const User = new mongoose.model("User", userSchema);

export default User;