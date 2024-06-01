export const convertDate = (dateString) => {
    const date = new Date(dateString);
    const option = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", option);
  };