import { Link } from 'react-router-dom';
import LinkGame from './LinkGame';

const HomePage = () => {
    return (
        <main className='flex flex-col items-center justify-center
                min-h-screen w-full p-10 gap-10
                bg-gradient-to-br from-black via-gray-900 to-black'>
            <LinkGame name='Snake' to='/snake'/>
            <LinkGame name='Minesweeper' to='/minesweeper'/>
        </main>
    );
};

export default HomePage;
