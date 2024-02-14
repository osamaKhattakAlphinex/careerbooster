/* eslint-disable react/display-name */
"use client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import getCroppedImg from "../../helpers/cropImage";
import Cropper from "react-easy-crop";
import { useDispatch } from "react-redux";
import { setUserProfileImage } from "@/store/userDataSlice";

type ModalProps = {
  image: any;
};

const ProfileImageModal = forwardRef(({ image }: ModalProps, ref: any) => {
  const [openProfileImgModal, setOpenProfileImgModal] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const [saving, setSaving] = useState<boolean>(false);

  const openModal = (open: boolean) => {
    setOpenProfileImgModal(open);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveProfileImaage = async () => {
    setSaving(true);
    const croppedImageBase64 = await getCroppedImg(image, croppedAreaPixels);

    await fetch("/api/uploadImageUser", {
      method: "POST",
      body: JSON.stringify({
        converted: croppedImageBase64,
      }),
    });

    dispatch(setUserProfileImage(croppedImageBase64));
    setOpenProfileImgModal(false);
    setSaving(false);
    setZoom(1);
  };
  return (
    <div
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  mx-1  justify-center  items-center w-full md:inset-0 h-screen bg-black/50 max-h-full ${
        openProfileImgModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-xl max-h-full p-8 bg-gray-300 rounded shadow-md dark:bg-gray-800">
        {/* <div className="relative p-4 text-center rounded-lg shadow sm:p-5"> */}
        <h1 className="text-base font-bold text-center md:text-lg dark:text-white text-gray-950">
          Crop Your Image to Fit
        </h1>

        <button
          onClick={() => setOpenProfileImgModal(false)}
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <div className="relative m-2 h-80">
          <Cropper
            image={image}
            crop={crop}
            cropShape="round"
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e: any) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />

          <button
            disabled={saving}
            onClick={saveProfileImaage}
            className="no-underline px-[1rem] font-[500] text-[1rem] py-2 rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
          >
            {saving ? "Saving... " : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProfileImageModal;
