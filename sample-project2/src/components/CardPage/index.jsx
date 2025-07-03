// CardPage.jsx D:\Projects\Sample Project\sample-project2\src\components\MediaCard\index.jsx
import React from "react";
import MediaCard from "../MediaCard";

export default function CardPage({ card }) {
  return (
    <MediaCard
      title={card.title}
      description={card.description}
      image={card.image}
    />
  );
}
