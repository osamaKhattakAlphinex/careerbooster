import React, { useEffect } from "react";
import Swal from "sweetalert2";
type ConfirmationModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void
};

const DeleteConfirmationModal = ({
  message,
  onConfirm,
  onCancel
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
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        // Check if the modal was dismissed by cancel action
        if (onCancel) {
          onCancel(); // Call onCancel callback
        }
      }
    });
  };
  useEffect(() => {
    handleConfirm();
  }, []);

  return <></>;
};

export default DeleteConfirmationModal;
