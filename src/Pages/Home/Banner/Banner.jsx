import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/01.jpg';
import img2 from '../../../assets/images/02.jpg';
import img3 from '../../../assets/images/03.jpg';
import img4 from '../../../assets/images/04.jpg';
import img5 from '../../../assets/images/05.jpg';


const Banner = () => {
  return (
    <div className="carousel w-full h-[400px] md:h-[700px] mt-4 mb-16">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={img1} className="w-full rounded-xl object-cover"/>
        <div className="absolute flex rounded-xl items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className='text-white pl-8 md:pl-16 pr-4 md:pr-0 space-y-7 w-full md:w-1/2 items-center'>
                <h2 className='text-3xl md:text-6xl font-bold'>Embark on Your Insight Journey with Survey Quest</h2>
                <p className='pr-1'>
                Discover the power of feedback with SurveyQuest. Seamlessly create and analyze surveys to understand opinions, preferences, and experiences.
                </p>
                <div>
                    <Link to="/surveys-page">
                    <button 
                    className='btn bg-green-600 hover:bg-green-700 text-white mr-5 border-none'>
                    Explore More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 md:bottom-0">
          <a href="#slide4" className="btn btn-circle mr-5 bg-opacity-65 border-none">❮</a>
          <a href="#slide2" className="btn btn-circle bg-green-600 hover:bg-green-700 border-none text-white">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
      <img src={img2} className="w-full rounded-xl object-cover"/>
      <div className="absolute flex rounded-xl items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className='text-white pr-4 md:pr-0 pl-8 md:pl-16 space-y-7 w-full md:w-1/2'>
                <h2 className='text-4xl md:text-6xl font-bold'>Embark on Your Insight Journey with Survey Quest</h2>
                <p>
                Discover the power of feedback with SurveyQuest. Seamlessly create and analyze surveys to understand opinions, preferences, and experiences.
                </p>
                <div>
                    <Link to="/surveys-page">
                    <button 
                    className='btn bg-green-600 hover:bg-green-700 text-white mr-5 border-none'>
                    Explore More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 md:bottom-0">
        <a href="#slide1" className="btn btn-circle mr-5 bg-opacity-65 border-none">❮</a>
        <a href="#slide3" className="btn btn-circle bg-green-600 hover:bg-green-700 border-none text-white">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
      <img src={img3} className="w-full rounded-xl object-cover"/>
      <div className="absolute flex rounded-xl items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className='text-white pr-4 md:pr-0 pl-8 md:pl-16 space-y-7 w-full md:w-1/2'>
                <h2 className='text-4xl md:text-6xl font-bold'>Embark on Your Insight Journey with Survey Quest</h2>
                <p>
                Discover the power of feedback with SurveyQuest. Seamlessly create and analyze surveys to understand opinions, preferences, and experiences.
                </p>
                <div>
                    <Link to="/surveys-page">
                    <button 
                    className='btn bg-green-600 hover:bg-green-700 text-white mr-5 border-none'>
                    Explore More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 md:bottom-0">
        <a href="#slide2" className="btn btn-circle mr-5 bg-opacity-65 border-none">❮</a>
        <a href="#slide4" className="btn btn-circle bg-green-600 hover:bg-green-700 border-none text-white">❯</a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
      <img src={img4} className="w-full rounded-xl object-cover"/>
      <div className="absolute flex rounded-xl items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className='text-white pr-4 md:pr-0 pl-8 md:pl-16 space-y-7 w-full md:w-1/2'>
                <h2 className='text-4xl md:text-6xl font-bold'>Embark on Your Insight Journey with Survey Quest</h2>
                <p>
                Discover the power of feedback with SurveyQuest. Seamlessly create and analyze surveys to understand opinions, preferences, and experiences.
                </p>
                <div>
                    <Link to="/surveys-page">
                    <button 
                    className='btn bg-green-600 hover:bg-green-700 text-white mr-5 border-none'>
                    Explore More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 md:bottom-0">
        <a href="#slide3" className="btn btn-circle mr-5 bg-opacity-65 border-none">❮</a>
        <a href="#slide5" className="btn btn-circle bg-green-600 hover:bg-green-700 border-none text-white">❯</a>
        </div>
      </div>
      <div id="slide5" className="carousel-item relative w-full">
      <img src={img5} className="w-full rounded-xl object-cover"/>
      <div className="absolute flex rounded-xl items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className='text-white pr-4 md:pr-0 pl-8 md:pl-16 space-y-7 w-full md:w-1/2'>
                <h2 className='text-4xl md:text-6xl font-bold'>Embark on Your Insight Journey with Survey Quest</h2>
                <p>
                Discover the power of feedback with SurveyQuest. Seamlessly create and analyze surveys to understand opinions, preferences, and experiences.
                </p>
                <div>
                    <Link to="/surveys-page">
                    <button 
                    className='btn bg-green-600 hover:bg-green-700 text-white mr-5 border-none'>
                    Explore More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 md:bottom-0">
        <a href="#slide4" className="btn btn-circle mr-5 bg-opacity-65 border-none">❮</a>
        <a href="#slide6" className="btn btn-circle bg-green-600 hover:bg-green-700 border-none text-white">❯</a>
        </div>
      </div>
      <div id="slide6" className="carousel-item relative w-full">
      <img src={img5} className="w-full rounded-xl object-cover"/>
      <div className="absolute flex rounded-xl items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className='text-white pr-4 md:pr-0 pl-8 md:pl-16 space-y-7 w-full md:w-1/2'>
                <h2 className='text-4xl md:text-6xl font-bold'>Embark on Your Insight Journey with Survey Quest</h2>
                <p>
                Discover the power of feedback with SurveyQuest. Seamlessly create and analyze surveys to understand opinions, preferences, and experiences.
                </p>
                <div>
                    <Link to="/surveys-page">
                    <button 
                    className='btn bg-green-600 hover:bg-green-700 text-white mr-5 border-none'>
                    Explore More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-5 md:bottom-0">
        <a href="#slide5" className="btn btn-circle mr-5 bg-opacity-65 border-none">❮</a>
        <a href="#slide1" className="btn btn-circle bg-green-600 hover:bg-green-700 border-none text-white">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
