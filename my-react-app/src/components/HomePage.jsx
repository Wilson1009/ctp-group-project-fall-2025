import BannerRed from '../assets/BannerRed.png';

function HomePage() {
    return (
        <>
        <div className='relative text-center'>
            <img className='flex justify-center align-middle mt-25 m-auto h-100'
                src={BannerRed} alt="User Banner" />
            <div className="w-full absolute bottom-55 left-0 text-center mt-10 bg-transparent">
                <h1 className="bg-transparent text-5xl">Hello User</h1>
            </div>
        </div>

        <div className='text-center mt-25 space-x-10'>
          <button className='bg-[rgb(188,138,82)] text-black p-2 rounded-lg'>Student Login</button>
          <button className='bg-[rgb(157,98,70)] text-white p-2 rounded-lg'>Professor Login</button>
        </div>
        
        </>
    )
}

export default HomePage
