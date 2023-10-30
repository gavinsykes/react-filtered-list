import { ReactElement } from "react";
import { FilteredListBodyProps, useFilteredListContext } from "../FilteredList";

type FilteredListUListProps<TData> = FilteredListBodyProps<TData, HTMLLIElement, HTMLUListElement>;

export default function FilteredListUList<TData>({ render, ...uListProps }: FilteredListUListProps<TData>): ReactElement<HTMLUListElement> {
  const { filteredData } = useFilteredListContext<TData>();
  return (
    <ul {...uListProps}>
      {filteredData.map(render)}
    </ul>
  );
}