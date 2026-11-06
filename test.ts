// tests go here; this will not be compiled when this package is used as an extension.

// Usa cada bloque al menos una vez para que `pxt test` valide todas las firmas.

beatMundial.deshabilitarMatriz();

// Eventos
beatMundial.alPulsarBoton(BeatPuerto.Puerto0, () => {
    beatMundial.ledSimple(BeatLedAccion.Prender, BeatPuerto.Puerto1);
});
beatMundial.alTocarTactil(BeatPuerto.Puerto2, () => {
    beatMundial.ledSimple(BeatLedAccion.Apagar, BeatPuerto.Puerto1);
});
beatMundial.alDetectarObstaculo(BeatPuerto.Puerto3, () => {
    beatMundial.parar(BeatMotor.Ambos);
});
beatMundial.alDetectarUltrasonido(20, BeatPuertoUno.Puerto1, () => {
    beatMundial.mover(BeatDireccion.Atras, BeatMotor.Ambos);
});
beatMundial.alDetectarColor(BeatColorDetectado.Verde, BeatPuertoI2C.IIC, () => {
    beatMundial.tiraRgbColor(`# . # . # .`, 0x00ff00, BeatPuerto.Puerto0);
});
beatMundial.alMoverJoystick(BeatJoystickEje.EjeY, BeatPuertoUno.Puerto1, () => {
    beatMundial.servoPosicionar(180, BeatPuerto.Puerto0);
});
beatMundial.alSeguirLinea(BeatPosicionLinea.Centro, BeatPuertoUno.Puerto1, () => {
    beatMundial.moverVelocidad(BeatDireccion.Adelante, BeatMotor.Ambos, 60);
});

basic.forever(() => {
    // Entradas lógicas
    let logicas = 0;
    if (beatMundial.leerPulsador(BeatPuerto.Puerto0)) logicas++;
    if (beatMundial.leerBotonTactil(BeatPuerto.Puerto1)) logicas++;
    if (beatMundial.joystickPulsado(BeatPuertoUno.Puerto1)) logicas++;
    if (beatMundial.siguelineas(BeatPosicionLinea.Ninguna, BeatPuertoUno.Puerto1)) logicas++;
    if (beatMundial.colorDetectado(BeatColorDetectado.Rojo, BeatPuertoI2C.IIC)) logicas++;
    if (beatMundial.hayObstaculo(BeatPuerto.Puerto2)) logicas++;

    // Entradas numéricas
    const total = beatMundial.leerDistancia(BeatPuertoUno.Puerto1)
        + beatMundial.leerDHT11(BeatMagnitudDHT.Temperatura, BeatPuerto.Puerto0)
        + beatMundial.leerDHT11(BeatMagnitudDHT.Humedad, BeatPuerto.Puerto0)
        + beatMundial.leerLuz(BeatPuertoAnalog.Puerto0)
        + beatMundial.leerHumedadSuelo(BeatPuertoAnalog.Puerto1)
        + beatMundial.leerPotenciometro(BeatPuertoAnalog.Puerto0)
        + beatMundial.leerJoystick(BeatJoystickEje.EjeX, BeatPuertoUno.Puerto1)
        + beatMundial.leerNivelColor(BeatColorCanal.Azul, BeatPuertoI2C.IIC);

    // Salidas
    beatMundial.tiraRgbLed(`# # # . . .`, 255, 128, 0, BeatPuerto.Puerto0);
    beatMundial.tiraRgbApagar(BeatPuerto.Puerto0);
    beatMundial.matrizDibujar(`
        # . . . . . . #
        . # . . . . # .
        . . # . . # . .
        . . . # # . . .
        . . . # # . . .
        . . # . . # . .
        . # . . . . # .
        # . . . . . . #
        `, BeatPuertoI2C.IIC);
    beatMundial.matrizDesplazar("GOL", 100, BeatPuertoI2C.IIC);
    beatMundial.matrizBorrar(BeatPuertoI2C.IIC);
    beatMundial.lcdMostrar("Total " + total, 0, 0, BeatPuertoI2C.IIC);
    beatMundial.lcdMostrar("Logicas " + logicas, 0, 1, BeatPuertoI2C.IIC);
    beatMundial.lcdBorrar(BeatPuertoI2C.IIC);

    // Motores
    beatMundial.servoMoverGradual(0, 5, BeatPuerto.Puerto0);
    beatMundial.ventilador(BeatFanAccion.Derecha, BeatPuertoUno.Puerto1);
    beatMundial.ventilador(BeatFanAccion.Parar, BeatPuertoUno.Puerto1);

    basic.pause(100);
});

beatMundial.habilitarMatriz();
