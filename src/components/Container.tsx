import JobItemContent from "./JobItemContent";
import { ContainerProps } from "./lib/types";
import Sidebar from "./Sidebar";

export default function Container({
  jobItems,
  isLoading,
  totalNumberOfResults,
  onClick,
  currentPage,
  totalNumberOfPages,
  handleSortBy,
  sortBy
}: ContainerProps) {
  return (
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        isLoading={isLoading}
        totalNumberOfResults={totalNumberOfResults}
        onClick={onClick}
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        handleSortBy={handleSortBy}
        sortBy={sortBy}
      />
      <JobItemContent />
    </div>
  );
}
