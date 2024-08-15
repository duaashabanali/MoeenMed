import Sidebar from "@/components/common/Sidebar";
import RecordingTable from "@/components/Recordings/RecordingTable";
import Link from "next/link";

const page = () => {
  return (
    <Sidebar>
      <div className="flex justify-end my-10">
        <Link href="/">
        <button
          type="button"
          className="text-white bg-[#7F01C5]  focus:outline-none  font-medium rounded-md	 text-sm px-5 py-2.5 text-center flex items-center gap-2"
        >
          <svg
            className="rtl:rotate-180 h-4 w-4 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <span>Add Recording</span>
        </button></Link>
      </div>
      <RecordingTable />
    </Sidebar>
  );
};

export default page;
