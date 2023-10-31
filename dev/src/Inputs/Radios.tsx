import { ChangeEventHandler, HTMLProps } from 'react';
import { useFilteredListContext } from '../FilteredList';

interface FilteredListRadiosFilterProps<TData>
  extends HTMLProps<HTMLInputElement> {
  assignedProperty: keyof TData;
  onChange?: () => void;
}

export default function FilteredListRadiosFilter<TData>({
  assignedProperty,
  onChange,
  ...inputProps
}: FilteredListRadiosFilterProps<TData>) {
  const { filterValues, updateFilterValue } = useFilteredListContext<TData>();
  const inputValue = filterValues[assignedProperty] as unknown as string;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    updateFilterValue({
      [assignedProperty]: e.currentTarget.value,
    } as unknown as Partial<TData>);
    if (onChange) onChange();
  };
  return (
    <input
      {...inputProps}
      type="text"
      value={inputValue}
      onChange={handleChange}
    />
  );
}
