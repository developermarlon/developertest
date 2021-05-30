import { Sequelize } from 'sequelize'
import db from '../constans/db'

const sequelize = new Sequelize(
    db.database,
    db.user,
    db.password,
    { 
        host: db.host,
        dialect: db.dialect,
        port: db.port, 
        timezone: 'America/Bogota',
        dialectOptions: {
            timezone: 'local'
        },
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)

sequelize.sync({force: false}) 

export default sequelize