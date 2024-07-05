import { createContext } from "react";
import {
    ActiveIdContextProp,
  BookmarksContextProviderProp,
} from "../components/lib/types";
import { useActiveId } from "../components/lib/hooks";

export const ActiveIdContext = createContext<ActiveIdContextProp | null>(null);

export default function ActiveIdContextProvider({
  children,
}: BookmarksContextProviderProp) {
  const activeId=useActiveId()
  return (
    <ActiveIdContext.Provider
      value={{
       activeId
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
