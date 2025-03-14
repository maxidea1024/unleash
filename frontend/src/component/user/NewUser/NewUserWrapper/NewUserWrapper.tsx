import { Box, Typography } from '@mui/material';
import StandaloneLayout from 'component/user/common/StandaloneLayout';
import StandaloneBanner from 'component/user/StandaloneBanner';
import useLoading from 'hooks/useLoading';

type NewUserWrapperProps = {
  loading?: boolean;
  title?: string;
  children?: React.ReactNode;
};

export const NewUserWrapper = ({
  children,
  loading,
  title,
}: NewUserWrapperProps) => {
  const ref = useLoading(loading || false);

  return (
    <div ref={ref}>
      <StandaloneLayout
        showMenu={false}
        BannerComponent={<StandaloneBanner title={'Ganpa'} />}
      >
        <Box
          sx={{
            width: ['100%', '350px'],
          }}
        >
          {Boolean(title) && (
            <Typography
              component='h2'
              sx={{
                fontSize: (theme) => theme.fontSizes.mainHeader,
                marginBottom: 2,
                textAlign: 'center',
                fontWeight: (theme) => theme.fontWeight.bold,
              }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </StandaloneLayout>
    </div>
  );
};
