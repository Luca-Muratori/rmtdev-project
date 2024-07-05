import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import {  useRef, useState } from "react";
import { useOnClickOutside } from "./lib/hooks";

export default function BookmarksButton() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popOverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([buttonRef, popOverRef], ()=>setOpen(false))
  
  return (
    <section >
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {open && <BookmarksPopover ref={popOverRef}/>}
    </section>
  );
}
