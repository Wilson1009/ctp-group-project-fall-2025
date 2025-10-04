import BannerRed from '../assets/BannerRed.png';

function HomePage() {
    return (
        <div className='relative text-center'>
            <img className='flex justify-center align-middle mt-25 m-auto h-40'
                src={BannerRed} alt="User Banner" />
            <div className="w-full absolute bottom-16 left-0 text-center mt-10 bg-transparent">
                <h1 className="bg-transparent text-5xl">Hello User</h1>
            </div>
        </div>
    )
}

export default HomePage
