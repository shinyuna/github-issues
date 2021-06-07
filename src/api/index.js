import axios from 'axios';

console.log(process.env);

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

API.getRepoIssue = (owner, repo, issue_number, params) =>
  client.get(`/repos/${owner}/${repo}/issues/${issue_number}`, { params: params });

export { API };
