import React, { useState } from "react";
import newsData from "../data/news.json"; // Assuming this is the JSON file with the news data
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const truncateDescription = (description: string, maxWords: number = 10): string => {
  const words = description.split(" ");
  if (words.length <= maxWords) {
    return description;
  }
  return `${words.slice(0, maxWords).join(" ")}...`;
};
const truncatetitle = (title: string, maxWords: number = 4): string => {
    const words = title.split(" ");
    if (words.length <= maxWords) {
      return title;
    }
    return `${words.slice(0, maxWords).join(" ")}...`;
  };

const NewsListGossip = () => {
  const { t } = useTranslation();

  // Extract the most recent news (assuming the data is sorted by the publishedAt date)
  const mostRecentNews = newsData[0];
  const restOfNews = newsData.slice(1);

  // State to manage the number of visible news items
  const [visibleItems, setVisibleItems] = useState(2);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the "View More" button click
  const handleViewMore = () => {
    navigate("/news");
  };

  return (
    <div className="container flex md:flex-row flex-col justify-center items-center md:items-start w-full">
    

      <div className="w-full  h-full  bg-white ">
        {/* The rest of the news */}
        {restOfNews.slice(0, visibleItems).map((newsItem, index) => (
          <div key={index} className="bg-transparent shadow-lg rounded-lg p-1 mb-1">
            <div className="flex flex-col md:flex-row">
              <div className="w-24 h-24">
                <img
                  src={newsItem.urlToImage}
                  alt={newsItem.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <h2 className="text-xs font-bold mb-2">{truncatetitle(newsItem.title)}</h2>
                <p className="text-xs text-gray-600 mb-4">{truncateDescription(newsItem.description)}</p>
                <div className="text-gray-500 mb-1 text-xs">
                  <strong>{t('source')}:</strong>{newsItem.source.name}
                </div>
                <div className="text-gray-500 text-xs">
                  <strong>{t('publishedAt')}:</strong>{new Date(newsItem.publishedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        
      
      </div>
    </div>
  );
};

export default NewsListGossip;
