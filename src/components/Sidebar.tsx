
import JobList from "./JobList";
import { SidebarProps } from "./lib/types";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar({jobItems,isLoading}:SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount/>
        <SortingControls/>
      </div>
      <JobList isLoading={isLoading} jobItems={jobItems}/>
      <PaginationControls/>
    </div>
  );
}
