import React, { useEffect, useState, useRef, useMemo } from 'react';

import { Issue } from '../components/Issue';
import { useFetch } from '../hooks/useFetch';

export const Issues = () => {
  const [pageNum, setPageNum] = useState(1);
  const { error, list } = useFetch(pageNum);

  const ref = useRef(null);
  const observer = useMemo(
    () =>
      new IntersectionObserver(entries => {
        entries.forEach(async entry => {
          if (entry.isIntersecting) {
            await setPageNum(prev => prev + 1);
          }
        });
      }),
    []
  );
  useEffect(() => {
    // 옵저버 적용
    if (error) return;
    if (!list) return;
    if (!ref.current) return;
    const el = ref.current;
    observer.observe(el);
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [observer, list, error]);

  if (list.length === 0)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="container issues">
      {list.map((issue, index) => (
        <div key={index}>
          {index === 4 && (
            <a className="ad" href="https://thingsflow.com/ko/home">
              <img src="https://placehold.it/500x100?text=ad" alt="AD" />
            </a>
          )}
          <Issue
            title={issue.title}
            number={issue.number}
            createdAt={issue.createdAt}
            writer={issue.writer.login}
            comments={issue.comments}
          />
        </div>
      ))}
      <div ref={ref} style={{ width: '100%', height: '20px' }} />
    </div>
  );
};
