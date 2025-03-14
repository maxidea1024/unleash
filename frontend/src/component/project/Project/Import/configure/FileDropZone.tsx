import type React from 'react';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';

const formatJSON = (json: string) => JSON.stringify(JSON.parse(json), null, 4);

type FileDropZoneProps = {
  onSuccess: (message: string) => void;
  onError: (error: string) => void;
  onDragStatusChange: (dragOn: boolean) => void;
  children?: React.ReactNode;
};

const onFileDropped =
  ({ onSuccess, onError }: Omit<FileDropZoneProps, 'onDragStatusChange'>) =>
  (e: ProgressEvent<FileReader>) => {
    const contents = e?.target?.result;
    if (typeof contents === 'string') {
      try {
        const json = formatJSON(contents);
        onSuccess(json);
      } catch (e) {
        onError('Cannot format as valid JSON');
      }
    } else {
      onError('Unsupported format');
    }
  };

// This component has no styling on purpose
export const FileDropZone = ({
  onSuccess,
  onError,
  children,
  onDragStatusChange,
  ...props
}: FileDropZoneProps) => {
  const onDrop = useCallback(([file]: Array<Blob>) => {
    const reader = new FileReader();
    reader.onload = onFileDropped({ onSuccess, onError });
    reader.readAsText(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });
  useEffect(() => {
    onDragStatusChange(isDragActive);
  }, [isDragActive]);

  return (
    <Box {...getRootProps()} {...props}>
      <input data-testid='import-file' {...getInputProps()} />
      {children}
    </Box>
  );
};
