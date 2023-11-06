// const FeatureRow = ({
//   id,
//   feature,
//   tooltip,
//   onChangeFeature,
//   onChangeTooltip,
//   onBlurFeature,
//   onBlurTooltip,
//   onFeatureRemove,
// }: any) => {
//   return (
//     <li className="w-full flex gap-2">
//       <input
//         id={`feature-${id}`}
//         type="text"
//         value={feature}
//         onChange={(e) => onChangeFeature(e.target.value)}
//         placeholder="Feature"
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//       />
//       <input
//         id={`tooltip-${id}`}
//         type="text"
//         value={tooltip}
//         onChange={(e) => onChangeTooltip(e.target.value)}
//         placeholder="Tooltip"
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//       />
//       <button
//         type="button"
//         className="w-8 h-8 bg-gray-600 rounded-lg px-4 py-2 grid place-content-center"
//         onClick={() => {
//           onFeatureRemove(id);
//         }}
//       >
//         X
//       </button>
//     </li>
//   );
// };

// export default FeatureRow;
