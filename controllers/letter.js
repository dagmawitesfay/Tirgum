
const Letter = require("../models/Letter")

module.exports = {
  dashboard: async (req, res) => {
    try {
      const letterPill = req.query.filter || "all";
      const letterQuery = letterPill === "urgent" ? { urgency: "urgent" } : {};
      const [letters, comingUp, urgentCount] = await Promise.all([
        Letter.find(letterQuery).sort({ urgency: -1 }),
        Letter.find({
          deadline: { $ne: null },
          urgency: { $in: ["urgent", "soon"] },
        })
          .sort({ deadline: 1 })
          .limit(3),
        Letter.countDocuments({ urgency: "urgent" }),
      ]);

      return res.render("dashboard", {
        letters,
        comingUp,
        urgentCount,
        letterPill,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      return res.status(500).send("Unable to load the dashboard.");
    }
  },
};
