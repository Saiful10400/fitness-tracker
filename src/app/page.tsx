import ConsumedFoods from '@/component/ConsumedFoods';
interface PageProps {
    searchParams: Promise<{ date: string | string[] | undefined }>
}

const Home = async ({ searchParams }: PageProps) => {
    function getTodayDateFormatted(): string {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }
    const queryDate = await searchParams

    return (
        <div>
            <ConsumedFoods params={(typeof (queryDate?.date) === "string" && queryDate) ? queryDate.date : getTodayDateFormatted()} />

        </div>
    );
};

export default Home;