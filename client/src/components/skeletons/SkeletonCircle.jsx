const SkeletonCircle = ({ size = '24px', className = '' }) => {
  return (
    <div
      className={`bg-[var(--secondary5)] animate-pulse rounded-full ${className}`}
      style={{ width: size, height: size }}
    ></div>
  );
};

export default SkeletonCircle;