import { format } from "date-fns"; // для перетворення наносекунди у потрібний формат даних
import { ru } from "date-fns/locale"; // для перетворення наносекунди у потрібний формат даних

// Функція для перетворення Firebase Timestamp у форматовану дату і час
export const formatTimestamp = (timestamp) => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const formattedDate = format(date, "dd MMMM yyyy", { locale: ru });
  const formattedTime = format(date, "HH:mm", { locale: ru });
  return { formattedDate, formattedTime };
};
