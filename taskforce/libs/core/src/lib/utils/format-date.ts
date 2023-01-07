const dateFormatter = Intl.DateTimeFormat('ru');

export const formatDate = (date: Date) => dateFormatter.format(date);
