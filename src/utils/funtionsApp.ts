const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = `${ date.getMonth() + 1 }/${date.getDate()}/${date.getFullYear()}`;
  const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return `${formattedDate} ${formattedTime}`;
};

export { formatDateTime };
