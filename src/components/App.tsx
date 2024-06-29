import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { useActiveId, useJobItem, useJobItems } from "./lib/hooks";
import { JobItemExpanded } from "./lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const [ jobItems, isLoading ] = useJobItems(searchText);


  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container jobItems={jobItems} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
