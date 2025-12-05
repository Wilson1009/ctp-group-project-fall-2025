import { useState, useEffect } from "react";
import ProfileFrame from "../assets/ProfileFrame.png";
import Temp from "../assets/Temp.png";
import Reviews from "./Reviews";
import data from "../../public/data.json";
import BannerRed from "../assets/BannerRed.png";
import CoursesTaughtComponent from "./CoursesTaughtComponent";

function SearchResults() {
  //Temp data
  const professorName = "Dr. John Smith";
  const distinctCourseNames = new Set();

  data.forEach((user) => {
    user.reviews.forEach((review) => {
      if (review.professorName === professorName) {
        distinctCourseNames.add(review.courseName);
      }
    });
  });

  const professorReviews = data.flatMap((user) =>
    user.reviews.filter((review) => review.professorName === professorName)
  );

  // 2. Calculate Totals
  let totalRatingsCount = professorReviews.length;
  let totalStarSum = 0;

  professorReviews.forEach((review) => {
    totalStarSum += review.rating;
  });

  // 3. Calculate Average
  const averageStarRating =
    totalRatingsCount > 0
      ? (totalStarSum / totalRatingsCount).toFixed(1) // ToFixed(1) keeps one decimal place
      : 0;

  // TEMPORARY
  // Just use to put a random image into the professor profile area
  const [tempImg, setTempImg] = useState(null); // Initialize with null/empty object instead of ""
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const randomId = Math.floor(Math.random() * 151) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        return res.json();
      })
      .then((data) => {
        setTempImg(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        // You could also set an error state here, e.g., setError(true)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Runs once on mount

  console.log(tempImg);

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
                // If tempImg has data, use the Pokémon sprite;
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
              {data.map((user, uIndex) =>
                user.reviews.map((review, rIndex) => (
                  <Reviews
                    key={`${uIndex}-${rIndex}`} // Use uIndex (user index) and rIndex (review index) for a unique key
                    name={user.name}
                    courseName={review.courseName}
                    date={review.date}
                    professorName={review.professorName}
                    comment={review.comment}
                  />
                ))
              )}
            </div>
          </div>
        </div>
    </>
  );
}

export default SearchResults;
