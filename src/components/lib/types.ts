export type JobItem = {
  badgeLetters: string;
  id: number;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
  description:string
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
  isActive:boolean
};

export type ContainerProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  totalNumberOfResults:number
};

export type HeaderProps = {
  searchText: string;
  setSearchText: (string: string) => void;
};

export type SearchFormProps = {
  setSearchText: (string: string) => void;
  searchText: string;
};

export type SidebarProps = { jobItems: JobItem[]; isLoading: boolean, totalNumberOfResults:number };

export type ResultsCountProp={
  totalNumberOfResults:number
}