import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <h2 className="font-bold text-sm mb-2">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
