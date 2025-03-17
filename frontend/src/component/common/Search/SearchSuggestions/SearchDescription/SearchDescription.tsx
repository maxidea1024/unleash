import { styled } from '@mui/material';
import {
  getSearchTextGenerator,
  type IGetSearchContextOutput,
} from 'hooks/useSearch';

const StyledHeader = styled('span')(({ theme }) => ({
  fontSize: theme.fontSizes.smallBody,
  color: theme.palette.text.primary,
}));

const StyledCode = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
}));

type SearchDescriptionProps = {
  filters: any[];
  getSearchContext: () => IGetSearchContextOutput;
  searchableColumnsString: string;
};

export const SearchDescription = ({
  filters,
  getSearchContext,
  searchableColumnsString,
}: SearchDescriptionProps) => {
  const searchContext = getSearchContext();
  const getSearchText = getSearchTextGenerator(searchContext.columns);
  const searchText = getSearchText(searchContext.searchValue);
  const searchFilters = filters.filter((filter) => filter.values.length > 0);

  return (
    <>
      {Boolean(searchText) && (
        <>
          <StyledHeader>Searching for:</StyledHeader>
          <p>
            <StyledCode>{searchText}</StyledCode>{' '}
            {searchableColumnsString ? ` in ${searchableColumnsString}` : ''}
          </p>
        </>
      )}
      {searchFilters.length > 0 && (
        <>
          <StyledHeader>Filtering by:</StyledHeader>
          {searchFilters.map((filter) => (
            <p key={filter.name}>
              <StyledCode>{filter.values.join(',')}</StyledCode> in{' '}
              {filter.header}. Options:{' '}
              {[...new Set(filter.options)].slice(0, 10).join(', ')}
            </p>
          ))}
        </>
      )}
    </>
  );
};
