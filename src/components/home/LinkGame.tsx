import { Link } from 'react-router-dom';
import type { LinkElems } from '../../types/home-types';

const LinkGame = ({ name, to } : LinkElems) => {
    return (
        <Link to={to}
            className='bg-gradient-to-br from-blue-900 to-blue-900 
                    border border-blue-400 
                    text-white shadow-[0_0_25px_rgba(0,170,255,0.5)] 
                    w-3/4 md:w-1/2 lg:w-1/3 p-12 
                    rounded-2xl select-none cursor-pointer 
                    transition-all duration-200 ease-out
                    hover:scale-102 hover:shadow-[0_0_35px_rgba(0,170,255,0.9)]'>
            <h2 className="text-center text-white bg-clip-text 
                        text-5xl font-extrabold tracking-wide">
                {name}
            </h2>
        </Link>
    );
};

export default LinkGame;