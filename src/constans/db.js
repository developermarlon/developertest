export default {
    host: process.env.NODE_ENV === 'production' ?  '' : 'localhost',
    database: process.env.NODE_ENV === 'production' ?  '' : 'example-crud',
    port: process.env.NODE_ENV === 'production' ?  '' : 3306,
    user: process.env.NODE_ENV === 'production' ?  '' : 'root',
    dialect: process.env.NODE_ENV === 'production' ?  '' : 'mysql',
    password: process.env.NODE_ENV === 'production' ?  '' : '',
}