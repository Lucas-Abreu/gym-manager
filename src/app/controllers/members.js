const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        
        return res.render('members/index', { members })

    }, 
    create(req, res) {

        return res.render('members/create')

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
    
        let {
            avatar_url,
            birth,
            name,
            gender,
            email,
            blood,
            weight,
            height
        } = req.body    
    
        return;

    }, 
    show(req, res) {

        return;

    }, 

    edit(req, res) {

        return;

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
    
        let {
            avatar_url,
            birth,
            name,
            gender,
            email,
            blood,
            weight,
            height
        } = req.body    
    
        return;

    }, 
    delete(req, res) {

        return;

    }
};