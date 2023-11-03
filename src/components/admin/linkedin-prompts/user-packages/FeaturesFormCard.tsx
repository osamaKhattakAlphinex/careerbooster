"use client";

import { useEffect, useState } from "react";

const FeatureRow = ({
  row,
  id,
  handleChange,
  onRemove,
}: {
  row: any;
  id: number;
  handleChange: (rec: any, id: number) => void;
  onRemove: () => void;
}) => {
  const [rec, setRec] = useState(row);

  useEffect(() => {
    handleChange(rec, id);
  }, [rec, handleChange]);

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
        onClick={onRemove}
      >
        X
      </button>
    </li>
  );
};

const FeaturesFormCard = ({
  onChangeFeatures,
  onChangeTooltip,
}: {
  onChangeFeatures: (arr: any) => void;
  onChangeTooltip: (arr: any) => void;
}) => {
  const [featuresArr, setFeaturesArr] = useState([
    {
      feature: "Feature 1",
      tooltip: "Tooltip 1",
    },
    {
      feature: "Feature 2",
      tooltip: "Tooltip 2",
    },
  ]);

  useEffect(() => {
    const features: any = [];
    const tooltips: any = [];

    featuresArr.forEach((row: any) => {
      features.push(row.feature);
      tooltips.push(row.tooltip);
    });

    onChangeFeatures(features);
    onChangeTooltip(tooltips);
  }, [featuresArr]);

  return (
    <div className="mb-4">
      <div className="mb-4 w-ful">
        <span className="text-xl">Features</span>
        <div className="flex pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"></div>
      </div>

      <ul className="mb-2 p-0 flex flex-col gap-2">
        {featuresArr.map((row: any, i: number) => (
          <FeatureRow
            row={row}
            key={i}
            id={i}
            handleChange={(rec: any, id: number) => {
              featuresArr.splice(id, 1, rec);
              setFeaturesArr(featuresArr);
            }}
            onRemove={() => {
              featuresArr.splice(i, 1);
              setFeaturesArr(featuresArr);
            }}
          />
        ))}
      </ul>

      <button
        onClick={(e) => {
          featuresArr.push({ feature: "", tooltip: "" });
          setFeaturesArr(featuresArr);
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default FeaturesFormCard;
