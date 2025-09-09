export const FormatViews = (views) => {
  if (!views && views !== 0) return "0";

  const num = parseInt(views);
  if (isNaN(num)) return "0";

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "bi";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "mi";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};

// Componente React para exibir visualizações formatadas
export const ViewsFormatter = ({ views, className = "" }) => {
  return <span className={className}>{FormatViews(views)}</span>;
};
