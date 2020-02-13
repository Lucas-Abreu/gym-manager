const fs = require('fs');

const data = require('../data.json');

const { date } = require('../utils')

exports.show = function(req, res)
{
    const { id } = req.params
    
    const foundMember = data.members.find(function(member)
    {
        return member.id == id
    })

    if (!foundMember)
    {
        res.send('Member not found!')
    }

    let blood = ''

    switch(foundMember.blood)
    {
        case 'A1':
            blood = 'A+'
            break;

        case 'A0':
            blood = 'A-'
            break;

        case 'B1':
            blood = 'B+'
            break;

        case 'B0':
            blood = 'B-'
            break;

        case 'AB1':
            blood = 'AB+'
            break;

        case 'AB0':
            blood = 'AB-'
            break;

        case 'O1':
            blood = 'O+'
            break;

        case 'O0':
            blood = 'O-'
            break;
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: blood
    }

    return res.render('members/show', { member })
}

exports.post = function(req, res)
{
    
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


    birth = Date.parse(birth)

    let id = 1
    const lastMember = data.members[data.members.lenght - 1]
     
    if(lastMember)
    {
        id = lastMember.id + 1
    }
    
    data.members.push
    ({
        id,
        avatar_url,
        birth,
        name,
        gender,
        email,
        blood,
        weight,
        height
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err)
    {
        if (err) return res.send("Write file error")

        return res.redirect('/members')
    })
}

exports.edit = function(req, res)
{
    const { id } = req.params
    
    const foundMember = data.members.find(function(member)
    {
        return member.id == id
    })

    if (!foundMember)
    {
        res.send('Member not found!')
    }

    const member =
    {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

exports.put = function(req, res)
{
    const { id } = req.body
    let index = 0
    
    const foundMember = data.members.find(function(member, foundIndex)
    {
        if (id == member.id)
        {
            index = foundIndex
            return true
        }
    })

    if (!foundMember)
    {
        res.send('Member not found!')
    }

    const member = 
    {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), function(err)
    {
        if (err) return res.send('Write error!')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res)
{
    const { id } = req.body
    
    const filteredMembers = data.members.filter(function(member)
    {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), function(err)
    {
        if (err) res.send('Write error!')

        return res.redirect('/members')
    })
}

exports.index = function(req, res)
{

    let members = []

    for (member of data.members)
    {

        const newMember = {
            ...member
        }

        members.push(newMember)
    }

    return res.render('members/index', { members })
}

exports.create = function(req, res)
{
    return res.render('members/create')
}