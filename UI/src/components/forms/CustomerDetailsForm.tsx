"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Select from "../common/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../common/Input";
import { fields } from "@/utils/constant";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CREATE_PATIENT,
  GET_PATIENT_BY_NUMBER,
} from "@/lib/graphql/mutation/CreatePatient";
import { errorToast, successToast } from "../common/Toast/toaster";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@/utils/form/validationScehma";

const CustomerDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  }:any = useForm ({
    resolver: yupResolver(validationSchema),
  });
  const router = useRouter();

  const [createPatient, { loading }] = useMutation(CREATE_PATIENT, {
    onError: (err) => errorToast(err?.message),
    onCompleted: (data) => onSuccess(data?.createPatient?.id),
  });
  const [fetchPatientData, { data: pdata, loading: fetchLoading }] =
    useLazyQuery(GET_PATIENT_BY_NUMBER);
  const [patientData, setPatientData] = useState<FormData | null>(null);
  console.log(patientData);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userdata = pdata?.getPatientByPhoneNumber?.id
      ? { ...data, id: pdata?.getPatientByPhoneNumber?.id }
      : data;
    createPatient({
      variables: {
        input: userdata,
      },
    });
  };
  const onSuccess = (id: string) => {
    successToast("Successfully added");
    router.push(`/dashboard/${id}`);
  };
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    // Check if the phoneNumber is valid (example validation)
    if (phoneNumber.length === 10) {
      fetchPatientData({ variables: { phoneNumber } });
    } else {
      // Optionally clear patientData state or handle invalid state
      setPatientData(null);
    }
  };

  // Update form fields when patient data is fetched
  useEffect(() => {
    if (pdata && pdata.getPatientByPhoneNumber) {
      const { __typename, ...rest } = pdata.getPatientByPhoneNumber;
      const updatedFormData = {
        ...getValues(),
        ...rest,
      };
      Object.keys(updatedFormData).forEach((key) => {
        setValue(key, updatedFormData[key]);
      });
      setPatientData(rest);
    }
  }, [pdata, setValue, getValues]);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>, fieldid: string) => {
    return fieldid === "phoneNumber" ? handlePhoneNumberChange(e) : undefined;
  };

  return (
    <div className="flex items-center justify-center mt-[50px] border-0">
      <form
        className="py-6 px-3 space-y-6 max-w-xl glassmorphic-bg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Customer Details
        </h2>
        <p className="text-center text-gray-300">
          Please take a moment to fill in the customer details form below
        </p>
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className={
                field.id === "phoneNumber"
                  ? "col-span-2"
                  : "col-span-2 sm:col-span-1"
              }
            >
              {field.type === "select" ? (
                <Select
                  label={field.placeholder}
                  id={field.id}
                  options={field.options ?? []}
                  className="poppins border-none rounded-md w-full py-4 text-black text-base placeholder:text-manatee"
                  {...register(field.id)}
                />
              ) : (
                <Input
                  label={field.placeholder}
                  id={field.id}
                  placeholder={field?.placeholder}
                  type={field.type}
                  className="poppins border-none rounded-md w-full py-4 text-black text-base placeholder:text-manatee"
                  {...register(field.id)}
                  onChange={(e) => onHandleChange(e, field.id)}
                />
              )}
              {errors[field.id] && (
                <span className="text-red-500 text-start w-full block">
                  {errors?.[field.id]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-4 text-white bg-purple-700 rounded-md bg-[#7F01C5]"
        >
          Save
        </button>
      </form>
      {(loading || fetchLoading) && <Loader />}
    </div>
  );
};

export default CustomerDetailsForm;
