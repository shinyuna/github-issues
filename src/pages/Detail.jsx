import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { API } from '../api';

export const Detail = () => {
  const { issue_number } = useParams();
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const { data } = await API.getRepoIssue('angular', 'angular-cli', issue_number);
        console.log('🚀 ~ fetchIssue ~ data', data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssue();
  }, []);

  return <div className="container">Detail</div>;
};
