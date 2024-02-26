import React, { useEffect } from "react";
import Swal from "sweetalert2";
type ConfirmationModalProps = {
  message: string;
  onConfirm: () => void;
};

const DeleteConfirmationModal = ({
  message,
  onConfirm,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };
  useEffect(() => {
    handleConfirm();
  }, []);

  return <></>;
};

export default DeleteConfirmationModal;
