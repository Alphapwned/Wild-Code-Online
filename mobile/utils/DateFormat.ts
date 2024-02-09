export const handleDate = (day: any): any => {
  day = new Date(day);
  return day.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
