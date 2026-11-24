
const Letter = require("../models/Letter")
const { analyzeLetter } = require("../services/aiService")


// Rejects with Error("timeout") if the promise takes longer than ms
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);

module.exports = {
  dashboard: async (req, res) => {
    try {
      const letterPill = req.query.filter || "all";
      const owner = {user_id:req.user._id} // only i have to see my letter 
      const letterQuery = letterPill === "urgent" ? {...owner,  urgency: "urgent" } : {...owner};
      const [letters, comingUp, urgentCount] = await Promise.all([
        Letter.find(letterQuery).sort({ urgency: -1 }),
        Letter.find({
          ...owner,
          deadline: { $ne: null },
          urgency: { $in: ["urgent", "soon"] },
        })
          .sort({ deadline: 1 })
          .limit(3),
        Letter.countDocuments({ ...owner, urgency: "urgent" }),
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

  uploadLetter: async (req, res) => {
    try {
      // 1. Check there is a file
      if (!req.file) return res.status(400).json({ error: "no-file" });

      // 2. Read and check the language
      const lang = ["en", "am", "es"].includes(req.body.lang) ? req.body.lang : "en";

      // 3. Send the file to aiService (with a time limit)
      const data = await withTimeout(analyzeLetter(req.file, lang));

      // 4. Check Gemini said it's a real letter
      if (!data.readable || !data.summary || !data.steps?.length) {
        return res.status(422).json({ error: "unreadable" });
      }

      // Shape the result to match the Letter model and save it
      await Letter.create({
        ...data,
        user_id: req.user._id, // sets logged in user Id
        title: req.body.name?.trim() || data.title,
        deadline: data.deadline ? new Date(data.deadline) : null,
        language: lang,
      });

      // 7. Tell the browser it worked (it redirects to /dashboard)
      return res.json({ ok: true });
    } catch (err) {
      // 8. Log the real error, send a safe one
      console.error("Upload failed:", err);
      if (err.message === "timeout") return res.status(504).json({ error: "timeout" });
      return res.status(500).json({ error: "failed" });
    }
  },
};
