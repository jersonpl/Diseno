import dgram from 'dgram';
import dbConnections from './db.Connections';
import express from 'express';
var router = express.Router();
var server = dgram.createSocket('udp4');
const app = express();
export{refresh};


server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    var mes = msg.toString();
    var con = dbConnections();
    var sql = "INSERT INTO `syrus` (`ID`, `Fecha`, `Latitud`, `Longitud`) VALUES ?;";
    console.log(mes.substring(1, 4));
    if (mes.substring(1, 4) == "REV") {
        var semanas = mes.substring(6, 10);
        var semana = parseInt(semanas);
        var dia = mes.substring(10, 11);
        var dian = parseInt(dia);
        var hora = mes.substring(11, 16);
        var horan = parseInt(hora);
        var semanan = (semana * 604800 + horan + 315964800 + dian * 86400 - 18000) * 1000;
        var todo = new Date(semanan).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var latitud = mes.substring(17, 19) + "." + mes.substring(19, 24);
        var longitud = mes.substring(24, 25) + mes.substring(26, 28) + "." + mes.substring(28, 33);
        console.log("Fecha: ", todo, "latitud: ", latitud, "longitud: ", longitud);
    }
    var values = [['NULL', todo, latitud, longitud]];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

server.bind(45826);

//>REV442039316285+0000000-0748686700014612;ID=357042062915567<
var refresh = function () {
    var con = dbConnections();
    con.query('SELECT * FROM syrus order by ID desc limit 1', [], function (err, result) {
        var datos = result;       
    })
}

//module.exports = router;
