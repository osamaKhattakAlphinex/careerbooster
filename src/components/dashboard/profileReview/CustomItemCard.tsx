import DeleteConfirmationModal from '@/components/common/ConfirmationModal';
import { EditIcon, plusSimpleIcon } from '@/helpers/iconsProvider';
import React, { useState } from 'react'

const CustomItemCard = ({rec}:any) => {
  const [showMore, setShowMore] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };
  return (
    <div
      className="w-full  rounded-lg shadow-md p-6 dark:border dark:border-[#2e2f45]"
      key={rec.id}
    >
     {rec.id} 
    </div>
  );
};


export default CustomItemCard