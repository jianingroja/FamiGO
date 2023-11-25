import mongoose from 'mongoose';
//import { IUser } from "../types";
const Schema = mongoose.Schema;

const url = 'mongodb://127.0.0.1:27017/FamiGO';

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database using Mongoose');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg',
    required: true,
  },
  followers: {
    type: [String],
    required: false,
  },
  following: {
    type: [String],
    required: false,
  },
  posts: {
    type: [String],
    required: false,
  },
  savedPosts: {
    type: [String],
    required: false,
  },
});

//Model
export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
export const getUserByUserName = (username: string) =>
  UserModel.findOne({ username });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
