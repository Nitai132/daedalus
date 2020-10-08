const CREATE_LEAD_QUERY = 'insert into daedalus1 (first_name, last_name, email, phone, attorney) values (?,?,?,?,?)';


const createLead = async ({first_name, last_name, email, phone, attorney}) => await global.mysqlConnection.execute(CREATE_LEAD_QUERY, [first_name, last_name, email, phone, attorney]);


module.exports = {createLead};