import { Fragment, ReactElement, ReactFragment } from 'react';
import { FilteredListBodyProps, useFilteredListContext } from '../FilteredList';

/**
 * Properties for the FilteredListNoList component
 */
type FilteredListNoListProps<TData> = FilteredListBodyProps<
  TData,
  HTMLElement,
  ReactFragment
>;

export default function FilteredListNoList<TData>({
  render,
  ...fragmentProps
}: FilteredListNoListProps<TData>): ReactElement<ReactFragment> {
  const { filteredData } = useFilteredListContext<TData>();
  return <Fragment {...fragmentProps}>{filteredData.map(render)}</Fragment>;
}
