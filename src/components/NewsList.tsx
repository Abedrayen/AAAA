import React, { useEffect, useState } from "react";
import newsData from "../data/news.json"; // Assuming this is the JSON file with the news data
import { Navigate, useNavigate } from "react-router-dom";
import { getNews } from "../API/API";
import { useTranslation } from "react-i18next";

// const truncateDescription = (description: string, maxWords: number = 5): string => {
//   const words = description.split(" ");
//   if (words.length <= maxWords) {
//     return description;
//   }
//   return `${words.slice(0, maxWords).join(" ")}...`;
// };
const truncateDescription = (
  description: string,
  maxChars: number = 80
): string => {
  if (description.length <= maxChars) {
    return description;
  }
  return `${description.slice(0, maxChars)}...`;
};

const truncatetitle = (title: string, maxWords: number = 4): string => {
  const words = title.split(" ");
  if (words.length <= maxWords) {
    return title;
  }
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const NewsList = () => {
  // Extract the most recent news (assuming the data is sorted by the publishedAt date)
  // const mostRecentNews = newsData[0];
  // const restOfNews = newsData.slice(1);
  const { t } = useTranslation();

  const [mostRecentNews, setMostRecentNews] = useState<any>(null);
  const [restOfNews, setRestOfNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // State to manage the number of visible news items
  const [visibleItems, setVisibleItems] = useState(2);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the "View More" button click
  const handleViewMore = () => {
    navigate("/news");
  };

  useEffect(() => {
    const getStands = async () => {
      setIsLoading(true);

      const res = await getNews();
      setIsLoading(false);

      const newsGot = res.news.filter(
        (ar: any) => ar.newsFirstImage && ar.newsTeaser != "[Removed]"
      );
      console.log("res news", newsGot);
      const mostrecent = newsGot[0];
      const resOfNews = newsGot.slice(1);
      console.log("most rec", mostrecent);
      setMostRecentNews(newsGot[0]);
      setRestOfNews(resOfNews);
    };
    getStands();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex md:flex-row flex-col  gap-3 sm:px-0 px-36 justify-center items-center md:items-start w-full">
      {/* Most recent news with distinct styling */}
      {mostRecentNews && (
        <div className="bg-white shadow-lg rounded-lg  w-full  sm:w-1/2  overflow-hidden h-full xl:h-96">
          <div className="flex flex-col justify-center items-center ">
            <div className="w-44 h-44 py-2 px-4">
          <img
                src={mostRecentNews.newsFirstImage}
                alt={mostRecentNews.newsTeaser}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="w-full mt-4 p-6 pb-20 h-full bg-[#056A4C] bg-opacity-65">
              <h1 className="text-sm font-bold mb-2 text-white">
                {truncatetitle(mostRecentNews.newsTeaser)}
              </h1>
              <p className="text-gray-200 mb-4">
                {truncateDescription(mostRecentNews.newsHeadline)}
              </p>
            
            </div>
          </div>
        </div>
      )}

      <div className="w-full sm:w-1/2 h-full xl:h-96 flex flex-col bg-white pb-2">
        {/* The rest of the news */}
        {restOfNews.slice(0, visibleItems).map((newsItem, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-2 mb-1"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full h-32  md:w-1/2">
                <img
                  src={newsItem.newsFirstImage}
                  alt={newsItem.newsTeaser}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <h2 className="text-xs font-bold mb-2">
                  {truncatetitle(newsItem.newsTeaser)}
                </h2>
                <p className="text-xs text-gray-600 mb-4">
                  {truncateDescription(newsItem.newsHeadline)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center">
        <button
          onClick={handleViewMore}
          className="mt-6 px-4 py-2 bg-[#4c9a82] text-white rounded-lg"
        >
          {t('showMore')}
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default NewsList;
