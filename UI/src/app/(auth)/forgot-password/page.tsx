"use client";
import CustomButton from "@/components/common/CustomButton";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Registrationcolumn from "@/components/common/Registration/Registrationcolumn";
import { useForm, FormProvider } from 'react-hook-form';

const page = () => {
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen poppins">
      <div className="flex flex-col items-center justify-center w-full rounded-lg lg:p-16 xl:p-8">
        <div className="flex flex-col md:flex-row w-full justify-center">
          {/* col1 */}
          <Registrationcolumn />

          {/* col2 */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-12 w-full md:w-[790px] h-auto rounded-r-lg bg-[url('/Rectangle.png')] bg-no-repeat">
              <h2 className="text-white text-[24px] font-semibold pb-2 ">Forgot Password</h2>
              <p className="text-white text-base font-normal ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>

              <div className="py-2">
                <Input
                  type="email"
                  id="email"
                  placeholder="Email Id"
                  label="Email Id"
                  {...register('email', {
                    required: "Email Id is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address"
                    }
                  })}
                />
                {errors.email && <ErrorMessage errorText={errors.email.message} />}
              </div>

              <CustomButton className="mt-6 mb-2">
                SUBMIT
              </CustomButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default page