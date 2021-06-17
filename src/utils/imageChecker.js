export const ImageChecker = url => {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = url;
    img.onload = _ => res(url);
    img.onerror = _ =>
      rej(
        'https://media.vlpt.us/images/super-d/post/a115d92c-f822-4057-9041-248d683346c1/%E1%84%80%E1%85%B3%E1%84%82%E1%85%A3%E1%86%BC%E1%84%92%E1%85%A1%E1%84%8C%E1%85%A1.png'
      );
  });
};
