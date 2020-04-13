const Member = require("../models/member")
const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {


        Member.all(function(members) {

            return res.render('members/index', { members }) 

        });
    
    }, 
    create(req, res) {

        
        Member.instructorSelectOption((instructorOptions) => {
            return res.render('members/create', { instructorOptions}) }
        )


    }, 
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys)
        {
            if (req.body[key] == "")
            {
                return res.send('Please, fill all the fields!')
            }
        }
    
        Member.create(req.body, function(member) {

            return res.redirect(`/members`)
        })

    }, 
    show(req, res) {

        Member.find(req.params.id, function(member) {
            if (!member) res.send("Member not found!")

            member.birth = date(member.birth).birthDay

            return res.render('members/show', { member })
        })

    }, 
    edit(req, res) {

        Member.find(req.params.id, function(member) {
            if (!member) res.send("Member not found!")

            member.birth = date(member.birth).iso;

            Member.instructorSelectOption((instructorOptions) => {
                return res.render('members/edit', { member, instructorOptions }) }
            )
           
        })

    }, 
    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys)
        {
            if (req.body[key] == "")
            {
                return res.send('Please, fill all the fields!')
            }
        }
    
        Member.update(req.body, () => {
            return res.redirect(`/members/${req.body.id}`)
        })

    }, 
    delete(req, res) {

        Member.delete(req.body.id, () => {
            return res.redirect(`/members`)
        })
    }
};