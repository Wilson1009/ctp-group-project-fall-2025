import BannerRed from '../assets/BannerRed.png';

function HomePage() {
    return (
        <>
        <div className='relative text-center'>
            <img className='flex justify-center align-middle mt-25 m-auto h-40'
                src={BannerRed} alt="User Banner" />
            <div className="w-full absolute bottom-16 left-0 text-center mt-10 bg-transparent">
                <h1 className="bg-transparent text-5xl">Hello User</h1>
            </div>
        </div>

        <div className='text-center mt-10'>
            <h2 className='text-3xl mb-5'>Welcome to your dashboard</h2>
            <p className='text-lg text-gray-600'>Here you can manage your profile, view your activities, and customize your settings.</p>
        </div>
        
        </>
    )
}

export default HomePage
