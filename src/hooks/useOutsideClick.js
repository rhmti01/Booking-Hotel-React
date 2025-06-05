import { useEffect } from "react";

export default function useOutsideClick({ ref, setOpenOptions , exceptionId }) {
    useEffect(() => {

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target) && e.target.id !== exceptionId ) {
        setOpenOptions();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, setOpenOptions]);
}