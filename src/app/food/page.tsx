"use client";
 
import axios from "axios";
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

  const promptGeneratorHandle = () => {
    const array = foods.map((item) => `${item.quantity} ${item.food}`);
    return array.join(",");
  };



const[loading,setLoading]=useState(false)
const[created,setCreated]=useState(false)

  // food submit button handler.
  const foodSubmitHandler = () => {
    if (foods.length === 0) return;
setLoading(true)
setCreated(false)
    axios
      .post("https://mcq-test-server.vercel.app/api/fitness/food/create", foods)
      .then((res) => {if(res.data.statusCode===200) setLoading(false); setCreated(true)});
  };
  return (
    <div className="min-h-[80vh]">
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
      {
        loading?<span className="loading loading-spinner loading-xl mt-4"></span>: <button
        onClick={foodSubmitHandler}
        className="bg-[#b790e4] w-full text-gray-200 font-medium p-1 rounded-sm  mt-4"
      >
        Submit
      </button>
      }
     {created&&<h1 className="mt-5">Created</h1>}

{/* <Calender/> */}



    </div>
  );
};

export default Food;
