import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com/',
});

const API = {};

API.getRepoIssues = (owner, repo, params) =>
  client.get(`/repos/${owner}/${repo}/issues`, {
    params: {
      sort: params.sort,
      per_page: params.per_page,
      page: params.page,
    },
  });

export { API };
