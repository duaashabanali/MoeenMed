"use client"
import CustomButton from "@/components/common/CustomButton";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <section className="flex items-center justify-center p-16 bg-white h-screen poppins">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 text-4xl font-bold text-black">404 - Page Not Found</h2>
                    <p className="mb-8 text-lg text-manatee">
                        The page you are looking for doesn&apos;t exist or has been moved.
                    </p>

                    <CustomButton type="button" onClick={handleGoBack}>
                        Go back
                    </CustomButton>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
