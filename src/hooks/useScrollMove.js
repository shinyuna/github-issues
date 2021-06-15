import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

export const useScrollMove = () => {
  const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() => sessionStorage.getItem('scroll_pos'));

  const scrollMove = () => {
    if (!scrollInfos && scrollInfos !== 0) {
      return;
    }
    sessionStorage.removeItem('scroll_pos');
    setScrollInfos(sessionStorage.getItem('scroll_pos'));
    window.scrollTo(0, scrollInfos);
  };

  const scrollOnceMove = useCallback(scrollMove, [scrollInfos]);

  const scrollSave = () => {
    const scrollPos = window.scrollY;
    return sessionStorage.setItem('scroll_pos', scrollPos);
  };

  useEffect(() => {
    const listen = history.listen(scrollSave);
    return () => {
      listen();
    };
  });

  return { scrollMove, scrollOnceMove, scrollSave };
};
