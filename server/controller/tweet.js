import * as tweetRepository from "../data/tweet.js";

export const getTweets = async (req, res) => {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());

  res.status(200).json(data);
};

export const getTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({
      message: `Tweet id(${id}) not find`,
    });
  }
};

export const createTweet = async (req, res) => {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, name, username);

  res.status(201).json(tweet);
};

export const updateTweet = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({
      message: `Tweet id(${id}) not find`,
    });
  }
};

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  await tweetRepository.remove(id);

  res.sendStatus(204);
};