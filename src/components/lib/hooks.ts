import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemApiResponse, JobItemExpanded, JobItemsAPIResponse } from "./types";
import { BASE_API_URL } from "./contants";
import { useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleError } from "./utils";
import { BookmarksContext } from "../../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../../contexts/ActiveIdContextProvider";

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !id ? false : true,
      onError: handleError,
    }
  );
  const isLoading = isInitialLoading;
  const jobItem = data?.jobItem;
  return { jobItem, isLoading } as const;
}

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsAPIResponse> => {
  const response = await fetch(BASE_API_URL + "?search=" + searchText);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => (searchText ? fetchJobItems(searchText) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );
  const jobItems = data?.jobItems;
  const isLoading = isInitialLoading;
  return {
    jobItems,
    isLoading,
  };
}
// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;
//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(BASE_API_URL + "?search=" + searchText);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItems(data.jobItems);
//     };

//     fetchData();
//   }, [searchText]);

//   return {
//     jobItems,
//     isLoading
//   } as const;
// }

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}/${id}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItem(data.jobItem);
//     };

//     fetchData();
//   }, [id]);
//   return { jobItem, isLoading } as const;
// }

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const bookmarkedIdsFromLocalStorage = JSON.parse(
    localStorage.getItem(key) || JSON.stringify(initialValue)
  );
  const [value, setValue] = useState(bookmarkedIdsFromLocalStorage);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as const;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("blablabla");
  }
  return context;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-items", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    // .filter((jobItem) => jobItem !== undefined);
    .filter(jobItem=>Boolean(jobItem)) as JobItemExpanded[]
  const isLoading = results.some((result) => result.isLoading);
  return { jobItems, isLoading };
}


export function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler:()=>void){
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        //e.target instanceof HTMLElement &&
        // !buttonRef.current?.contains(e.target) &&
        // !popOverRef.current?.contains(e.target)
        refs.every((ref)=>!ref.current?.contains(e.target as Node))
      ) {
        handler()
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ refs, handler]);
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error("blablabla");
  }
  return context;
}