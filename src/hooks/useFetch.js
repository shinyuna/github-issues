import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { API } from '../api';
import { useScrollMove } from './useScrollMove';

export const useFetch = (page, itemName) => {
  const history = useHistory();

  const [first, setFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const { scrollOnceMove } = useScrollMove();

  const formatData = useCallback(data => {
    return data.map(issue => {
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
  }, []);

  const callAPI = useCallback(
    async page => {
      try {
        let tempList = [];
        const arr = Array.from({ length: page });
        for (let i = 1; i < arr.length; i++) {
          const { data } = await API.getRepoIssues('angular', 'angular-cli', {
            sort: 'comments',
            page: i,
            per_page: 10,
          });
          tempList = [...tempList, ...data];
        }
        const response = await formatData(tempList);
        sessionStorage.removeItem(itemName);
        setList(prev => [...prev, ...response]);
        setFirst(false);
        scrollOnceMove();
      } catch (err) {
        setError(err);
      }
    },
    [page]
  );

  const sendQuery = useCallback(async () => {
    try {
      if (first && page > 1) {
        return;
      }
      if (page) {
        setLoading(true);
        setError(false);
      }
      const { data } = await API.getRepoIssues('angular', 'angular-cli', {
        sort: 'comments',
        page: page,
        per_page: 10,
      });
      if (data.length === 0) {
        throw new Error('Done');
      }
      sessionStorage.removeItem(itemName);
      setList(prev => [...prev, ...formatData(data)]);
      setFirst(false);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  const savePage = () => {
    return sessionStorage.setItem(itemName, page);
  };

  useEffect(() => {
    if (first && page > 1) {
      callAPI(page);
    } else {
      sendQuery();
    }
  }, [page]);

  useEffect(() => {
    const listen = history.listen(savePage);
    return () => {
      listen();
    };
  });

  return { loading, error, list };
};
