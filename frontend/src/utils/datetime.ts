export const parseDate = (date: string) => {
  const d = new Date(Date.parse(date));
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
