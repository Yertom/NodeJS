const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const people = require("../.././api/peoples");

//Get memeber
router.get("/",(req,res)=>{res.json(people)});
router.get("/:id",(req,res)=>{
    const found = people.some((value)=>{
        return value.id === +req.params.id
    });

    if (found){
        res.json(people.filter((value)=>value.id === +req.params.id))
    }
    else {
        res.status(400).json({msg:`No item with id ${req.params.id}`})
    }
});

//Add member
router.post("/", (req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
    };
    if (!newMember.name){
        return res.static(400).json({msg: "Please enter a name"})
    }
    people.push(newMember);
    res.json(people)
});

//Edit member

router.post("/:id",(req, res)=>{

    const found = people.some((value)=>{
        return value.id === +req.params.id
    });

    if (found){
        const update = req.body;
        people.forEach((value, index) => {
             if (value.id === +req.params.id) {
                 value.name = update.name ? update.name : value.name;
                 res.json({msg: "Member update", people})
             }
        });
    }

    else {
        res.status(400).json({msg:`No item with id ${req.params.id}`})
    }
});

//Delete member

router.delete("/:id",(req, res)=>{

    const found = people.some((value)=>{
        return value.id === +req.params.id
    });

    if (found){
        res.json(people.filter((value)=>value.id !== +req.params.id))
    }

    else {
        res.status(400).json({msg:`No item with id ${req.params.id}`})
    }

});

module.exports = router;