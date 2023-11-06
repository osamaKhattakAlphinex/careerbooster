// "use client";

// import { useEffect, useState } from "react";
// import FeatureRow from "./FeatureRow";

// const FeaturesFormCard = ({
//   onChangeFeatures,
//   onChangeTooltip,
// }: {
//   onChangeFeatures: (arr: any) => void;
//   onChangeTooltip: (arr: any) => void;
// }) => {
//   const [featuresArr, setFeaturesArr] = useState([
//     {
//       feature: "",
//       tooltip: "",
//     },
//   ]);

//   const getNextId = () => {
//     if (featuresArr.length === 0) return;

//     return;
//   };

//   useEffect(() => {
//     console.log(featuresArr);
//     const features: any = [];
//     const tooltips: any = [];

//     featuresArr.forEach((row: any) => {
//       features.push(row.feature);
//       tooltips.push(row.tooltip);
//     });

//     onChangeFeatures(features);
//     onChangeTooltip(tooltips);
//   }, [featuresArr.length]);

//   return (
//     <div className="mb-4">
//       <div className="mb-4 w-ful">
//         <span className="text-xl">Features</span>
//         <div className="flex pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"></div>
//       </div>

//       <ul className="mb-2 p-0 flex flex-col gap-2">
//         {featuresArr.map((row: any, i: number) => (
//           <FeatureRow
//             row={row}
//             key={i}
//             id={row.id}
//             handleChange={(rec: any, id: number) => {
//               featuresArr.splice(id, 1, rec);
//               setFeaturesArr(featuresArr);
//               // const updatedFeaturesArr = [...featuresArr];
//               // updatedFeaturesArr[id] = rec;
//               // setFeaturesArr(updatedFeaturesArr);
//             }}
//             onRemove={(id) => {
//               console.log();
//               featuresArr.splice(i, 1);
//               setFeaturesArr(featuresArr);
//               // const updatedFeaturesArr = featuresArr.filter(
//               //   (_, index) => index !== id
//               // );
//               // setFeaturesArr(updatedFeaturesArr);
//             }}
//           />
//         ))}
//       </ul>

//       <button
//         type="button"
//         onClick={(e) => {
//           featuresArr.push({ feature: "", tooltip: "" });
//           setFeaturesArr(featuresArr);
//         }}
//       >
//         ADD
//       </button>
//     </div>
//   );
// };

// export default FeaturesFormCard;
