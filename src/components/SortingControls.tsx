import { SortingProps } from "./lib/types";

export default function Sorting({ handleSortBy, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${sortBy ==='relevant'? 'sorting__button--active':''}`}
        onClick={() => handleSortBy("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--relevant ${sortBy ==='recent'? 'sorting__button--active':''}`}
        onClick={() => handleSortBy("recent")}
      >
        Recent
      </button>
    </section>
  );
}
