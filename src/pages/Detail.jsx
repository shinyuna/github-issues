import React from 'react';
import { useParams } from 'react-router';

export const Detail = () => {
  const params = useParams();
  console.log('🚀 ~ Detail ~ params', params);

  return <div>Detail</div>;
};
