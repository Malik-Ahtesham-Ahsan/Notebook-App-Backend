const express = require("express")
const router = express.Router();
const {body,validationResult}=require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Noteschema');



//get the user data login include
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send("what some error occured");
    }

})
//add notes to the usssr id
router.post('/addnotes', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),

    body('discription', 'discription must min 5 charac').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, discription, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, discription, tag, user: req.user.id
        })
        const savenotes =await notes.save();

        res.json(savenotes)
        console.log(savenotes);
    } catch (error) {
        res.status(500).send("what some error occured");
    }

})
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const {title,discription,tag} =req.body;
    const newNote ={};
    if(title){newNote.title=title};
    if(discription){newNote.discription=discription};
    if(tag){newNote.tag=tag};

    let note =await Notes.findById(req.params.id)
    if(!note){
        return res.status(500).send("teri id sahi nhi");
    }
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("tu note upate nahi kar sakta bhai");
    }
    note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})

})

//delete note
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    const {title,discription,tag} =req.body;
    

    let note =await Notes.findById(req.params.id)
    if(!note){
        return res.status(500).send("teri id sahi nhi");
    }
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("tu note upate nahi kar sakta bhai");
    }
    note =await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"note has benn deleted",note:note})

})


module.exports = router