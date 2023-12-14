"use client"

import {toast, ToastContainer} from "react-toastify";

const Toast = ({success}) => {
  if (success)
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });

  return <ToastContainer />
}

export default Toast