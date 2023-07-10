let tweets = [
  {
    id: "1",
    text: "파이팅!!!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    text: "테스트 ㅋㅋ",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
    url: "https://picsum.photos/id/237/200/300",
  },
];

export const getAll = async () => {
  return tweets;
};

export const getAllByUsername = async (username) => {
  return tweets.filter((t) => t.username === username);
};

export const getById = async (id) => {
  return tweets.find((t) => t.id === id);
};

export const create = async (text, name, username) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];
  return tweet;
};

export const update = async (id, text) => {
  const tweet = tweets.find((t) => t.id === id);

  if (tweet) {
    tweet.text = text;
  }
  return tweet;
};

export const remove = async (id) => {
  tweets.filter((t) => t.id !== id);
};
