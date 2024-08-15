"use client";
import CustomButton from "@/components/common/CustomButton";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Registrationcolumn from "@/components/common/Registration/Registrationcolumn";
import { EyeIcon } from "@/utils/SVGs";
import { useForm, FormProvider } from 'react-hook-form';

const page = () => {
  const methods = useForm();
  const { register, handleSubmit, formState: { errors }, watch } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const password = watch("newpassword");
  return (
    <div className="flex justify-center items-center min-h-screen poppins">
      <div className="flex flex-col items-center justify-center w-full rounded-lg lg:p-16 xl:p-8">
        <div className="flex flex-col md:flex-row w-full justify-center">
          {/* col1 */}
          <Registrationcolumn/>

          {/* col2 */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-12 w-full md:w-[790px] h-auto rounded-r-lg bg-[url('/Rectangle.png')] bg-no-repeat">
              <h2 className="text-white text-[24px] font-semibold pb-2 ">Reset Password</h2>
              <p className="text-white text-base font-normal ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>

              <div className="pb-2 pt-4">
                <Input
                  type="password"
                  id="newpassword"
                  placeholder="New Password"
                  label="New Password"
                  icon={<EyeIcon />}
                  {...register('newpassword', {
                    required: "New Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "New Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                    }
                  })}
                />
                {errors.newpassword && <ErrorMessage errorText={errors.newpassword.message} />}
              </div>

              <div className="pb-2 pt-4">
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  icon={<EyeIcon />}
                  {...register('confirmPassword', {
                    required: "Confirm Password is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                />
                {errors.confirmPassword && <ErrorMessage errorText={errors.confirmPassword.message} />}
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