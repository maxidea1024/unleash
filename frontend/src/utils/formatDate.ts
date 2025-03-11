/**
 * Formats date to 'DD.MM.YYYY HH:MM:SS' format
 * @param date - Date to format (number, string or Date object)
 * @param locale - Optional locale setting (e.g., 'en-US', 'ko-KR')
 * @returns Formatted date and time string
 */
export const formatDateYMDHMS = (
  date: number | string | Date,
  locale?: string,
): string => {
  return new Date(date).toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Formats date to 'DD.MM.YYYY HH:MM' format
 * @param date - Date to format (number, string or Date object)
 * @param locale - Locale setting (e.g., 'en-US', 'ko-KR')
 * @param timeZone - Optional timezone setting (e.g., 'UTC', 'Asia/Seoul')
 * @returns Formatted date and time string
 */
export const formatDateYMDHM = (
  date: number | string | Date,
  locale: string,
  timeZone?: string,
): string => {
  return new Date(date).toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  });
};

/**
 * Formats date to 'DD.MM.YYYY' format
 * @param date - Date to format (number, string or Date object)
 * @param locale - Locale setting (e.g., 'en-US', 'ko-KR')
 * @param timeZone - Optional timezone setting (e.g., 'UTC', 'Asia/Seoul')
 * @returns Formatted date string
 */
export const formatDateYMD = (
  date: number | string | Date,
  locale: string,
  timeZone?: string,
): string => {
  return new Date(date).toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone,
  });
};

/**
 * Formats time to 'HH:MM' format
 * @param date - Date to format (number, string or Date object)
 * @param locale - Locale setting (e.g., 'en-US', 'ko-KR')
 * @returns Formatted time string
 */
export const formatDateHM = (
  date: number | string | Date,
  locale: string,
): string => {
  return new Date(date).toLocaleString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formats time to 'HH:MM:SS' format
 * @param date - Date to format (number, string or Date object)
 * @param locale - Locale setting (e.g., 'en-US', 'ko-KR')
 * @returns Formatted time string
 */
export const formatDateHMS = (
  date: number | string | Date,
  locale: string,
): string => {
  return new Date(date).toLocaleString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
