import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { Issue } from '../components/Issue';

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
        issues.map((issue, index) =>
          index === 4 ? (
            <div className="ad">
              <a href="https://thingsflow.com/ko/home">
                <img src="https://placehold.it/500x100?text=ad" alt="AD" />
              </a>
            </div>
          ) : (
            <>
              <Issue
                key={issue.id}
                title={issue.title}
                number={issue.number}
                createdAt={issue.createdAt}
                writer={issue.writer.login}
                comments={issue.comments}
              />
            </>
          )
        )}
    </div>
  );
};
