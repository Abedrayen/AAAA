import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNews } from "../API/API";
import { useTranslation } from "react-i18next";

// Define TypeScript types for news data
interface NewsItem {
  newsFirstImage: string;
  newsTeaser: string;
  newsHeadline: string;
  newsSource: string;
  fullNewsDate: string;
}

interface NewsResponse {
  news: NewsItem[];
}

const truncateDescription = (description: string, maxChars = 100) => {
  return description.length <= maxChars ? description : `${description.slice(0, maxChars)}...`;
};

const truncatetitle = (title: string, maxWords = 5) => {
  const words = title.split(" ");
  return words.length <= maxWords ? title : `${words.slice(0, maxWords).join(" ")}...`;
};

const NewsListFull: React.FC = () => {
  const [mostRecentNews, setMostRecentNews] = useState<NewsItem | null>(null);
  const [restOfNews, setRestOfNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<number>(12);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const res: NewsResponse = await getNews();
      setIsLoading(false);
      const newsGot = res.news.filter((ar) => ar.newsFirstImage && ar.newsTeaser !== '[Removed]');
      setMostRecentNews(newsGot[0]);
      setRestOfNews(newsGot.slice(1));
    };
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-44 pt-20 w-screen ">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-#1F5059-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-r from-[#056A4C] to-[#04503d] p-8">
      {/* Most Recent News */}
      {mostRecentNews && (
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg w-full gap-10 p-6 flex md:flex-row flex-col justify-center items-center mb-6 transition-all transform hover:scale-105 hover:shadow-2xl">
          <img
            src={mostRecentNews.newsFirstImage}
            alt={mostRecentNews.newsTeaser}
            className="xl:w-64 xl:h-64 sm:w-44 sm:h-44 object-contain rounded-md shadow-md"
          />
          <div className="mt-4 text-center md:text-left">
            <h2 className="text-xl md:text-2xl xl:text-4xl font-semibold text-[#1F5059]">{truncatetitle(mostRecentNews.newsTeaser)}</h2>
            <p className="text-gray-700 mt-2 text-sm sm:text-base xl:text-2xl">{truncateDescription(mostRecentNews.newsHeadline)}</p>
            <div className="text-gray-600 mt-2 text-base md:text-xl">
              <strong>{t('source')}:</strong> {mostRecentNews.newsSource}
            </div>
            <div className="text-gray-600">
              <strong>{t('publishedAt')}:</strong> {mostRecentNews.fullNewsDate}
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {restOfNews.slice(0, visibleItems).map((newsItem, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out transform hover:scale-105"
          >
            <img
              src={newsItem.newsFirstImage}
              alt={newsItem.newsTeaser}
              className="w-full h-40 object-contain rounded-t-md"
            />
            <div className="p-4 bg-[#056a4c80]">
              <h3 className="text-lg text-white font-semibold">{truncatetitle(newsItem.newsTeaser)}</h3>
              <p className="text-sm text-gray-100 mt-1">{truncateDescription(newsItem.newsHeadline)}</p>
              <div className="text-gray-100 mt-2 text-xs">
                <strong>{t('source')}:</strong> {newsItem.newsSource}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleItems < restOfNews.length && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => setVisibleItems(visibleItems + 12)}
            className="px-6 py-3 bg-gradient-to-r from-[#056A4C] to-[#04503d] text-white rounded-full text-xl hover:bg-gradient-to-l transition-all duration-300"
          >
            {t('showMore')}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsListFull;
