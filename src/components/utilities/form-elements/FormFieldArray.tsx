import React from "react";

interface Props {
  fields: any;
  onClick?: () => void;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const FormFieldArray: React.FC<Props> = ({ fields }: any) => {
  if (fields.length === 0) return;
  else
    return (
      <>
        {fields.map((field: any, index: number) => {
          return (
            <>
              {field.type === "button" ? (
                <div key={index} className="flex-1">
                  <label
                    htmlFor="features"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {field.label}
                  </label>
                  <button className="w-6 h-6" onClick={(e) => console.log(e)}>
                    Add Feature
                  </button>
                </div>
              ) : (
                <div key={index} className="flex-1">
                  <label
                    htmlFor="features"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {field.label}
                  </label>

                  <input
                    id={index.toString()}
                    type={field.type}
                    name="features"
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    value={field.values}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={field.placeholder}
                  />
                </div>
              )}
            </>
          );
        })}
      </>
    );
};

export default FormFieldArray;
