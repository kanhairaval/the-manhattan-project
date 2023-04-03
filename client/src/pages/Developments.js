import React from 'react';
import '../components/css/development.css';
import {developments} from '../utils/developmentsdata.js';

function Developments() {
    return (
        <div className="development-container">
        <div className="development-header">
            <h1 className="m-5">Future Developments</h1>
        </div>
        {developments.map((developments) => (   
                    <div key={developments.id} className='md:w-1/3 lg:w-1/2 p-2 shadow-xl rounded'>
                        <div className='bg-gray-400 p-2 m-2 shadow-lg rounded'>
                            <h3 className='text-xl text-black font-bold m-5'>{developments.title}</h3>
                            <p className='text-black'>{developments.content}</p>
                        </div>
                    </div>
                    ))}
        </div>
    );
}

export default Developments;
