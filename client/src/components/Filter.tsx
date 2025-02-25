import React, { useState } from 'react';
import Select from 'react-select';
import { FilterOption } from '../types/filterOption';

interface UserFilterProps {
    options: FilterOption[];
    filterName: string;
    onSelectedOptionChange: (selectedOptions: FilterOption[]) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ options, filterName, onSelectedOptionChange }: UserFilterProps) => {
    const [selectedOptions, setSelectedOptions] = useState<FilterOption[]>([]);


    const handleChange = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions || []);
        onSelectedOptionChange(selectedOptions);
    };

    return <div>
        <Select
            id={filterName}
            options={options}
            value={selectedOptions}
            isMulti
            onChange={handleChange}
            placeholder={`Select ${filterName}`}
        />
    </div>
}

export default UserFilter;