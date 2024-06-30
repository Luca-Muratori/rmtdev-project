import JobList from "./JobList";
import { SidebarProps } from "./lib/types";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar({
  jobItems,
  isLoading,
  totalNumberOfResults,
  onClick,
  currentPage,
  totalNumberOfPages,
  handleSortBy,
  sortBy
}: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalNumberOfResults={totalNumberOfResults} />
        <SortingControls handleSortBy={handleSortBy} sortBy={sortBy}/>
      </div>
      <JobList isLoading={isLoading} jobItems={jobItems} />
      <PaginationControls
        onClick={onClick}
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
      />
    </div>
  );
}
