import React from "react";

type Props = {
  title?: string;
  list: any;
  Component: any;
};

const PreviouslyGeneratedList = ({ title, list, Component }: Props) => {
  if (!list) return;

  console.log(list);

  return (
    <div className="w-full ">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {list &&
            list.map((item: any, key: number) => {
              return <Component key={key} {...item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default PreviouslyGeneratedList;
