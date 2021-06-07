import { useCallback, useEffect, useState } from 'react';
import { API } from '../api';

export const useFetch = page => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const { data } = await API.getRepoIssues('angular', 'angular-cli', {
        sort: 'comments',
        page: page,
        per_page: 10,
      });
      if (data.length === 0) {
        throw new Error('Done');
      }
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
      await setList(prev => [...prev, ...response]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [page, sendQuery]);

  return { loading, error, list };
};
