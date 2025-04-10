import { useEffect, useState } from 'react';
import { formatDistanceToNow, secondsToMilliseconds } from 'date-fns';

const formatTimeAgo = (date: string | number | Date) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('less than a minute ago', '< 1 minute ago'); // TODO: localization

type TimeAgoProps = {
  date: Date | number | string | null | undefined;
  fallback?: string;
  refresh?: boolean;
  timeElement?: boolean;
};

export const TimeAgo = ({
  date,
  fallback = '',
  refresh = true,
  timeElement = true,
}: TimeAgoProps) => {
  const getValue = (): { description: string; dateTime?: Date } => {
    try {
      if (!date) {
        return { description: fallback };
      }

      return {
        description: formatTimeAgo(date),
        dateTime: timeElement ? new Date(date) : undefined,
      };
    } catch {
      return { description: fallback };
    }
  };
  const [state, setState] = useState(getValue);

  useEffect(() => {
    setState(getValue);
  }, [date, fallback]);

  useEffect(() => {
    if (!date || !refresh) {
      return;
    }

    const intervalId = setInterval(() => {
      setState(getValue);
    }, secondsToMilliseconds(12)); // 12초마다?

    return () => clearInterval(intervalId);
  }, [refresh]);

  if (!state.dateTime) {
    // return state.description;
    return <>{state.description}</>;
  }

  return (
    <time dateTime={state.dateTime.toISOString()}>{state.description}</time>
  );
};
