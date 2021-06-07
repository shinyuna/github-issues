import React, { useEffect, useState } from 'react';
import { API } from '../api';

export const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data } = await API.getRepoIssues('angular', 'angular-cli', {
          sort: 'comments',
          page: 1,
          per_page: 10,
        });
        console.log('🚀 ~ fetchIssues ~ data', data);
        const response = data.map(issue => {
          return {
            id: issue.id,
            number: issue.number,
            title: issue.title,
            writer: issue.user,
            comments: issue.comments,
            link: issue.url,
            createdAt: issue.created_at,
          };
        });
        setIssues(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="container issues">
      {issues.length !== 0 &&
        issues.map(issue => (
          <div className="issue" key={issue.id}>
            <div className="issue__info">
              <p className="issue__info-title">{issue.title}</p>
              <p className="issue__info-sub">
                #{issue.number} {new Date(issue.createdAt).toLocaleDateString('ko')} by {issue.writer.login}
              </p>
            </div>
            <div className="issue__comment">
              <svg
                class="octicon octicon-comment v-align-middle"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path>
              </svg>
              <span>{issue.comments}</span>
            </div>
          </div>
        ))}
    </div>
  );
};
