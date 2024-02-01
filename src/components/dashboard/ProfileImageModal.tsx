/* eslint-disable react/display-name */
"use client";
import {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import Cropper from "react-easy-crop";
type ModalProps = {
  setImage: any;
  image: any;
};

const ProfileImageModal = forwardRef(
  ({ setImage, image }: ModalProps, ref: any) => {
    const [openProfileImgModal, setOpenProfileImgModal] =
      useState<boolean>(false);

    const openModal = (open: boolean) => {
      setOpenProfileImgModal(open);
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
      console.log(croppedArea, "1", croppedAreaPixels);
      getCroppedImg(image, croppedAreaPixels);
    };
    const saveProfileImaage = () => {
      setOpenProfileImgModal(false);
    };
    return (
      <div
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          openProfileImgModal ? "flex" : "hidden"
        }`}
      >
        <div className="rounded relative p-8 w-full max-w-xl max-h-full shadow-md dark:bg-gray-800 bg-gray-300">
          {/* <div className="relative p-4 text-center rounded-lg shadow sm:p-5"> */}
          <h1 className="text-xl font-bold dark:text-white text-center text-gray-950">
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

          <div className="relative h-96 m-2">
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

          <div className="flex justify-between items-center">
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
            <button onClick={saveProfileImaage}>Save</button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProfileImageModal;

const createImage = (url: any) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: any) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width: any, height: any, rotation: any) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

const getCroppedImg = async (
  imageSrc: any,
  pixelCrop = { x: 0, y: 0, width: 0, height: 0 },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file: any) => {
      resolve({ file, url: URL.createObjectURL(file) });
    }, "image/jpeg");
  });
};
