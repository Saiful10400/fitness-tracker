export interface FoodItem {
    _id: string;
    name: string;
    quantity: string;
    calories: string;
}

export interface tFood {
    _id: string;
    foods: FoodItem[];
    totalCalories: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

import axios from 'axios';
const ConsumedFoods = async ({ params }: { params: string }) => {

 


    const res = await axios.get(`https://mcq-test-server.vercel.app/api/fitness/food?date=${params}`)

    const data: tFood[] = res.data.data


    function formatDateAndTime(dateString: string) {
        const date = new Date(dateString);

        const optionsDate: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };



        // Custom time formatting
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours === 0 ? 12 : hours; // Convert "0" to "12"

        const formattedTime = `${hours}:${minutes} ${ampm}`;

        const formattedDate = date.toLocaleDateString(undefined, optionsDate); // e.g., "April 14, 2025"


        return {
            date: formattedDate,
            time: formattedTime,
        };
    }
    function getTodayDateFormatted(): string {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }

    return (
        <div>


            <div>
                <h1 className='text-xl font-semibold mb-5'>Todays meals ({data[0] ? formatDateAndTime(data[0]?.createdAt).date : getTodayDateFormatted()})</h1>
                <div className='grid grid-cols-1 gap-7'>
                    {
                        data?.map((item: tFood) => <div className='border-b p-1 rounded-md' key={item._id}>
                            <h1>Time: {formatDateAndTime(item.createdAt).time}</h1>


                            <table className="min-w-full border border-gray-300 mb-4">
                                <thead className="bg-gray-500">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Food</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Calories</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {item.foods.map((item) => {
                                        return <tr key={item._id}>
                                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.calories}</td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>


                            <h1><span className='text-amber-600 font-semibold mb-3'>Total calories:</span> <span>{item.totalCalories}</span></h1>
                            <h1><span className='text-red-300 font-semibold'>Note:</span> <span className='font-light text-sm'>{item.note}</span></h1>
                        </div>)
                    }
                </div>
            </div>


        </div>
    );
};

export default ConsumedFoods;