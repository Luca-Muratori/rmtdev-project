import { SortingButtonProps, SortingProps } from "./lib/types";

export default function Sorting({ handleSortBy, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => handleSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      className={`sorting__button sorting__button--relevant ${
        isActive ? "sorting__button--active" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
