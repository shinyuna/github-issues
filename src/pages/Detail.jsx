import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router';
import { API } from '../api';

export const Detail = () => {
  const { issue_number } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const { data } = await API.getRepoIssue('angular', 'angular-cli', issue_number);
        setIssue(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssue();
  }, [issue_number]);

  if (!issue)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="container detail">
      <div className="detail__header">
        <h1 className="detail__title">
          {issue.title} <span>#{issue.number}</span>
        </h1>
        <div className="detail__info">
          <span className="label">⚠ Open</span>
          <span className="info">
            {issue.user.login} opened this issue {new Date(issue.created_at).toLocaleDateString()} · {issue.comments}{' '}
            comments
          </span>
        </div>
      </div>
      <div className="detail__content">
        <div className="detial__user">
          <div className="profile">
            <img src={issue.user.avatar_url} alt="user profile" />
          </div>
          <p>{issue.user.login}</p>
        </div>
        <div className="content">
          <div className="markdown">
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
