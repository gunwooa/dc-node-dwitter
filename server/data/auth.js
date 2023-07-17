import { ObjectId, getUsers } from "../db/database.js";
import MongoDB from "mongodb";

const mapOptionalUser = (user) => {
  return user ? { ...user, id: user._id.toString() } : user;
};

export const findByUsername = async (username) => {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
};

export const findById = async (id) => {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
};

export const createUser = async (user) => {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
};
