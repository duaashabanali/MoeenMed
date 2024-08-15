import Image from "next/image";

const Registrationcolumn = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full md:w-[338px] h-auto bg-[url('/Rectangle_long.png')] rounded-l-lg p-4 md:p-8 bg-no-repeat">
                <h1 className="text-white mb-2 font-semibold text-[32px] ">Welcome</h1>
                <h2 className="text-white font-semibold text-[32px] mb-4 ">To</h2>
                <Image src="/Logo.png" width={231} height={67} alt="logo" />
            </div>
        </>
    )
}

export default Registrationcolumn