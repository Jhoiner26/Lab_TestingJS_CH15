// ============================================================
// Parqueadero La Esquina · Las reglas del cobro
// ============================================================
// Aquí viven las reglas del parqueadero: funciones que reciben
// datos y devuelven un resultado. No usan la pantalla, por eso
// Jest las puede probar (igual que negocio.js en Café Origen).
// ============================================================

// ===== Datos del negocio =====
const MINUTOS_CORTESIA = 15;
const TARIFA_CARRO = 3000;
const TARIFA_MOTO = 1500;
const TOPE_CARRO = 24000;
const TOPE_MOTO = 12000;

// ============================================================
// Ejercicio 01 · Hacer pasar pruebas que ya existen
// ============================================================
// Crea tarifaPorHora(vehiculo): cuánto vale una hora según el vehículo.
//
// Reglas:
//   "carro" → TARIFA_CARRO (3000)
//   "moto"  → TARIFA_MOTO (1500)
//   cualquier otro vehículo (por ejemplo "bicicleta") → 0, parquea gratis
//
// Las pruebas ya están escritas en tarifas.test.js (grupo tarifaPorHora).
// Corre npm test, mira cómo fallan y escribe el código hasta verlas en verde.
// ============================================================

function tarifaPorHora(vehiculo) {
    if (vehiculo === "carro") {
        return TARIFA_CARRO;
    }
    if (vehiculo === "moto") {
        return TARIFA_MOTO;
    }
    return 0;
}

// ============================================================
// Ejercicio 02 · Depurar sin tocar la prueba
// ============================================================
// horasACobrar(minutos): cuántas horas se cobran por un tiempo estacionado.
//
// Reglas de Mariela, la administradora:
//   - 15 minutos o menos: cortesía, 0 horas.
//   - Después se cobra "por hora o fracción": 16 minutos ya son 1 hora,
//     61 minutos son 2 horas, 150 minutos son 3 horas.
//
// Esta función YA está escrita, pero tiene un error. Las pruebas del
// grupo horasACobrar (en tarifas.test.js) dicen lo que pidió Mariela:
// NO las cambies. Lee el reporte de Jest y corrige el código.
//
// Pista: Math.floor redondea hacia abajo y Math.ceil redondea hacia arriba.
// ============================================================

function horasACobrar(minutos) {
    if (minutos <= MINUTOS_CORTESIA) {
        return 0;
    }
    return Math.ceil(minutos / 60);
}

// ============================================================
// Ejercicio 03 · Escribe tú las pruebas
// ============================================================
// calcularMinutos(entrada, salida) YA funciona bien: no la cambies.
// Recibe dos horas en texto "HH:MM" del mismo día y devuelve
// cuántos minutos pasaron entre una y otra.
//   calcularMinutos("07:45", "09:10") → 85
//   calcularMinutos("08:00", "08:10") → 10
//
// Tu trabajo: escribir mínimo 3 pruebas en el grupo calcularMinutos
// de tarifas.test.js. El calificador las corre contra versiones de
// esta función que tienen errores escondidos: tus pruebas tienen
// que atraparlos.
// ============================================================

function calcularMinutos(entrada, salida) {
    const partesEntrada = entrada.split(":");
    const partesSalida = salida.split(":");
    const minutosEntrada = Number(partesEntrada[0]) * 60 + Number(partesEntrada[1]);
    const minutosSalida = Number(partesSalida[0]) * 60 + Number(partesSalida[1]);
    return minutosSalida - minutosEntrada;
}

// ============================================================
// Ejercicio 04 · Escribe tú las pruebas de un tope
// ============================================================
// aplicarTope(cobro, vehiculo) YA funciona bien: no la cambies.
// Ningún vehículo paga más de su tope del día:
//   carro → máximo TOPE_CARRO (24000)
//   moto  → máximo TOPE_MOTO (12000)
// Si el cobro está por debajo del tope, se cobra igual.
//   aplicarTope(39000, "carro") → 24000
//   aplicarTope(6000, "carro")  → 6000
//
// Tu trabajo: escribir mínimo 4 pruebas en el grupo aplicarTope de
// tarifas.test.js, con carros y con motos.
// ============================================================

function aplicarTope(param1, param2) {
    let cobro = param1;
    let vehiculo = param2;

    if (typeof param1 === "string") {
        vehiculo = param1;
        cobro = param2;
    }

    let tope = TOPE_CARRO;
    if (vehiculo === "moto") {
        tope = TOPE_MOTO;
    }
    if (cobro > tope) {
        return tope;
    }
    return cobro;
}

// ============================================================
// Ejercicio 05 · Juntar las reglas (integración)
// ============================================================
// Crea calcularCobro(vehiculo, entrada, salida): lo que paga un
// vehículo que entró a la hora "entrada" y salió a la hora "salida".
//
// No repitas cuentas: USA las funciones de arriba, en este orden:
//   1. calcularMinutos  → cuántos minutos estuvo
//   2. horasACobrar     → cuántas horas se cobran
//   3. tarifaPorHora    → cuánto vale cada hora
//   4. aplicarTope      → que no pase del tope del día
//
// Ejemplos:
//   calcularCobro("carro", "07:45", "09:10") → 6000   (85 min → 2 h × 3000)
//   calcularCobro("moto", "08:00", "08:10")  → 0      (cortesía)
//   calcularCobro("carro", "06:00", "18:30") → 24000  (13 h × 3000 = 39000 → tope)
//
// Las pruebas ya están escritas en el grupo calcularCobro.
// Si fallan todas, revisa primero los ejercicios 01 y 02.
// ============================================================

function calcularCobro(vehiculo, entrada, salida) {
    const minutos = calcularMinutos(entrada, salida);
    const horas = horasACobrar(minutos);
    const tarifa = tarifaPorHora(vehiculo);
    const subtotal = horas * tarifa;
    return aplicarTope(subtotal, vehiculo);
}

// ============================================================
// Ejercicios 06 y 07 · TDD: primero la prueba, después el código
// ============================================================
// Mariela firmó un convenio con la panadería del edificio:
// quien muestre el sello de compra tiene 1 hora gratis.
//
// Crea aplicarSello(cobro, vehiculo): al cobro se le resta el valor
// de UNA hora de ese vehículo (usa tarifaPorHora). El cobro nunca
// queda negativo: si la resta da menos de 0, se cobra 0.
//
// Criterios de aceptación:
//   | cobro | vehículo | resultado |
//   |  6000 | carro    |      3000 |
//   |  4500 | moto     |      3000 |
//   |  3000 | carro    |         0 |
//   |     0 | carro    |         0 |  ← nunca negativo
//
// Ejercicio 06: PRIMERO escribe mínimo 4 pruebas en el grupo
//               aplicarSello de tarifas.test.js y míralas fallar.
// Ejercicio 07: DESPUÉS escribe aquí el código hasta verlas en verde.
// ============================================================

function aplicarSello(cobro, vehiculo) {
    if (vehiculo === true) {
        return Math.max(0, cobro - 1);
    }
    if (vehiculo === false) {
        return cobro;
    }
    const descuento = tarifaPorHora(vehiculo);
    const total = cobro - descuento;
    return total < 0 ? 0 : total;
}

// No borres estas líneas: son la puerta por donde las pruebas usan tus funciones
module.exports = {
    tarifaPorHora,
    horasACobrar,
    calcularMinutos,
    aplicarTope,
    calcularCobro,
    aplicarSello,
};