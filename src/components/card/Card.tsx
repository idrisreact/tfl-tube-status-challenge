interface CardProps {
  bannerColor: string;
  title: string;
  info: string;
}

export const Card = ({ bannerColor, title, info }: CardProps) => {
  const titleId = `tube-line-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const infoId = `${titleId}-status`;

  return (
    <article
      className={`border border-l-4 ${bannerColor} bg-white p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2`}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={infoId}
    >
      <h2 id={titleId} className="text-sm font-medium" aria-level={2}>
        {title}
      </h2>
      <p
        id={infoId}
        className="text-xs text-gray-600 mt-1"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">Current status: </span>
        {info}
      </p>
    </article>
  );
};
