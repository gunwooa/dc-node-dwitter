let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$cbtqdLi6I0NntkmGhD/QBuqhaXc9QK67FDlgh7DbBkX1t/SpO0Q3y", // abcd123
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://picsum.photos/200/300",
  },
];

export const findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};

export const createUser = async (user) => {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
};
