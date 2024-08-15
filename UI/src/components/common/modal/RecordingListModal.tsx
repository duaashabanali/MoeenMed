import { GET_RECORDING_BY_ID } from "@/lib/graphql/queries/recording";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import RootModal from "./RootModal";
import { generatePDF } from "@/utils";

const tabs = [
  { name: "Summary", id: "summary" },
  { name: "SOAP", id: "soap" },
  { name: "Conversation", id: "conversation" },
];

const TabContent: React.FC<{ data: string }> = ({ data }) => (
  <div>
    <p>{data}</p>
  </div>
);

interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={`py-2 px-4 me-2 inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 ${
            activeTab === tab.id ? "border-white" : "border-transparent"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  </div>
);

interface ModalContentProps {
  activeTab: string;
  data: any;
}

const ModalContent: React.FC<ModalContentProps> = ({ activeTab, data }) => {
  switch (activeTab) {
    case "summary":
      return <TabContent data={data?.getRecordingById?.summary} />;
    case "soap":
      return <TabContent data={data?.getRecordingById?.soap} />;
    case "conversation":
      return <TabContent data={data?.getRecordingById?.transcription} />;
    default:
      return null;
  }
};

interface ModalComponentProps {
  id: string | null;
  isShow: boolean;
  onClose: () => void;
}

const RecordingListModal: React.FC<ModalComponentProps> = ({
  id,
  isShow,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [getRecording, { data, loading, error }] = useLazyQuery(
    GET_RECORDING_BY_ID,
    {
      variables: { getRecordingByIdId: id },
    }
  );

  useEffect(() => {
    if (id) {
      getRecording();
    }
  }, [id, getRecording]);

  const exportToPDF = () => {
    let content = "";
    if (activeTab === "summary") {
      content = data?.getRecordingById?.summary || "";
    } else if (activeTab === "soap") {
      content = data?.getRecordingById?.soap || "";
    } else if (activeTab === "conversation") {
      content = data?.getRecordingById?.transcription || "";
    }
    generatePDF(content,`${activeTab}.pdf`);
  };


  return (
    <RootModal isOpen={isShow} onClose={onClose}>
      <div className="text-white rounded-lg w-full">
        <div className="bg-[#464255] border-b-[1px]	 border-white flex justify-between items-center mb-6 p-4 px-12">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex space-x-7">
            <button
              className="cursor-pointer flex align-middle gap-3 items-center"
              onClick={exportToPDF}
            >
              <div className="text-sm font-normal">Export</div>
              <Image
                src="/export.png"
                width={22}
                height={24}
                alt="export"
                className="mx-auto"
              />
            </button>
            <button className="rounded" onClick={onClose}>
              <Image
                src="/error.png"
                width={22}
                height={24}
                alt="cancel"
                className="mx-auto"
              />
            </button>
          </div>
        </div>
        <div className="p-4 py-2 pb-7 px-12">
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {!loading && !error && (
            <ModalContent activeTab={activeTab} data={data} />
          )}
        </div>
      </div>
    </RootModal>
  );
};

export default RecordingListModal;
