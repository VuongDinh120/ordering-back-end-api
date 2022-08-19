module.exports = {
    user: 'sa',
    password: '123',
    server: 'DESKTOP-VO749K0\\SQLEXPRESS',
    driver:'tedious',
    port: 1433, // make sure to change port
    database: 'OrderingManagement',
    options: {
        encrypt: false // Use this if you're on Windows Azure
        ,instanceName: 'SQLEXPRESS'
    }
}