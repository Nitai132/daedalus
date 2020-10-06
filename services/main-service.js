const CREATE_LEAD_QUERY = 'insert into daedalus1 (first_name, last_name, email, phone, attorney) values (?,?,?,?,?)';


const createLead = ({first_name, last_name, email, phone, attorney}) => global.mysqlConnection.execute(CREATE_LEAD_QUERY, [first_name, last_name, email, '0'+phone, attorney]);


module.exports = {createLead};