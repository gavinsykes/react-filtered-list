import { ReactElement } from 'react';
import { FilteredListBodyProps, useFilteredListContext } from '../FilteredList';

type FilteredListTableBodyProps<TData> = FilteredListBodyProps<
  TData,
  HTMLTableRowElement,
  HTMLTableSectionElement
>;

export default function FilteredListTableBody<TData>({
  render,
  ...tbodyProps
}: FilteredListTableBodyProps<TData>): ReactElement {
  const { filteredData } = useFilteredListContext<TData>();
  return <tbody {...tbodyProps}>{filteredData.map(render)}</tbody>;
}