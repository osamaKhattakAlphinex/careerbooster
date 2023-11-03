import React, { useEffect, useState } from "react";

const FeatureRow = ({
  row,
  id,
  handleChange,
  onRemove,
}: {
  row: any;
  id: number;
  handleChange: (rec: any, id: number) => void;
  onRemove: (id: number) => void;
}) => {
  const [rec, setRec] = useState(row);

  console.log(rec);

  useEffect(() => {
    handleChange(rec, id);
  }, [rec]);

  return (
    <li className="w-full flex gap-2">
      <input
        type="text"
        value={rec.feature}
        onChange={(e) => setRec({ ...rec, feature: e.target.value })}
        placeholder="Feature"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <input
        type="text"
        value={rec.tooltip}
        onChange={(e) => setRec({ ...rec, tooltip: e.target.value })}
        placeholder="Tooltip"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <button
        className="w-8 h-8 bg-gray-600 rounded-lg px-4 py-2"
        onClick={() => onRemove(id)}
      >
        X
      </button>
    </li>
  );
};

export default FeatureRow;
