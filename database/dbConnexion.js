const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '5D1G01E04',
        password: 'nearme4',
        database: '5D1G01E04',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
