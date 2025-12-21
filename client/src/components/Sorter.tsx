import Select from "react-select";
import { sortOptions } from "../utils/user";
import { FilterOption } from "../types/filterOption";

interface SorterProps {
  selectedSort: FilterOption;
  setSelectedSort: (option: FilterOption) => void;
}

const Sorter: React.FC<SorterProps> = ({ selectedSort, setSelectedSort }) => {
  return (
    <Select
      options={sortOptions}
      value={selectedSort}
      onChange={(option) => option && setSelectedSort(option)}
      isSearchable={false}
    />
  );
};

export default Sorter;