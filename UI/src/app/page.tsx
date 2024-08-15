import StartRecording from "@/components/Recordings/StartRecording";
import Sidebar from "@/components/common/Sidebar";

const page = () => {

  return (
    <>
      <Sidebar>
        <div className="flex justify-center items-center  poppins">
          <div className="flex flex-col items-center justify-center w-full rounded-lg">
            <div className="flex flex-col md:flex-row w-full justify-center ">
                <StartRecording id={""} />
            </div>
          </div>
        </div>
      </Sidebar>
    </>

  )
}

export default page