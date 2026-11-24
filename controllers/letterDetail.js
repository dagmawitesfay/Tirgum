const mongoose = require("mongoose")
const Letter = require("../models/Letter")

module.exports = {
    getLetterDetail : async (req,res)=>{
        try{
            if (!mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404)

            const letterDetail = await Letter.findOne({
                _id: req.params.id,
                user_id: req.user._id
            })

            // cTODO: create a error we couldnt find page
            if (!letterDetail) return res.sendStatus(404) 

            res.render("detailPage.ejs", {detail:letterDetail})
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
}
