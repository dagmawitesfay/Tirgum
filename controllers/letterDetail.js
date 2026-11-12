const mongoose = require("mongoose")
const Letter = require("../models/Letter")

module.exports = {
    getLetterDetail : async (req,res)=>{
        try{
            // // ignore things like /favicon.ico that aren't real letter ids
            // if (!mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404)

            const letterDetail = await Letter.findById(req.params.id)
            if (!letterDetail) return res.sendStatus(404)

            res.render("detailPage.ejs", {detail:letterDetail})
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
}
