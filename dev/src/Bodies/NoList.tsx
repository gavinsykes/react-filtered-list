import { ExoticComponent, Fragment, ReactElement } from 'react';
import { FilteredListBodyProps, useFilteredListContext } from '../FilteredList';

/**
 * Properties for the FilteredListNoList component
 */
type FilteredListNoListProps<TData> = FilteredListBodyProps<
  TData,
  HTMLElement,
  ExoticComponent
>;

export default function FilteredListNoList<TData>({
  render,
  ...fragmentProps
}: FilteredListNoListProps<TData>): ReactElement<ExoticComponent> {
  const { filteredData } = useFilteredListContext<TData>();
  return <Fragment {...fragmentProps}>{filteredData.map(render)}</Fragment>;
}
