import { ResultsCountProp } from "./lib/types";

export default function ResultsCount({totalNumberOfResults}: ResultsCountProp) {
  return <p className="count"><span className="u-bold">{totalNumberOfResults}</span> results</p>;
}
