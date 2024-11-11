function formatDateString(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) {
      throw new Error("Invalid date string");
    }

    // Use Intl.DateTimeFormat to format the date
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

export default formatDateString;