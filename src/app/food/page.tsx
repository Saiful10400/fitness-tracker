"use client";
import React, { useState } from "react";

const Food = () => {
  const [foods, setFoods] = useState<
    { food?: string; quantity?: string; index?: number }[]
  >([]);

  const inputElement = (index: number) => {
    const foodNameSetterHandle = (text: string, index: number) => {
      if (foods?.find((item) => item.index === index)) {
        const incomPleteObj = foods.find((item) => item.index === index);
        setFoods((p) => [
          ...p?.filter((item) => item.index !== index),
          { ...incomPleteObj, food: text },
        ]);
      } else {
        setFoods((p) => [...p, { index, food: text, quantity: "" }]);
      }
    };

    const quantitySetterHandle = (text: string, index: number) => {
      if (foods?.find((item) => item.index === index)) {
        const incomPleteObj = foods.find((item) => item.index === index);
        setFoods((p) => [
          ...p?.filter((item) => item.index !== index),
          { ...incomPleteObj, quantity: text },
        ]);
      } else {
        setFoods((p) => [...p, { index, food: "", quantity: text }]);
      }
    };

    return (
      <div key={index} className="flex items-center gap-3">
        <input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            foodNameSetterHandle(e.target.value, index)
          }
          type="text"
          className="rounded-sm pl-1 py-1 w-full border"
          placeholder={`Food name- ${++index}`}
        />
        <input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            quantitySetterHandle(e.target.value, index)
          }
          type="text"
          className="rounded-sm pl-1 py-1 w-full border"
          placeholder="Quantity"
        />
      </div>
    );
  };

  // page input element count.
  const [inputCount, setInputCount] = useState<number>(1);
 


const promptGeneratorHandle=()=>{
  const array = foods.map((item) => `${item.quantity} ${item.food}`);
  return(array.join(","))
}

 
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: inputCount }).map((_, index) =>
          inputElement(index)
        )}
      </div>
      <button
        onClick={() => setInputCount((p) => ++p)}
        className="bg-[#b790e4] text-gray-200 font-medium p-1 rounded-sm mb-10 mt-4"
      >
        Add Food
      </button>
      <textarea
        defaultValue={promptGeneratorHandle()}
        placeholder="Your prompt."
        className="border w-full py-1 pl-1 rounded-sm"
      ></textarea>
    </div>
  );
};

export default Food;
