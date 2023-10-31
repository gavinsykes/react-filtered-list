import { Key, OlHTMLAttributes, ReactElement } from 'react';
import { useFilteredListContext } from '../FilteredList';

export interface FilteredListOListProps<TData>
  extends OlHTMLAttributes<HTMLOListElement> {
  render: (item: TData, key: Key) => ReactElement<HTMLLIElement>;
}

export default function FilteredListOList<TData>({
  render,
  ...oListProps
}: FilteredListOListProps<TData>): ReactElement<HTMLOListElement> {
  const { filteredData } = useFilteredListContext<TData>();
  return <ol {...oListProps}>{filteredData.map(render)}</ol>;
}
