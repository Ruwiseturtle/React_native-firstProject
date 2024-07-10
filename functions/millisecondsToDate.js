

export const millisecondsToDate = (milliseconds) => {
    const date = new Date(parseInt(milliseconds));

    const day = date.getDate();

    const monthNames = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day} ${month}, ${year} | ${hours}:${minutes}`;

    return formattedDate;
}