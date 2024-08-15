"use client";
import CustomButton from "@/components/common/CustomButton";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Registrationcolumn from "@/components/common/Registration/Registrationcolumn";
import { EyeIcon } from "@/utils/SVGs";
import Link from "next/link";
import { useForm, FormProvider } from 'react-hook-form';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'
import { useLazyQuery } from "@apollo/client";
import { LOGIN_API } from "@/lib/graphql/queries/login";
import { errorToast, successToast } from "@/components/common/Toast/toaster";

const page = () => {
  const cookies = useCookies();
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors }, reset } = methods;

  const [loginMutation, {loading}] = useLazyQuery(LOGIN_API);

  const onSubmit = async (formData: any) => {
    try {
      const { data } = await loginMutation({
        variables: formData
      });  
      if (data?.login?.token?.token) {
        reset();
        successToast("Logged in successfully...")
        cookies.set('token', data.login.token.token);
        cookies.set('userInfo', JSON.stringify(data.login.info));
        router.replace("/");
      } else {
        throw new Error("Email and password do not match");
      }
    } catch (error: any) {

      errorToast(error.message);
    }
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
              <h2 className="text-white text-[24px] font-semibold pb-2 ">Login</h2>
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
              <div className="py-2">
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  label="Password"
                  icon={<EyeIcon />}
                  {...register('password', {
                    required: "Password is required"
                  })}
                />
                {errors.password && <ErrorMessage errorText={errors.password.message} />}
              </div>

              <CustomButton type="submit" className="mt-6 mb-2" disabled={loading}>
                {loading ? "Logging in..." : "LOGIN"}
              </CustomButton>
              <div className="flex items-center justify-between text-white py-2 text-sm" >
                <div className="flex">
                  <p>Don&apos;t have an account?</p>&nbsp;
                  <Link href="/signup" className="font-semibold">Sign up</Link>
                </div>
                <Link href="/forgot-password" className="font-semibold">Forgot Password?</Link>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default page;
