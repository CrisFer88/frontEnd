export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  return `${formattedDate} ${formattedTime}`;
};
