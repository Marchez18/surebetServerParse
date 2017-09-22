// TUTORIAL: https://www.codementor.io/johnnyb/how-to-write-a-web-scraper-in-nodejs-du108266t

//tinyreq es el modulo que realiza las peticiones HTML y descarga el contenido
//cheerio es el modulo encargado de parsear
    const request = require("tinyreq");
    const cheerio = require("cheerio");


//var fecha = 2017-09-22;
    var offcet = 30;
    var codigoGeneral;
    var arrayCompeticiones = [];  //Array de objetos competicion. En cada posicion hay un objeto competicion
    const Partido = require('./partido.js');

    request("http://www.elcomparador.com/html/contenido/mas_partidos.php?deporte=1&fecha=2017-09-22&offset=30", function (err, codigoGeneral) {
        //console.log(codigoGeneral);
        var competiciones = codigoGeneral.split("<!--EMPIEZA EL SEPARADOR-->")
        //console.log(competiciones.length); //Array con cada una de las ligas EMPIEZA EN 1

        for (i = 1; i < competiciones.length; i++) {  //Iterador asociado a cada una de las competiciones
            var pos1 = competiciones[i].indexOf("titulo_comp");
            var posi1 = pos1 + 13; //offcet de caracters
            var competicion = competiciones[i].substr(posi1).split("</span>", 1); //COMPETICION
            console.log("\n"+"COMPETICION--> " + competicion[0]);

            //Se parte el competiciones[1] en las <-Empieza la tabla del evento--> siendo cada evento un partido de la competicion con sus cuotas

            //for(j=1; j<Cantidad de eventos; j++)
            var eventos_competicion = competiciones[i].split("<!--EMPIEZA LA TABLA DEL EVENTO-->");
            //console.log(eventos_competicion[1]);

            //HORA EVENTO
            var hora_pos = eventos_competicion[1].indexOf("hora");
            var hora = eventos_competicion[1].substr(hora_pos + 6).split("</span>", 1);
            console.log("HORA-> " + hora);


            //EQUIPOS QUE LO DISPUTAN
            var equipos_competicion = eventos_competicion[1].split(" <span class=\"equipo\">");
            //console.log(equipos_competicion[2]);

            //EQUIPO 1
            var equipo1_pos = equipos_competicion[1].indexOf("alt=\"");

            //Corrección por si misteriosamente no encuentra alt
            if(equipo1_pos == -1) {
                var equipo1_pos1 = equipos_competicion[1].indexOf("></span>");
                var equipo1_aux1 = equipos_competicion[1].substr(equipo1_pos).split("\">", 2);
                var equipo1 = equipo1_aux[1].split("</span>");
                var equipo1 = equipo1[0];
            }else {

                var equipo1_aux = equipos_competicion[1].substr(equipo1_pos + 5).split("\">", 2);
                var equipo1 = equipo1_aux[1].split("</span>");
                var equipo1 = equipo1[0];
                console.log("EQUIPO 1 -->" + equipo1);
            }
            //EQUIPO 2
            var equipo2_pos = equipos_competicion[2].indexOf("alt=\"");
            //console.log(equipo2_pos);

            //Corrección por si misteriosamente no encuentra alt
            if(equipo2_pos == -1){
                var equipo2_pos1 = equipos_competicion[2].indexOf("></span>");
                var equipo2_aux1 = equipos_competicion[2].substr(equipo2_pos).split("\">", 2);
                var equipo2 = equipo2_aux[1].split("</span>");
                var equipo2 = equipo2[0];

            }else {

                var equipo2_aux = equipos_competicion[2].substr(equipo2_pos).split("\">", 2);
                var equipo2 = equipo2_aux[1].split("</span>");
                var equipo2 = equipo2[0];
                console.log("EQUIPO 2 -->" + equipo2);
            }

            //Análisis de las cuotas
            var cuotas_general = eventos_competicion[1].split("<div id=\"contenedor_cuotas\">")
            //console.log(cuotas_general[1]);

            //APUESTAS 1
            var cuot = cuotas_general[1].split("id=\"celda_cuotas\" class=\"apuesta");
            var cuot1_aux = cuot[1].split("id=\"celda_cuotas\"");
            //cada una de las filas de las cuotas (hay que iterar con esta, cuot1_aux
            var arrayCuotas1 = []; //La primera posición del array determina 1 X 2
            for (cuotasIt = 1; cuotasIt < 11; cuotasIt++) {
                var stringAnalisis = cuot1_aux[cuotasIt];

                var cuot_aux = stringAnalisis.indexOf("nofollow");
                if (cuot_aux == -1) {
                    cuota = "-";
                }
                else {
                    var cuot_aux2 = stringAnalisis.substr(cuot_aux + 10).split("</a>", 2);
                    var cuota = cuot_aux2[0];
                }
                arrayCuotas1.push(cuota);
            }
            console.log("CUOTAS 1 --> " + arrayCuotas1);


            //APUESTAS X
            var cuotX_aux = cuot[2].split("id=\"celda_cuotas\"");
            //cada una de las filas de las cuotas (hay que iterar con esta, cuot1_aux
            var arrayCuotasX = []; //La primera posición del array determina 1 X 2
            for (cuotasIt = 1; cuotasIt < 11; cuotasIt++) {
                var stringAnalisisX = cuotX_aux[cuotasIt];

                var cuot_auxX = stringAnalisisX.indexOf("nofollow");
                if (cuot_auxX == -1) {
                    cuotaX = "-";
                }
                else {
                    var cuot_aux2X = stringAnalisisX.substr(cuot_auxX + 10).split("</a>", 2);
                    var cuotaX = cuot_aux2X[0];
                }
                arrayCuotasX.push(cuotaX);
            }
            console.log("CUOTAS x --> " + arrayCuotasX);


            //APUESTAS 2
            var cuot2_aux = cuot[3].split("id=\"celda_cuotas\"");
            //cada una de las filas de las cuotas (hay que iterar con esta, cuot1_aux
            var arrayCuotas2 = []; //La primera posición del array determina 1 X 2
            for (cuotasIt = 1; cuotasIt < 11; cuotasIt++) {
                var stringAnalisis2 = cuot2_aux[cuotasIt];

                var cuot_aux2 = stringAnalisis2.indexOf("nofollow");
                if (cuot_aux2 == -1) {
                    cuota2 = "-";
                }
                else {
                    var cuot_aux22 = stringAnalisis2.substr(cuot_aux2 + 10).split("</a>", 2);
                    var cuota2 = cuot_aux22[0];
                }
                arrayCuotas2.push(cuota2);
            }
            console.log("CUOTAS 2 --> " + arrayCuotas2);

            //Generacion del objeto partido
            //LOGS TOTALES PARA VERIFICAR LA INFO

            /*
            console.log("\n"+"COMPETICION--> " + competicion[0]);
            console.log("HORA-> " + hora);
            console.log("EQUIPO 1 -->" + equipo1);
            console.log("EQUIPO 2 -->" + equipo2);
            console.log("CUOTAS 2 --> " + arrayCuotas2);
            console.log("CUOTAS X --> " + arrayCuotasX);
            console.log("CUOTAS 1 --> " + arrayCuotas1);
            */
            //let partido = new Partido(competicion[0],hora, equipo1, equipo2, arrayCuotas1, arrayCuotasX, arrayCuotas2);
        }

    });


