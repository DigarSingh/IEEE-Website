const User = require('../models/User');
const Event = require('../models/Event');
const Certificate = require('../models/Certificate');
const Message = require('../models/Message');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Count total members
    const totalMembers = await User.countDocuments({ role: 'student' });
    
    // Count verified members
    const verifiedMembers = await User.countDocuments({ 
      role: 'student',
      isVerified: true
    });
    
    // Count total events
    const totalEvents = await Event.countDocuments();
    
    // Count upcoming events
    const upcomingEvents = await Event.countDocuments({ 
      status: 'upcoming'
    });
    
    // Count ongoing events
    const ongoingEvents = await Event.countDocuments({
      status: 'ongoing'
    });
    
    // Count completed events
    const completedEvents = await Event.countDocuments({
      status: 'completed'
    });
    
    // Count total certificates issued
    const totalCertificates = await Certificate.countDocuments();
    
    // Count unread messages
    const unreadMessages = await Message.countDocuments({
      toAdmin: true,
      read: false
    });
    
    // Get recent members (last 5)
    const recentMembers = await User.find({ role: 'student' })
      .select('name email profilePhoto createdAt')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent events (last 5)
    const recentEvents = await Event.find()
      .select('title date status location')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get month-by-month member registrations for the current year
    const currentYear = new Date().getFullYear();
    const monthlyRegistrations = await User.aggregate([
      {
        $match: {
          role: 'student',
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Format monthly data for chart
    const monthlyData = Array(12).fill(0);
    monthlyRegistrations.forEach(item => {
      monthlyData[item._id - 1] = item.count;
    });

    res.status(200).json({
      success: true,
      stats: {
        members: {
          total: totalMembers,
          verified: verifiedMembers,
          unverified: totalMembers - verifiedMembers
        },
        events: {
          total: totalEvents,
          upcoming: upcomingEvents,
          ongoing: ongoingEvents,
          completed: completedEvents
        },
        certificates: totalCertificates,
        messages: {
          unread: unreadMessages
        },
        recentMembers,
        recentEvents,
        chartData: {
          monthlyRegistrations: monthlyData
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats',
      error: error.message
    });
  }
};
