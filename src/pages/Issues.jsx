import React, { useEffect, useState, useMemo, useRef } from 'react';

import { API } from '../api';
import { Issue } from '../components/Issue';

export const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data } = await API.getRepoIssues('angular', 'angular-cli', {
          sort: 'comments',
          page: 1,
          per_page: 10,
        });
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

  if (!issues)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="container issues">
      {issues.length !== 0 &&
        issues.map((issue, index) =>
          index === 4 ? (
            <div className="ad" key={index}>
              <a href="https://thingsflow.com/ko/home">
                <img src="https://placehold.it/500x100?text=ad" alt="AD" />
              </a>
            </div>
          ) : (
            <Issue
              key={issue.id}
              title={issue.title}
              number={issue.number}
              createdAt={issue.createdAt}
              writer={issue.writer.login}
              comments={issue.comments}
            />
          )
        )}
      <div ref={ref}></div>
    </div>
  );
};
