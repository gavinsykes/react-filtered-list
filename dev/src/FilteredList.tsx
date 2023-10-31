import {
  ChangeEvent,
  createContext,
  HTMLProps,
  Key,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import NoList from './Bodies/NoList';
import OList from './Bodies/OList';
import TBody from './Bodies/TBody';
import UList from './Bodies/UList';
import Reset from './Buttons/Reset';
import Input from './Inputs/Input';
import Radios from './Inputs/Radios';
import Select from './Inputs/Select';

interface FilteredListContextProps<TData> {
  filterValues: Partial<TData>;
  filteredData: Array<TData>;
  filteredDataLength: number;
  resetFilters: () => void;
  unfilteredDataLength: number;
  updateFilterValue: (properties: Partial<TData>) => void;
}

export function createFilteredListContext<TData>() {
  return createContext<FilteredListContextProps<TData> | null>(null);
}

const FilteredListContext = createFilteredListContext();

export function useFilteredListContext<
  TData,
>(): FilteredListContextProps<TData> {
  const context = useContext(
    FilteredListContext,
  ) as FilteredListContextProps<TData>;
  if (!context) {
    throw new Error(
      'FilteredList.* components must be rendered as a child of the FilteredListComponent',
    );
  }
  return context;
}

/**
 * Properties for the FilteredList component
 */
export interface FilteredListProps<TData> {
  children: ReactNode;
  data: Array<TData>;
}

export function FilteredList<TData>({
  children,
  data,
}: FilteredListProps<TData>): ReactElement {
  const [filterValues, setFilterValues] = useState<Partial<TData>>({});
  const filteredProperties = Object.keys(filterValues) as Array<keyof TData>;
  const updateFilterValue = (properties: Partial<TData>) => {
    setFilterValues((prev) => ({ ...prev, ...properties }));
  };
  const filterByProperty = (
    item: TData,
    property: keyof TData,
    value: TData[keyof TData],
  ): boolean => {
    const propertyValue = item[property];
    if (!propertyValue || !value) {
      return true;
    }
    if (typeof propertyValue === 'string' && typeof value === 'string') {
      return propertyValue.toLowerCase().includes(value.toLowerCase());
    }
    if (
      (typeof propertyValue === 'number' && typeof value === 'number') ||
      (typeof propertyValue === 'boolean' && typeof value === 'boolean')
    ) {
      return propertyValue === value;
    }
    return false;
  };
  const generateCombinedFilter = (
    properties: Array<keyof TData>,
    values: Partial<TData>,
  ): ((item: TData) => boolean) => {
    return (item: TData) => {
      for (const property of properties) {
        const value = values[property] as TData[keyof TData];
        if (!filterByProperty(item, property, value)) {
          return false;
        }
      }
      return true;
    };
  };
  const resetFilters = () => {
    setFilterValues({});
  };
  const combinedFilter = generateCombinedFilter(
    filteredProperties,
    filterValues,
  );
  const filteredData = data.filter(combinedFilter);
  const unfilteredDataLength = data.length;
  const filteredDataLength = filteredData.length;
  const contextValue: FilteredListContextProps<TData> = {
    filterValues,
    filteredData,
    filteredDataLength,
    resetFilters,
    unfilteredDataLength,
    updateFilterValue,
  };
  return (
    <FilteredListContext.Provider value={contextValue}>
      {children}
    </FilteredListContext.Provider>
  );
}

export interface FilteredListFilterInputProps<TData, TElement>
  extends HTMLProps<TElement> {
  assignedProperty: keyof TData;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface FilteredListBodyProps<TData, TRendered, TElement>
  extends HTMLProps<TElement> {
  render: (item: TData, key: Key) => ReactElement<TRendered>;
}

FilteredList.Bodies = {
  NoList,
  OList,
  TBody,
  UList,
};

FilteredList.Filters = {
  Input,
  Radios,
  Select,
};

FilteredList.Buttons = {
  Reset,
};
