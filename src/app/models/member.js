const db = require("../../config/db")
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM members', (err, results) => {
            if (err) throw `Database error! ${err}`;

            callback(results.rows);
        })

    },
    create(data, callback) {

        const query = `
        INSERT INTO members (
            avatar_url,
            name,
            gender,
            email,
            birth,
            blood,
            weight,
            height,
            instructor_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ];

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`; 

            callback(results.rows[0])
        });
    },
    find(id, callback) {

        db.query(`select members.*, instructors.name as instructor_name
        FROM members LEFT JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = $1`, [id], function(err, results) {
            if (err) throw `Database error! ${err}`;   

            callback(results.rows[0]);
        })
    },
    update(data, callback) {

        const query = `
        UPDATE members SET
            avatar_url = ($1),
            name = ($2),
            gender = ($3),
            email = ($4),
            birth = ($5),
            blood = ($6),
            weight = ($7),
            height = ($8),
            instructor_id = ($9)
        WHERE id = $10`;

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`;

            callback();
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error! + ${err}`;

            return callback();
        })
    },
    instructorSelectOption(callback) {
        db.query(`SELECT name, id FROM instructors`, (err, results) => {
            if (err) throw `Database error! ${err}`;

            callback(results.rows);
        })
    }
}