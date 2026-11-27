
const Letter = require("../models/Letter")
const { analyzeLetter } = require("../services/aiService")


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
      //  Check there is a file
      if (!req.file) return res.status(400).json({ error: "no-file" });

      //  Read and check the language
      const lang = ["en", "am", "es"].includes(req.body.lang) ? req.body.lang : "en";

      //  Send the file to gemini
      const data = await analyzeLetter(req.file, lang)

      // Check if it's a real letter
      if (!data.readable || !data.summary || !data.steps?.length) {
        return res.status(422).json({ error: "unreadable" });
      }

      // Shape the result to match the Letter model and save it
      const letter = await Letter.create({
        ...data,
        user_id: req.user._id, // sets logged in user Id
        title: req.body.name?.trim() || data.title,
        deadline: data.deadline ? new Date(data.deadline) : null,
        language: lang,
      });

       return res.redirect(`/letters/${letter.id}`);
    } catch (err) {
      // 8. Log the real error, send a safe one
      console.error("Upload failed:", err);
      if (err.message === "timeout") return res.status(504).json({ error: "timeout" });
      return res.status(500).render(
        "uploadLetter" , {
          error: "Something went wrong while reading your letter. Please try again.",

        });
    }
  },
};
