import { HTMLProps, MouseEventHandler } from 'react';
import { useFilteredListContext } from '../FilteredList';

interface FilteredListResetFiltersButtonProps
  extends HTMLProps<HTMLButtonElement> {
  children: string;
  onReset?: MouseEventHandler<HTMLButtonElement>;
}

export default function FilteredListResetFiltersButton({
  children,
  onReset,
  ...buttonProps
}: FilteredListResetFiltersButtonProps) {
  const { resetFilters } = useFilteredListContext();
  const handleClick: MouseEventHandler<HTMLButtonElement> = async e => {
    resetFilters();
    if (onReset) onReset(e)
  }
  return (
    <button {...buttonProps} type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
