import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

export const useScrollMove = () => {
  const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() => sessionStorage.getItem('scroll_pos'));

  const scrollMove = () => {
    if (!scrollInfos && scrollInfos !== 0) {
      return;
    }
    setScrollInfos(sessionStorage.getItem('scroll_pos'));
    window.scrollTo({ top: scrollInfos });
    sessionStorage.removeItem('scroll_pos');
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
