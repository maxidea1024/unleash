import type { ISignal } from 'interfaces/signal';
import { ProjectActionsEventsDetailsSourceSignalEndpoint } from './ProjectActionsEventsDetailsSourceSignalEndpoint';

type ProjectActionsEventsDetailsSourceProps = {
  signal: ISignal;
};

export const ProjectActionsEventsDetailsSource = ({
  signal,
}: ProjectActionsEventsDetailsSourceProps) => {
  const { source } = signal;

  if (source === 'signal-endpoint') {
    return <ProjectActionsEventsDetailsSourceSignalEndpoint signal={signal} />;
  }

  return null;
};
