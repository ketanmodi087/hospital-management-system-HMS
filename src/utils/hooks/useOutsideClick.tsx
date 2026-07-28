import { useEffect } from "react";

function useOutsideClick(ref: React.RefObject<HTMLElement>, cb: () => void): void {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, cb]);
}

export default useOutsideClick;
