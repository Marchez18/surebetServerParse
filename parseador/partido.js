class Partido {
    /*
    public competicion = "";
    public hora = "";
    public equipo1 = "";
    public equipo2 = "";
    public arraycuotas1 = [];
    public arraycuotasX = [];
    public arraycuotas2 = [];
    */

    constructor (competicion, hora, equipo1, equipo2, arraycuotas1, arraycuotasX, arraycuotas2) {
        this.competicion=competicion;
        this.hora = hora;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.arraycuotas1 = arraycuotas1;
        this.arraycuotas2 = arraycuotas2;
        this.arraycuotasX = arraycuotasX;
    }

    /*
    get hora() {
        return this.hora;
    }
    */
};
module.exports = Partido;