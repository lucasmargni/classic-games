import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className="min-h-screen min-w-screen bg-gray-100 p-30 flex flex-col items-center">
            <Link to="/snake" className="w-5/8 p-6 bg-white rounded-xl shadow-2xl border-4 border-blue-500 cursor-pointer text-center">
                <div className="text-blue-900 text-left pl-20">
                    <h2 className="text-4xl font-bold">
                        Snake
                    </h2>
                </div>
            </Link>

        </div>
    );
};

export default HomePage;