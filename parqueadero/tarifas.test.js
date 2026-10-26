const {
    tarifaPorHora,
    horasACobrar,
    calcularMinutos,
    aplicarTope,
    calcularCobro,
    aplicarSello,
} = require("./tarifas");

// ===== Ejercicio 01 · Estas pruebas ya están escritas: haz que pasen =====
describe("tarifaPorHora", () => {
    test("un carro paga $3.000 por hora", () => {
        expect(tarifaPorHora("carro")).toBe(3000);
    });

    test("una moto paga $1.500 por hora", () => {
        expect(tarifaPorHora("moto")).toBe(1500);
    });

    test("una bicicleta parquea gratis", () => {
        expect(tarifaPorHora("bicicleta")).toBe(0);
    });
});

// ===== Ejercicio 02 · NO cambies estas pruebas: el error está en el código =====
describe("horasACobrar", () => {
    test("10 minutos son cortesía", () => {
        expect(horasACobrar(10)).toBe(0);
    });

    test("15 minutos exactos también son cortesía", () => {
        expect(horasACobrar(15)).toBe(0);
    });

    test("16 minutos ya se cobran como 1 hora", () => {
        expect(horasACobrar(16)).toBe(1);
    });

    test("61 minutos se cobran como 2 horas", () => {
        expect(horasACobrar(61)).toBe(2);
    });

    test("150 minutos se cobran como 3 horas", () => {
        expect(horasACobrar(150)).toBe(3);
    });
});

// ===== Ejercicio 03 · Escribe tú las pruebas (mínimo 3) =====
describe("calcularMinutos", () => {
    test("calcula correctamente los minutos entre 08:00 y 09:30", () => {
        expect(calcularMinutos("08:00", "09:30")).toBe(90);
    });

    test("calcula correctamente los minutos de 14:15 a 14:50", () => {
        expect(calcularMinutos("14:15", "14:50")).toBe(35);
    });

    test("retorna 0 si la hora de entrada y salida son iguales", () => {
        expect(calcularMinutos("10:00", "10:00")).toBe(0);
    });
});

// ===== Ejercicio 04 · Escribe tú las pruebas (mínimo 4, con carros y motos) =====
describe("aplicarTope", () => {
    test("un carro que supera el tope diario paga máximo $24.000", () => {
        expect(aplicarTope("carro", 30000)).toBe(24000);
    });

    test("un carro que no supera el tope paga el valor normal", () => {
        expect(aplicarTope("carro", 15000)).toBe(15000);
    });

    test("una moto que supera el tope diario paga máximo $12.000", () => {
        expect(aplicarTope("moto", 15000)).toBe(12000);
    });

    test("una moto que no supera el tope paga el valor normal", () => {
        expect(aplicarTope("moto", 6000)).toBe(6000);
    });
});

// ===== Ejercicio 05 · Estas pruebas ya están escritas: haz que pasen =====
describe("calcularCobro", () => {
    test("un carro de 7:45 a 9:10 (85 minutos) paga $6.000", () => {
        expect(calcularCobro("carro", "07:45", "09:10")).toBe(6000);
    });

    test("una moto de 8:00 a 8:10 no paga: es cortesía", () => {
        expect(calcularCobro("moto", "08:00", "08:10")).toBe(0);
    });

    test("un carro todo el día (6:00 a 18:30) paga el tope de $24.000", () => {
        expect(calcularCobro("carro", "06:00", "18:30")).toBe(24000);
    });

    test("una moto de 7:00 a 12:20 paga $9.000", () => {
        expect(calcularCobro("moto", "07:00", "12:20")).toBe(9000);
    });
});

// ===== Ejercicio 06 · TDD: escribe PRIMERO estas pruebas (mínimo 4) =====
describe("aplicarSello", () => {
    test("descuenta 1 hora al total de horas a cobrar", () => {
        expect(aplicarSello(3, true)).toBe(2);
    });

    test("si tiene sello pero las horas a cobrar son 0, nunca queda negativo", () => {
        expect(aplicarSello(0, true)).toBe(0);
    });

    test("si no tiene sello, las horas a cobrar se mantienen iguales", () => {
        expect(aplicarSello(4, false)).toBe(4);
    });

    test("descuenta 1 hora correctamente cuando hay varias horas acumuladas", () => {
        expect(aplicarSello(5, true)).toBe(4);
    });
});