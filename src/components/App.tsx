import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { useDebounce, useJobItems } from "./lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULT_PER_PAGE } from "./lib/contants";
import { PageDirection, SortByType } from "./lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByType>("relevant");

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULT_PER_PAGE;
  const jobItemsSorted =
    [...(jobItems || [])]?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    }) || [];
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  );

  const handleChangePage = (direction:PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortBy = (newSortBy: SortByType) => {
    setCurrentPage(1)
    setSortBy(newSortBy);
  };

 
  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container
        jobItems={jobItemsSortedAndSliced}
        isLoading={isLoading}
        totalNumberOfResults={totalNumberOfResults}
        onClick={handleChangePage}
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        handleSortBy={handleSortBy}
        sortBy={sortBy}
      />
      <Footer />
      <Toaster position={"top-right"} />
    </>
  );
}

export default App;
