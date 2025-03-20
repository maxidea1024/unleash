import { endOfDay, startOfHour, subDays, subHours } from 'date-fns';

export interface IHourBucket {
  timestamp: Date;
}

export function generateHourBuckets(hours: number): IHourBucket[] {
  const start = startOfHour(new Date());
  const result: IHourBucket[] = [];
  for (let i = 0; i < hours; i++) {
    result.push({ timestamp: subHours(start, i) });
  }
  return result;
}

// Generate last x days starting from end of yesterday
export function generateDayBuckets(days: number): IHourBucket[] {
  const start = endOfDay(subDays(new Date(), 1));
  const result: IHourBucket[] = [];
  for (let i = 0; i < days; i++) {
    result.push({ timestamp: subDays(start, i) });
  }
  return result;
}
