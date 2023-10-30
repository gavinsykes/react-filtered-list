import { HTMLProps } from "react";
import { useFilteredListContext } from "../FilteredList";

interface FilteredListResetFiltersButtonProps extends HTMLProps<HTMLButtonElement> {
  children: string;
}

export default function FilteredListResetFiltersButton({ children, ...buttonProps }: FilteredListResetFiltersButtonProps) {
  const { resetFilters } = useFilteredListContext();
  return (
    <button {...buttonProps} type="button" onClick={resetFilters}>{children}</button>
  )
}