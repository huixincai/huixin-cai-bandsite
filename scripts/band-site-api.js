class BandSiteApi {
  /**
   * The constructor accepts an API key as its only parameter and sets it as an instance property on the class.
   *
   * @param {string} apiKey
   * @param {string} baseUrl
   */
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * This method accepts a comment object as its only parameter.
   * It sends a POST request to the API with the comment object as the body,
   * using the API key instance property (this.apiKey) to authenticate the request.
   *
   * @param {object} comment
   * @returns
   */
  async postComment(comment) {
    return axios.post(`${this.baseUrl}comments`, comment, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  /**
   * This method accepts no parameters.
   * It must send a GET request to the API, using the API key instance property (this.apiKey)
   * to authenticate the request.The getComments method sorts the array of comments from the API,
   * returning them in order from newest to oldest.
   *
   * @returns {object[]}
   */
  async getComments() {
    const response = await axios.get(`${this.baseUrl}comments`, {
      params: {
        api_key: this.apiKey,
      },
    });
    return response.data.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * This method accepts no parameters. It sends a GET request to the provided shows API,
   * using the API key instance property (e.g. this.apiKey) to authenticate the request.
   * The getShows method returns the array of show data objects returned from the API.
   *
   * @returns {object[]}
   */
  async getShows() {
    const response = await axios.get(`${this.baseUrl}showdates`, {
      params: {
        api_key: this.apiKey,
      },
    });
    return response.data;
  }
}
