export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error(err);
    }

    if (res.status > 299 || res.status < 200) {
      const error = new Error(
        data?.message ? data.message : "Something went wrong! 😣"
      );

      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }

      throw error;
    }

    return data;
  }
}
