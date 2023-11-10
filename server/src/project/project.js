const db = require('../db')

//employee
exports.getProjectEmployee = async (req, res) => {  
    try {
        const employeeEmail = req.user.email;

        const { rows } = await db.query('SELECT id,employee_email,title,progress,date,deadline FROM projects WHERE employee_email = $1', [employeeEmail]);

        return res.status(200).json({
            success: true,
            employees: rows
        });
    } catch (error) {
        console.log(error.message)
    }
}

exports.editProgressProjects = async (req,res) => {
    const { projectId, progress } = req.body
    try {
        
        await db.query('UPDATE projects SET progress = $1 WHERE id = $2;', [progress, projectId])

        return res.status(201).json({
            success: true,
            message: 'Előrehaladás módosítva'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

//management
exports.getProjectManager = async (req, res) => {  
    try {
        const managerRel = req.user.id;

        const { rows } = await db.query('SELECT id,employee_email,title,progress,date,deadline FROM projects WHERE manager_relation = $1', [managerRel]);

        return res.status(200).json({
            success: true,
            project: rows
        });
    } catch (error) {
        console.log(error.message)
    }
}

exports.createProjects = async (req,res) => {
    const manRelation = req.user.id
    const {employee_email, title, progress, date, deadline} = req.body
    try {

        await db.query('insert into projects (employee_email, title, progress, date, deadline, manager_relation) values ($1, $2, $3, $4, $5, $6)', [employee_email, title, progress, date, deadline, manRelation])

        return res.status(201).json({
            success: true,
            message: 'Projekt létrehozva és elküldve az alkalmazottnak'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}


exports.editProjects = async (req,res) => {
    const { projectId, employee_email, title, progress, date, deadline } = req.body
    try {

        await db.query('update projects set employee_email = $1, title = $2, progress = $3, date = $4, deadline = $5 WHERE id = $6;', [employee_email, title, progress, date, deadline, projectId])
        
        return res.status(201).json({
            success: true,
            message: 'Projekt szerkesztve'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}


exports.deleteProjects = async (req,res) => {
    const {projectId} = req.params
    try {

        await db.query('delete from projects where id = $1', [projectId])

        return res.status(201).json({
            success: true,
            message: 'Projekt törölve'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}