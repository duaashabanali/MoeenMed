import React, { FC, ChangeEvent, forwardRef, Ref } from 'react';

interface SelectProps {
    label: string;
    id: string;
    options: { value: string; label: string }[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    className: string;
}

const Select: FC<SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>> = forwardRef(
    ({ id, options, onChange, className, label, ...rest }, ref: Ref<HTMLSelectElement>) => {
        return (
            <select
                name={id}
                id={id}
                className={className}
                onChange={onChange}
                ref={ref}
                {...rest}
            >
                <option value="" disabled className="text-manatee poppins">{label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value} className='text-manatee poppins'>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = 'Select';

export default Select;
