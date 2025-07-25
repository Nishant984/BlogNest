const SkeletonCircle = ({ size = "48px", className = "" }) => {
  return (
    <div
      className={`bg-[var(--secondary5)] animate-pulse rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    ></div>
  );
};

export default SkeletonCircle;
