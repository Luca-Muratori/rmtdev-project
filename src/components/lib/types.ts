export type JobItem = {
  badgeLetters: string;
  id: number;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
  description: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};

export type JobItemProps = {
  jobItem: JobItem;
  isActive: boolean;
};

export type ContainerProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  onClick: (direction:'next'| 'previous') => void;
  currentPage:number;
  totalNumberOfPages:number;
  handleSortBy:(newSort:'relevant'|'recent')=>void;
  sortBy:string
};

export type HeaderProps = {
  searchText: string;
  setSearchText: (string: string) => void;
};

export type SearchFormProps = {
  setSearchText: (string: string) => void;
  searchText: string;
};

export type SidebarProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  onClick: (direction:'next'| 'previous') => void;
  currentPage:number;
  totalNumberOfPages:number;
  handleSortBy:(newSort:'relevant'|'recent')=>void;
  sortBy:string
};

export type ResultsCountProp = {
  totalNumberOfResults: number;
};

export type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};
export type JobItemsAPIResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};
export type PaginationProps = {
  onClick:(direction:'next'| 'previous')=>void;
  currentPage:number;
  totalNumberOfPages:number
};
export type PaginationButtonProps = {
  currentPage:number;
  direction:string;
  onClickPage:() => void;
};
export type SortingProps = {
  handleSortBy:(newSort:'relevant'|'recent')=>void;
  sortBy:string
};
export type SortByType ='relevant'|'recent'

