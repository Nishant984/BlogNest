import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { parseISO, format, startOfWeek, endOfWeek, eachWeekOfInterval } from "date-fns";

export const getUserAnalytics = async (req, res, next) => {
    try {
        const { userId, startDate, endDate } = req.query;

        console.log("Analytics Request Received:", { userId, startDate, endDate });

        if (!userId || !startDate || !endDate) {
            console.warn("Missing required query parameters for analytics.");
            return res.status(400).json({ message: "User ID, start date, and end date are required." });
        }

        const filterStartDate = parseISO(startDate);
        const filterEndDate = parseISO(endDate);

        if (isNaN(filterStartDate.getTime()) || isNaN(filterEndDate.getTime())) {
            console.warn("Invalid date format:", { startDate, endDate });
            return res.status(400).json({ message: "Invalid date format for startDate or endDate." });
        }

        let userObjectId;
        try {
            userObjectId = new mongoose.Types.ObjectId(userId);
        } catch (error) {
            console.error("Invalid userId format:", userId, error);
            return res.status(400).json({ message: "Invalid user ID format." });
        }

        // Post Daily Counts for Heatmap 
        const postDailyCounts = await Post.aggregate([
            {
                $match: {
                    user: userObjectId,
                    createdAt: { $gte: filterStartDate, $lte: filterEndDate },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }
        ]);

        const dailyCountsMap = new Map();
        postDailyCounts.forEach(item => {
            dailyCountsMap.set(item._id, (dailyCountsMap.get(item._id) || 0) + item.count);
        });

        const calendarData = Array.from(dailyCountsMap.entries()).map(([date, count]) => ({
            date,
            count,
        }));

        // Calculate Total Comments RECEIVED on user's posts 
        const userPostsForComments = await Post.find(
            {
                user: userObjectId,
                createdAt: { $gte: filterStartDate, $lte: filterEndDate },
            },
            { _id: 1 }
        ).lean();

        const postIdsArray = userPostsForComments.map(post => post._id);

        let totalCommentsReceivedOnMyPosts = 0;
        if (postIdsArray.length > 0) {
            totalCommentsReceivedOnMyPosts = await Comment.countDocuments({
                post: { $in: postIdsArray },
                createdAt: { $gte: filterStartDate, $lte: filterEndDate },
            });
        } else {
            console.log("No posts found for the user in the selected date range, so 0 comments received.");
        }


        // Weekly Stats Aggregations 
        const [postStats, commentStats, shareStats] = await Promise.all([
            Post.aggregate([
                {
                    $match: {
                        user: userObjectId,
                        createdAt: { $gte: filterStartDate, $lte: filterEndDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $isoWeekYear: "$createdAt" },
                            week: { $isoWeek: "$createdAt" },
                        },
                        posts: { $sum: 1 },
                        views: { $sum: "$visit" },
                    },
                },
            ]),
            // Comments by Week (RECEIVED on user's posts) - ADJUSTED HERE
            Comment.aggregate([
                {
                    $match: {
                        post: { $in: postIdsArray },
                        createdAt: { $gte: filterStartDate, $lte: filterEndDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $isoWeekYear: "$createdAt" },
                            week: { $isoWeek: "$createdAt" },
                        },
                        comments: { $sum: 1 },
                    },
                },
            ]),
            // Shares by Week (for user's posts)
            Post.aggregate([
                {
                    $match: {
                        user: userObjectId,
                        shares: { $exists: true, $ne: null, $not: { $size: 0 } },
                    },
                },
                { $unwind: "$shares" },
                {
                    $match: {
                        "shares.sharedAt": {
                            $gte: filterStartDate,
                            $lte: filterEndDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $isoWeekYear: "$shares.sharedAt" },
                            week: { $isoWeek: "$shares.sharedAt" },
                        },
                        shares: { $sum: 1 },
                    },
                },
            ]),
        ]);

        // Merge Weekly Stats
        const weeklyMap = new Map();

        postStats.forEach(({ _id, posts, views }) => {
            const weekKey = `${_id.year}-W${String(_id.week).padStart(2, '0')}`;
            weeklyMap.set(weekKey, { week: weekKey, posts, views, comments: 0, shares: 0 });
        });

        commentStats.forEach(({ _id, comments }) => {
            const weekKey = `${_id.year}-W${String(_id.week).padStart(2, '0')}`;
            const existing = weeklyMap.get(weekKey);
            if (existing) {
                existing.comments = comments;
            } else {
                weeklyMap.set(weekKey, { week: weekKey, posts: 0, views: 0, comments, shares: 0 });
            }
        });

        shareStats.forEach(({ _id, shares }) => {
            const weekKey = `${_id.year}-W${String(_id.week).padStart(2, '0')}`;
            const existing = weeklyMap.get(weekKey);
            if (existing) {
                existing.shares = shares;
            } else {
                weeklyMap.set(weekKey, { week: weekKey, posts: 0, views: 0, comments: 0, shares });
            }
        });

        const weeklyStats = Array.from(weeklyMap.values()).sort((a, b) =>
            a.week.localeCompare(b.week)
        );

        // Total Counts within the specified date range
        const totalPosts = await Post.countDocuments({
            user: userObjectId,
            createdAt: { $gte: filterStartDate, $lte: filterEndDate },
        });

        const [viewsAgg] = await Post.aggregate([
            {
                $match: {
                    user: userObjectId,
                    createdAt: { $gte: filterStartDate, $lte: filterEndDate },
                },
            },
            { $group: { _id: null, views: { $sum: "$visit" } } },
            { $limit: 1 }
        ]);
        const totalViews = viewsAgg?.views || 0;

        const [sharesAgg] = await Post.aggregate([
            {
                $match: {
                    user: userObjectId,
                    shares: { $exists: true, $ne: null, $not: { $size: 0 } },
                },
            },
            { $unwind: "$shares" },
            {
                $match: {
                    "shares.sharedAt": {
                        $gte: filterStartDate,
                        $lte: filterEndDate,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                },
            },
            { $limit: 1 }
        ]);
        const totalShares = sharesAgg?.total || 0;

        return res.json({
            totalPosts,
            totalComments: totalCommentsReceivedOnMyPosts,
            totalViews,
            totalShares,
            calendarData,
            weeklyStats,
        });
    } catch (err) {
        console.error("Analytics error:", err);
        next(err);
    }
};