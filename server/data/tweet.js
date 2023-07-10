import * as userRepository from "../data/auth.js";

let tweets = [
  {
    id: "1",
    userId: "999",
    text: "안녕! 난 ㅈ밥이야!!",
    createdAt: Date().toString(),
  },
  {
    id: "2",
    userId: "999",
    text: "안녕! 난 ㅈ밥이야!!2222",
    createdAt: Date().toString(),
  },
];

export const getAll = async () => {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
};

export const getAllByUsername = async (username) => {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
};

export const getById = async (id) => {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }

  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
};

export const create = async (text, userId) => {
  const tweet = {
    id: Date.now().toString(),
    userId,
    text,
    createdAt: new Date(),
  };

  tweets = [tweet, ...tweets];
  return getById(tweet.id);
};

export const update = async (id, text) => {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }

  return getById(tweet.id);
};

export const remove = async (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id);
};
