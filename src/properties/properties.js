const db = require('../db')

exports.getTools = async (req, res) => {
    try {
        const tool = 1;
        const { rows } = await db.query('SELECT id, name, state, amortisation, age FROM properties WHERE role = $1', [tool]);

        const tools = rows.map(tool => {
            if (tool.amortisation < 10) {
                tool.state = 'Új';
            } else if (tool.amortisation >= 10 && tool.amortisation < 20) {
                tool.state = 'Kitűnően működik'
            } else if (tool.amortisation >= 20 && tool.amortisation < 30) {
                tool.state = 'Jól működik'
            } else if (tool.amortisation >= 30 && tool.amortisation < 40) {
                tool.state = 'Megfelelően működik'
            } else if (tool.amortisation >= 40 && tool.amortisation < 50) {
                tool.state = 'Működőképes'
            } else if (tool.amortisation >= 50 && tool.amortisation < 60) {
                tool.state = 'Nem ajánlott a használata'
            } else if (tool.amortisation >= 60 && tool.amortisation < 70) {
                tool.state = 'Nem biztonságos';
            }else {
                tool.state = 'Veszélyes'
            }
            return tool
        })
        

        return res.status(200).json({
            success: true,
            tools: tools
        })

    } catch (error) {
        console.log(error.message);
    }
}

exports.getEquipments = async (req, res) => {
    try {
        const equipment = 2;
        const { rows } = await db.query('SELECT id, name, state, amortisation, age FROM properties WHERE role = $1', [equipment]);

        const equipments = rows.map(equipment => {
            if (equipment.amortisation < 10) {
                equipment.state = 'Új';
            } else if (equipment.amortisation >= 10 && equipment.amortisation < 20) {
                equipment.state = 'Kitűnően működik'
            } else if (equipment.amortisation >= 20 && equipment.amortisation < 30) {
                equipment.state = 'Jól működik'
            } else if (equipment.amortisation >= 30 && equipment.amortisation < 40) {
                equipment.state = 'Megfelelően működik'
            } else if (equipment.amortisation >= 40 && equipment.amortisation < 50) {
                equipment.state = 'Működőképes'
            } else if (equipment.amortisation >= 50 && equipment.amortisation < 60) {
                equipment.state = 'Nem ajánlott a használata'
            } else if (equipment.amortisation >= 60 && equipment.amortisation < 70) {
                equipment.state = 'Nem biztonságos';
            }else {
                equipment.state = 'Veszélyes'
            }
            return equipment
        })
        

        return res.status(200).json({
            success: true,
            equipments: equipments
        });

    } catch (error) {
        console.log(error.message);
    }
}

exports.getVehicles = async (req, res) => {
    try {
        const vehicle = 3;
        const { rows } = await db.query('SELECT id, name, state, amortisation, age FROM properties WHERE role = $1', [vehicle]);

        const vehicles = rows.map(vehicle => {
            if (vehicle.amortisation < 10) {
                vehicle.state = 'Új';
            } else if (vehicle.amortisation >= 10 && vehicle.amortisation < 20) {
                vehicle.state = 'Kitűnően működik'
            } else if (vehicle.amortisation >= 20 && vehicle.amortisation < 30) {
                vehicle.state = 'Jól működik'
            } else if (vehicle.amortisation >= 30 && vehicle.amortisation < 40) {
                vehicle.state = 'Megfelelően működik'
            } else if (vehicle.amortisation >= 40 && vehicle.amortisation < 50) {
                vehicle.state = 'Működőképes'
            } else if (vehicle.amortisation >= 50 && vehicle.amortisation < 60) {
                vehicle.state = 'Nem ajánlott a használata'
            } else if (vehicle.amortisation >= 60 && vehicle.amortisation < 70) {
                vehicle.state = 'Nem biztonságos';
            }else {
                vehicle.state = 'Veszélyes'
            }
            return vehicle
        })
        

        return res.status(200).json({
            success: true,
            vehicles: vehicles
        });

    } catch (error) {
        console.log(error.message);
    }
}

exports.editAmortisation = async (req, res) => {
    const { Id, amortisation } = req.body
    try {

        await db.query('update properties set amortisation = $1 WHERE id = $2;', [amortisation, Id])
        
        return res.status(201).json({
            success: true,
            message: 'Amortizáció értéke módosítva'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteProperties = async (req, res) => {
    const {Id} = req.params
    try {
    
        await db.query('delete from properties where id = $1', [Id])
    
        return res.status(201).json({
            success: true,
            message: 'Eltávolítva'
        })
    
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}