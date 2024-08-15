import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from "@/components/common/ErrorMessage";

interface SelectWithInputProps {
    selectOptions: string[];
}

const SelectWithInput: React.FC<SelectWithInputProps> = ({ selectOptions }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="sm:col-span-2">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <select
                        id="countryCode"
                        {...register('countryCode', { required: "country Code is required" })}
                        className="poppins h-full rounded-md bg-alabaster border-0 bg-transparent bg-none py-0 pl-4 pr-6 text-manatee text-base focus:ring-2 focus:ring-inset focus:ring-purple"
                    >
                        {selectOptions.map((option, index) => (
                            <option key={`${option}-${index}`} value={option}>
                                {option}
                            </option>
                        ))}

                    </select>
                </div>

                <input
                    type="tel"
                    id="phoneNumber"
                    {...register('phoneNumber', {
                        required: "Phone Number is required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Phone Number should contain only numbers"
                        }
                    })}
                    maxLength={10}
                    minLength={10}
                    className="poppins block bg-alabaster w-full placeholder:text-manatee border-none text-base rounded-md py-4 pl-20 text-manatee focus:ring-2 focus:ring-inset focus:ring-purple"
                    placeholder="Phone Number"
                />
            </div>
            {errors.country && <ErrorMessage errorText={errors.country.message} />}
            {errors.phoneNumber && <ErrorMessage errorText={errors.phoneNumber.message} />}
        </div>
    );
};

export default SelectWithInput;
