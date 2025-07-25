import React from 'react';

const SinglePostPageSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6 p-4 md:p-8">
            <div className="h-6 bg-[var(--secondary5)] rounded-md w-1/4 mb-4"></div>

            <div className="h-10 bg-[var(--secondary5)] rounded-lg w-3/4 mb-4"></div>
            <div className="h-10 bg-[var(--secondary5)] rounded-lg w-1/2 mb-8"></div>

            <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-[var(--secondary5)]"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[var(--secondary5)] rounded-md w-1/3"></div>
                    <div className="h-4 bg-[var(--secondary5)]rounded-md w-1/4"></div>
                </div>
            </div>

            <div className="h-80 bg-[var(--secondary5)] rounded-lg w-full mb-8"></div>

            <div className="space-y-4">
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-full"></div>
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-11/12"></div>
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-full"></div>
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-5/6"></div>
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-full"></div>
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-3/4"></div>
            </div>

            <div className="h-8 bg-[var(--secondary5)] rounded-md w-2/3 mt-12 mb-4"></div>
            <div className="space-y-4">
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-full"></div>
                <div className="h-6 bg-[var(--secondary5)] rounded-md w-full"></div>
            </div>

            <div className="h-8 bg-[var(--secondary5)] rounded-md w-1/4 mt-16 mb-4"></div>
            <div className="h-24 bg-[var(--secondary5)] rounded-lg w-full"></div>
            <div className="h-16 bg-[var(--secondary5)] rounded-lg w-full mt-4"></div>
        </div>
    );
};

export default SinglePostPageSkeleton;