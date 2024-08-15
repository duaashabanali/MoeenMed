import StartRecording from '@/components/Recordings/StartRecording'
import React from 'react'

const page = ({ params }: { params: { patient: string } }) => {
  return (
    <div className="flex justify-center items-center  poppins">
    <div className="flex flex-col items-center justify-center w-full rounded-lg">
      <div className="flex flex-col md:flex-row w-full justify-center ">
        <StartRecording  id={params?.patient[0]}/>
      </div>
    </div>
  </div>
  )
}

export default page