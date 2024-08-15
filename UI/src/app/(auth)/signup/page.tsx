"use client"
import dynamic from "next/dynamic";
import Input from "@/components/common/Input";
import Registrationcolumn from "@/components/common/Registration/Registrationcolumn";
import Select from "@/components/common/Select";
import SelectWithInput from "@/components/common/SelectWithInput";
import { EyeIcon } from "@/utils/SVGs";
import { genderOptions, mobileOptions } from "@/utils/constant";
import { useForm, FormProvider } from 'react-hook-form';
import ErrorMessage from "@/components/common/ErrorMessage";
import Link from "next/link";
import { useCookies } from 'next-client-cookies';
import { useMutation } from "@apollo/client";
import { SIGNUP_API } from "@/lib/graphql/mutation/signup";
import { useRouter } from 'next/navigation'
import { errorToast, successToast } from "@/components/common/Toast/toaster";
const CustomButton = dynamic(() => import("@/components/common/CustomButton"));

const page = () => {
  const cookies = useCookies();
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors }, watch, reset } = methods;

  const [signUpUser, { loading }] = useMutation(SIGNUP_API);

  const onSubmit = async (formData: any) => {
    try {
      const { fullName, email, password:userpassword, phoneNumber, countryCode, gender } = formData
      const response = await signUpUser({
        variables: {
          input: {
            fullName: fullName,
            email: email,
            password: userpassword,
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            gender: gender
          },
        }
      });
      if (response.data.signUpUser.token.token) {
        successToast("Signup successfully...")
        reset();
        cookies.set('token', response.data.signUpUser.token.token);
        cookies.set('userInfo', JSON.stringify(response.data.signUpUser.info));
        router.replace("/");
      }else{
        throw new Error("Something went wrong, please contact support...");
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center min-h-screen poppins">
      <div className="flex flex-col items-center justify-center w-full rounded-lg lg:p-16 xl:p-8">
        <div className="flex flex-col md:flex-row w-full justify-center">
          {/* Column 1 - Registration Column */}
          <Registrationcolumn />
          {/* Column 2 - Signup Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-12 w-full md:w-[790px] h-auto rounded-r-lg bg-[url('/Rectangle.png')] bg-no-repeat">
              <h2 className="text-white text-[24px] font-semibold pb-2">Sign Up</h2>
              <p className="text-white text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>

              {/* Full Name */}
              <div className="pb-2 pt-4">
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  label="Full Name"
                  {...register('fullName', {
                    required: "Full Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Full Name should contain only letters and spaces"
                    }
                  })}
                />
                {errors.fullName && <ErrorMessage errorText={errors.fullName.message} />}
              </div>

              {/* Email */}
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

              {/* Mobile and Gender Select */}
              <div className="flex justify-between items-center gap-6 py-2">
                <div className="w-full">
                  <SelectWithInput selectOptions={mobileOptions} />
                </div>
                <div className="w-full">
                  <Select
                    label="Gender"
                    id="gender"
                    options={genderOptions}
                    className="poppins border-none w-full rounded-md bg-alabaster py-4 text-manatee text-base pr-10 placeholder:text-manatee focus:ring-2 focus:ring-inset focus:ring-purple"
                    {...register('gender', { required: "Gender is required" })}
                  />
                  {errors.gender && <ErrorMessage errorText={errors.gender.message} />}
                </div>
              </div>

              {/* Password and Confirm Password */}
              <div className="flex justify-between items-center gap-6 py-2 ">
                <div className="w-full">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    label="Password"
                    icon={<EyeIcon />}
                    {...register('password', {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                      }
                    })}
                  />
                  {errors.password && <ErrorMessage errorText={errors.password.message} />}
                </div>
                <div className="w-full">
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
              </div>

              {/* Agree Terms Checkbox */}
              <div className="pt-4">
                <label htmlFor="agreeTerms" className="flex items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <Input
                      label="agreeTerms"
                      type="checkbox"
                      className="h-[24px] w-[24px] outline-none border-none accent-purple text-purple rounded cursor-pointer"
                      id="agreeTerms"
                      {...register('agreeTerms', { required: "You must agree to the terms" })}
                    />
                  </div>
                  <div>
                    <strong className="font-base font-normal text-white cursor-pointer">
                      Lorem ipsum dolor sit amet consectetur. Est augue dignissim.
                    </strong>
                  </div>
                </label>
                {errors.agreeTerms && <ErrorMessage errorText={errors.agreeTerms.message} />}
              </div>

              {/* Signup Button */}
              <CustomButton className="mt-4 mb-2" disabled={loading}>
                {loading ? "Signing up..." : "SIGNUP"}
              </CustomButton>

              {/* Login Link */}
              <div className="flex items-center text-white text-sm">
                <p>Already have an account?</p>&nbsp;
                <Link href="/login" className="font-semibold">Login</Link>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default page;
