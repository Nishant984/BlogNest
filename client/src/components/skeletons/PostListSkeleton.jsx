import React from 'react';

const PostListSkeleton = ({ count = 3 }) => {
    return (
        <div className="space-y-6">
            {[...Array(count)].map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-lg animate-pulse bg-[var(--secondary4)] shadow-md"
                >
                    {/* Image/Thumbnail Skeleton */}
                    <div className="w-full sm:h-52 md:w-1/3 md:h-48 bg-[var(--secondary5)] rounded-lg" />

                    {/* Text Skeleton */}
                    <div className="flex-1 space-y-3 sm:space-y-4">
                        <div className="h-6 sm:h-7 md:h-8 bg-[var(--secondary5)] rounded-md w-3/4" />
                        <div className="h-3 sm:h-4 bg-[var(--secondary5)] rounded-md w-full" />
                        <div className="h-3 sm:h-4 bg-[var(--secondary5)] rounded-md w-11/12" />
                        <div className="h-3 sm:h-4 bg-[var(--secondary5)] rounded-md w-5/6" />
                        <div className="h-3 sm:h-4 bg-[var(--secondary5)] rounded-md w-1/4" />

                        {/* Author Info Skeleton */}
                        <div className="flex items-center gap-2 mt-2 sm:mt-4">
                            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[var(--secondary5)]" />
                            <div className="h-3 sm:h-4 bg-[var(--secondary5)] rounded-md w-1/3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostListSkeleton;
