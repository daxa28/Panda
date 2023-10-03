export const fetchResultLuck = async (): Promise<string> => {
  const rnd = Math.floor(Math.random() * 9) + 1;
  const data: string = await new Promise((resolve, reject) => {
    setTimeout(() => {
      rnd >= 4
        ? resolve(":) Lucky you. You are welcome!")
        : reject(":( Unlucky you. Repeat again please.");
    }, rnd * 500);
  });
  return data;
};
