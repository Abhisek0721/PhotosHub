import { createContext, Dispatch, SetStateAction } from "react";

interface PhotoModalContextProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    photoDetail: any;
    setPhotoDetail: Dispatch<SetStateAction<any>>;
  }
  
  const defaultValue: PhotoModalContextProps = {
    open: false,
    // Initial empty function, it will be overridden when you provide the actual setter function
    setOpen: () => {},
    photoDetail: "",
    setPhotoDetail: () => {}
  };
  
  const PhotoModalContext = createContext(defaultValue);
  
  export default PhotoModalContext;