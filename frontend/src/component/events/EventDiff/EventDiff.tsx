import { diff } from 'deep-diff';
import { useTheme } from '@mui/system';
import type { JSX, CSSProperties } from 'react';

const DIFF_PREFIXES: Record<string, string> = {
  A: ' ',
  E: ' ',
  D: '-',
  N: '+',
};

type EventDiffResult = {
  key: string;
  value: JSX.Element;
  index: number;
};

type EventDiffProps = {
  entry: { data?: unknown; preData?: unknown };
  sort?: (a: EventDiffResult, b: EventDiffResult) => number;
};

const EventDiff = ({
  entry,
  sort = (a, b) => a.key.localeCompare(b.key),
}: EventDiffProps) => {
  const theme = useTheme();

  const styles: Record<string, CSSProperties> = {
    A: { color: theme.palette.eventLog.edited }, // array edited
    E: { color: theme.palette.eventLog.edited }, // edited
    D: { color: theme.palette.eventLog.diffSub }, // deleted
    N: { color: theme.palette.eventLog.diffAdd }, // added
  };

  const diffs =
    entry.data && entry.preData ? diff(entry.preData, entry.data) : undefined;

  const buildItemDiff = (diff: any, key: string) => {
    let change: JSX.Element | undefined;
    if (diff.lhs !== undefined) {
      change = (
        <div style={styles.D}>
          - {key}: {JSON.stringify(diff.lhs)}
        </div>
      );
    } else if (diff.rhs !== undefined) {
      change = (
        <div style={styles.N}>
          + {key}: {JSON.stringify(diff.rhs)}
        </div>
      );
    }

    return change;
  };

  const buildDiff = (diff: any, index: number): EventDiffResult => {
    let change: JSX.Element | undefined;
    const key = diff.path?.join('.') ?? diff.index;

    if (diff.item) {
      change = buildItemDiff(diff.item, key);
    } else if (diff.lhs !== undefined && diff.rhs !== undefined) {
      change = (
        <div>
          <div style={styles.D}>
            - {key}: {JSON.stringify(diff.lhs)}
          </div>
          <div style={styles.N}>
            + {key}: {JSON.stringify(diff.rhs)}
          </div>
        </div>
      );
    } else {
      const changeValue = JSON.stringify(diff.rhs || diff.item);
      change = (
        <div style={styles[diff.kind]}>
          {DIFF_PREFIXES[diff.kind]} {key}
          {changeValue
            ? `: ${changeValue}`
            : diff.kind === 'D'
              ? ' (deleted)'
              : ''}
        </div>
      );
    }

    return {
      key: key.toString(),
      value: <div key={index}>{change}</div>,
      index,
    };
  };

  let changes: any[] = [];

  if (diffs) {
    changes = diffs
      .map(buildDiff)
      .sort(sort)
      .map(({ value }) => value);
  } else if (entry.data == null || entry.preData == null) {
    // Just show the data if there is no diff yet.
    const data = entry.data || entry.preData;
    changes = [
      <div key={0} style={entry.data ? styles.N : styles.D}>
        {JSON.stringify(data, null, 2)}
      </div>,
    ];
  }

  return (
    // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
    <pre style={{ overflowX: 'auto', overflowY: 'hidden' }} tabIndex={0}>
      <code>{changes.length === 0 ? '(no changes)' : changes}</code>
    </pre>
  );
};

export default EventDiff;
