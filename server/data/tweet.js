import * as userRepository from "../data/auth.js";
import { ObjectId, getTweets } from "../db/database.js";

const mapOptionalTweet = (tweet) => {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
};

const mapTweets = (tweets) => tweets.map(mapOptionalTweet);

export const getAll = async () => {
  return getTweets().find().sort({ createAt: -1 }).toArray().then(mapTweets);
};

export const getAllByUsername = async (username) => {
  return getTweets()
    .find({ username })
    .sort({ createAt: -1 })
    .toArray()
    .then(mapTweets);
};

export const getById = async (id) => {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
};

export const create = async (text, userId) => {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
};

export const update = async (id, text) => {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((res) => res.value)
    .then(mapOptionalTweet);
};

export const remove = async (id) => {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
};
