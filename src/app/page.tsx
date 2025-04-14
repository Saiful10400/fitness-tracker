
import ConsumedFoods from '@/component/ConsumedFoods';

import React from 'react';

const Home = ({ searchParams }: { searchParams: { date: string } }) => {


    return (
        <div>
            <ConsumedFoods params={searchParams.date as string} />
        </div>
    );
};

export default Home;