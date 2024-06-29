import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { useDebounce, useJobItems } from "./lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText=useDebounce(searchText, 250)
  const { jobItemsSliced, isLoading, totalNumberOfResults } =
    useJobItems(debouncedSearchText);



  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container
        jobItems={jobItemsSliced}
        isLoading={isLoading}
        totalNumberOfResults={totalNumberOfResults}
      />
      <Footer />
    </>
  );
}

export default App;
