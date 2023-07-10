export default class TweetService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return await this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return await this.http.fetch("/tweets", {
      method: "POST",
      body: JSON.stringify({
        text,
        username: "ellie",
        name: "Ellie",
      }),
      headers: this.getHeaders(),
    });
  }

  async deleteTweet(tweetId) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({
        text,
      }),
      headers: this.getHeaders(),
    });
  }
}
