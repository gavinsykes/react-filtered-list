import { ChangeEventHandler } from 'react';
import {
  FilteredListFilterInputProps,
  useFilteredListContext,
} from '../FilteredList';

function useInputValidation(inputType: string | undefined): void {
  if (!inputType) {
    throw new Error(
      'The FilteredListFilterInput component requires its type to be set.',
    );
  }
  if (['email', 'tel', 'url'].includes(inputType)) {
    console.warn(
      `You are using an input[type=${inputType}] for filtering, it may be better to use type="text" instead`,
    );
  }
}

export default function FilteredListFilterInput<TData>({
  assignedProperty,
  handleChange,
  ...inputProps
}: FilteredListFilterInputProps<TData, HTMLInputElement>) {
  const { filterValues, updateFilterValue } = useFilteredListContext<TData>();
  console.log(filterValues);
  const inputValue = filterValues[assignedProperty] ?? '';
  useInputValidation(inputProps.type);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    updateFilterValue({
      [assignedProperty]: e.currentTarget.value,
    } as unknown as Partial<TData>);
    if (handleChange) handleChange(e);
  };
  return (
    <input
      {...inputProps}
      value={String(inputValue)}
      onChange={onChange}
      tabIndex={0}
    />
  );
}
