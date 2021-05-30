export default {
    host: process.env.NODE_ENV === 'production' ?  '162.241.61.240' : 'localhost',
    database: process.env.NODE_ENV === 'production' ?  'cattech1_developertest' : 'example-crud',
    port: process.env.NODE_ENV === 'production' ?  3306 : 3306,
    user: process.env.NODE_ENV === 'production' ?  'cattech1_developer' : 'root',
    dialect: process.env.NODE_ENV === 'production' ?  'mysql' : 'mysql',
    password: process.env.NODE_ENV === 'production' ?  'marlondeveloper' : '',
}