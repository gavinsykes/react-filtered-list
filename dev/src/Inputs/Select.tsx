import { ChangeEventHandler, HTMLProps, ReactNode } from "react";
import { useFilteredListContext } from "../FilteredList";

interface FilteredListSelectFilterProps<TData> extends HTMLProps<HTMLSelectElement> {
  assignedProperty: keyof TData;
  children: ReactNode;
  onChange?: () => void;
}

export default function FilteredListSelectFilter<TData>({ assignedProperty, children, onChange, ...selectProps }: FilteredListSelectFilterProps<TData>) {
  const { filterValues, updateFilterValue } = useFilteredListContext<TData>();
  const inputValue = filterValues[assignedProperty] as unknown as string;
  const handleChange: ChangeEventHandler<HTMLSelectElement> = e => {
    e.preventDefault();
    updateFilterValue({ [assignedProperty]: e.currentTarget.value } as unknown as Partial<TData>);
    if (onChange) onChange();
  }
  return (
    <select {...selectProps} value={inputValue} onChange={handleChange}>
      {children}
    </select>
  )
}