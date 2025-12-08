import { useState, useEffect } from "react";
import ProfileFrame from "../../assets/ProfileFrame.png";
import Reviews from "./Reviews";
import BannerRed from "../../assets/BannerRed.png";
import CoursesTaughtComponent from "./CoursesTaughtComponent";

const BACKEND_API_URL = "http://localhost:3001";

// Accept 'searchedProfessor' as a prop
function SearchResults({ searchedProfessor }) {
  // State for fetched data
  const [professorReviews, setProfessorReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the prop for the display name and API lookup
  const professorName = searchedProfessor || "Professor Not Found"; 

  // START: DATA FETCHING LOGIC

  // useEffect now depends on 'searchedProfessor'
  useEffect(() => {
    // Skip fetch if the prop is empty or null
    if (!searchedProfessor) {
        setIsLoading(false);
        setError("No professor name provided for search.");
        return;
    }

    // 1. Fetching Professor Reviews from Backend
    const fetchProfessorData = async () => {
      setIsLoading(true);
      setError(null);

      // Encode the name to handle spaces/special characters in the URL
      const encodedProfessorName = encodeURIComponent(searchedProfessor);

      try {
        const response = await fetch(
          `${BACKEND_API_URL}/api/reviews?professorName=${encodedProfessorName}`
        );

        if (!response.ok) {
          // If the server returns a 404, 500, etc.
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfessorReviews(data); 

      } catch (e) {
        console.error("Error fetching professor data:", e);
        setError("Failed to load professor data. Check server status or API route.");
        setProfessorReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessorData();

    // 2. TEMPORARY POKEMON IMAGE FETCH (This remains static for now)
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => res.json())
      .then((data) => setTempImg(data))
      .catch((err) => console.error("Error fetching Pokémon:", err));
      
  }, [searchedProfessor]); // Reruns if the searchedProfessor prop changes

  // END: DATA FETCHING LOGIC 


  // State for the temporary Pokemon image
  const [tempImg, setTempImg] = useState(null);

  // START: DATA PROCESSING LOGIC

  // 1. Calculate distinct course names
  const distinctCourseNames = new Set(
    professorReviews.map(review => review.courseName)
  );

  // 2. Calculate Totals and Average
  const totalRatingsCount = professorReviews.length;
  const totalStarSum = professorReviews.reduce((sum, review) => sum + review.rating, 0);

  const averageStarRating =
    totalRatingsCount > 0
      ? (totalStarSum / totalRatingsCount).toFixed(1)
      : 0;

  // END: DATA PROCESSING LOGIC 


  // START: RENDERING LOGIC

  // Handle Loading and Error States
  if (isLoading) {
    return <div className="text-center p-8">Loading data for {professorName}...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 font-bold">{error}</div>;
  }
  
  // Display a message if no reviews are found (e.g., if the professor is valid but has no reviews)
  if (totalRatingsCount === 0) {
     return <div className="text-center p-8 text-gray-800">No reviews found for {professorName}.</div>;
  }

  return (
    <>
      <div className="bg-[rgb(141,89,29)] p-4 text-white">temp nav bar</div>

      {/* background */}
      <div className="bg-[rgb(224,202,148)] flex-col mx-auto w-[90vw] rounded-3xl h-100% pb-5 -z-50">
        {/* Information Page */}
        <div className="flex w-full h-[80vh] justify-self-end-safe items-center mx-auto mt-8">
          <div className="pl-10 w-[60vh]">
            <div className="relative flex justify-center items-center w-full h-40">
              <img
                src={BannerRed}
                alt="Banner"
                className="absolute w-full h-full object-contain mt-15 z-0"
              />
              <h1
                className="
                  mt-5
                  w-full
                  font-bold
                  text-[clamp(0.5rem,6vw,2rem)] 
                  text-center 
                  absolute 
                  top-1/2 
                  left-1/2 
                  transform 
                  -translate-x-1/2 
                  -translate-y-1/2 
                  z-10
                  max-w-full 
                  overflow-hidden 
                  whitespace-nowrap
                  "
              >
                {professorName}
              </h1>
            </div>

            {/* Centered Image */}
            <div className="relative mt-10">
              <img
                className="w-[80%] h-auto mx-auto relative z-0"
                src={tempImg ? tempImg.sprites.front_default : null}
                alt={tempImg ? `Sprite of ${tempImg.name}` : "Overlay Content"}
              />
              <img
                className="w-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src={ProfileFrame}
                alt="Profile Frame"
              />
            </div>
            <div className="p-3 flex flex-col items-center justify-center">
              <div className="text-2xl text-yellow-500">
                {"⭐".repeat(Math.floor(averageStarRating))}
                {"☆".repeat(5 - Math.floor(averageStarRating))}
              </div>

              <h3 className="text-[20px] font-bold text-gray-800">
                {averageStarRating} / 5.0
              </h3>

              <p className="text-s text-gray-600">
                Based on {totalRatingsCount} reviews
              </p>
            </div>
          </div>
          {/* Courses Taught */}

          <div className="mx-auto h-[60vh] w-[80vh]">
            <div className="border-2 border-black p-4 shadow-x h-full">
              <h3 className="font-black">Courses Taught:</h3>
              <div className="flex flex-wrap p-4 space-x-4 overflow-y-scroll h-[full]">
                {[...distinctCourseNames].map((courseName) => (
                  <div key={courseName} className="w-[calc(33.333%-1rem)] mb-4">
                    <CoursesTaughtComponent courseName={courseName} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*Reviews*/}
        <div className="w-90vh mt-10">
          <h2 className="text-[30px] font-bold p-4 ">Ratings & Reviews</h2>
          <div className="p-4">
            {/* Map over the fetched professorReviews state */}
            {professorReviews.map((review, rIndex) => (
              <Reviews
                key={rIndex}
                name={review.userName || "Anonymous"} 
                courseName={review.courseName}
                date={review.date}
                professorName={professorName} 
                comment={review.comment}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResults;