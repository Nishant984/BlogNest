const SkeletonText = ({
  width = "100%",
  height = "1em",
  lines = 1,
  className = "",
  style = {},
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-[var(--secondary5)] animate-pulse rounded-md ${className}`}
          style={{ width, height, ...style }}
          aria-hidden="true"
        ></div>
      ))}
    </div>
  );
};

export default SkeletonText;
