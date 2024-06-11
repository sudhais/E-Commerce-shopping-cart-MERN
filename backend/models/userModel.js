import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema =  mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user name cannot be null'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email cannot be null'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password cannot be null'],
    trim: true,
  },
  profilePicture: {
    type: String,
    default: "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=2048x2048&w=is&k=20&c=-g-2McKwLpsyYHPDT3Wf1oo2ppTmNxq797heiFJmwSM=",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {timestamps:true})  // automatically create the created time and end time when using timestamps true

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
}

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  // If the password field is not modified, proceed to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model('User', userSchema)

export default UserModel