
import JobItemContent from "./JobItemContent";
import { ContainerProps } from "./lib/types";
import Sidebar from "./Sidebar";

export default function Container({jobItems, isLoading, totalNumberOfResults}: ContainerProps) {
  return <div className="container">
    <Sidebar jobItems={jobItems} isLoading={isLoading} totalNumberOfResults={totalNumberOfResults}/>
    <JobItemContent />
  </div>;
}
