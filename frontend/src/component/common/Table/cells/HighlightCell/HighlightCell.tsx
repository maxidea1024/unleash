import type React from 'react';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { Box, styled } from '@mui/material';
import { HtmlTooltip } from 'component/common/HtmlTooltip/HtmlTooltip';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  wordBreak: 'break-word',
  padding: theme.spacing(1, 2),
}));

const StyledTitle = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '1',
  lineClamp: '1',
}));

const StyledSubtitle = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 'inherit',
  WebkitLineClamp: '1',
  lineClamp: '1',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
}));

type HighlightCellProps = {
  value: string;
  subtitle?: string;
  afterTitle?: React.ReactNode;
  subtitleTooltip?: boolean;
};

export const HighlightCell = ({
  value,
  subtitle,
  afterTitle,
  subtitleTooltip,
}: HighlightCellProps) => {
  const { searchQuery } = useSearchHighlightContext();

  const renderSubtitle =
    subtitle && (subtitle.length > 40 || subtitleTooltip) ? (
      <HtmlTooltip title={subtitle} placement='bottom-start' arrow>
        <StyledSubtitle data-loading>
          <Highlighter search={searchQuery}>{subtitle}</Highlighter>
        </StyledSubtitle>
      </HtmlTooltip>
    ) : (
      <StyledSubtitle data-loading>
        <Highlighter search={searchQuery}>{subtitle}</Highlighter>
      </StyledSubtitle>
    );

  return (
    <StyledContainer>
      <StyledTitle
        style={{
          WebkitLineClamp: subtitle ? 1 : 2,
          lineClamp: subtitle ? 1 : 2,
        }}
        data-loading
      >
        <Highlighter search={searchQuery}>{value}</Highlighter>
        {afterTitle}
      </StyledTitle>
      {subtitle && renderSubtitle}
    </StyledContainer>
  );
};
