import { toast } from "react-toastify";

const notifyError = (msg: string) => {
  toast.error(msg, {
    position: "top-center",
  });
};

const notifySuccess = (msg: string) => {
  toast.success(msg, {
    position: "top-center",
  });
};

export { notifyError, notifySuccess };
