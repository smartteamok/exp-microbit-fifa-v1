/**
 * Bloques personalizados para FIFA Foundation
 */

enum BeatMotor {
    //% block="both"
    Ambos = 0,
    //% block="left"
    Izquierdo = 1,
    //% block="right"
    Derecho = 2
}

enum BeatDireccion {
    //% block="forward"
    Adelante = 0,
    //% block="backward"
    Atras = 1,
    //% block="left"
    Izquierda = 2,
    //% block="right"
    Derecha = 3
}

enum BeatPosicionLinea {
    //% block="left"
    Izquierda,
    //% block="center"
    Centro,
    //% block="right"
    Derecha,
    //% block="none (all black)"
    Ninguna
}

enum BeatPuerto {
    //% block="Port 0"
    Puerto0 = 0,
    //% block="Port 1"
    Puerto1 = 1,
    //% block="Port 2"
    Puerto2 = 2,
    //% block="Port 3"
    Puerto3 = 3
}

enum BeatPuertoAnalog {
    //% block="Port 0"
    Puerto0 = 0,
    //% block="Port 1"
    Puerto1 = 1
}

enum BeatPuertoUno {
    //% block="Port 1"
    Puerto1 = 1
}

enum BeatPuertoI2C {
    //% block="IIC"
    IIC = 0
}

enum BeatFanAccion {
    //% block="turn left"
    Izquierda = 0,
    //% block="turn right"
    Derecha = 1,
    //% block="stop"
    Parar = 2
}

enum BeatJoystickEje {
    //% block="X axis"
    EjeX = 0,
    //% block="Y axis"
    EjeY = 1
}

enum BeatJoystickDireccion {
    //% block="+X"
    MasX = 0,
    //% block="-X"
    MenosX = 1,
    //% block="+Y"
    MasY = 2,
    //% block="-Y"
    MenosY = 3
}

enum BeatPantallaAccion {
    //% block="disable"
    Deshabilitar = 0,
    //% block="enable"
    Habilitar = 1
}

enum BeatColorCanal {
    //% block="R"
    Rojo = 0,
    //% block="G"
    Verde = 1,
    //% block="B"
    Azul = 2
}

enum BeatColorDetectado {
    //% block="red"
    Rojo = 0,
    //% block="green"
    Verde = 1,
    //% block="blue"
    Azul = 2
}

enum BeatLedAccion {
    //% block="turn on"
    Prender = 1,
    //% block="turn off"
    Apagar = 0
}

enum BeatMagnitudDHT {
    //% block="TEMPERATURE (°C)"
    Temperatura = 0,
    //% block="HUMIDITY (％)"
    Humedad = 1
}

//% color="#ed6a22" weight=200 icon="" block="FIFA Foundation"
//% groups='["Events","Logic inputs","Numeric inputs","Outputs","Motors"]'
namespace beatMundial {

    // Colores por función:
    //   claro  #F28B3A -> eventos y entradas (sensores)
    //   medio  #D9591A -> salidas (pantallas y LEDs)
    //   oscuro #9E3E10 -> motores
    // MakeCode exige el valor literal en cada anotación //% color.
    //
    // Parámetros en los textos de bloque: usar siempre $nombre, nunca %nombre.
    // Con %nombre MakeCode empareja por POSICIÓN (el primer %x del texto recibe el
    // primer parámetro de la función), lo que mezcla entradas cuando el orden del
    // texto o de la traducción difiere de la firma, y rompe los bloques con grilla.
    // Con $nombre empareja por nombre.

    // --- GRUPO: EVENTOS ---

    /**
     * Runs the code inside when the button on the port is pressed.
     */
    //% block="on BUTTON pressed on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Events"
    //% color="#F28B3A"
    //% weight=100
    export function alPulsarBoton(puerto: BeatPuerto, handler: () => void): void {
        vigilar(() => leerPulsador(puerto), handler);
    }

    /**
     * Runs the code inside when the touch sensor on the port is touched.
     */
    //% block="on TOUCH on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Events"
    //% color="#F28B3A"
    //% weight=99
    export function alTocarTactil(puerto: BeatPuerto, handler: () => void): void {
        vigilar(() => leerBotonTactil(puerto), handler);
    }

    /**
     * Runs the code inside when the obstacle sensor detects something.
     */
    //% block="on OBSTACLE on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Events"
    //% color="#F28B3A"
    //% weight=98
    export function alDetectarObstaculo(puerto: BeatPuerto, handler: () => void): void {
        vigilar(() => hayObstaculo(puerto), handler);
    }

    /**
     * Runs the code inside when the ultrasonic sensor measures less than
     * the given distance (cm).
     */
    //% block="if DISTANCE is less than $distancia cm on $puerto"
    //% distancia.min=2 distancia.max=400 distancia.defl=20
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Events"
    //% color="#F28B3A"
    //% weight=97
    export function alDetectarUltrasonido(distancia: number, puerto: BeatPuertoUno, handler: () => void): void {
        vigilar(() => {
            const d = leerDistancia(puerto);
            return d > 0 && d < distancia;
        }, handler);
    }

    /**
     * Runs the code inside when the color sensor detects the selected color.
     */
    //% block="on COLOR $tono detected on $puerto"
    //% tono.defl=BeatColorDetectado.Rojo
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Events"
    //% color="#F28B3A"
    //% weight=96
    export function alDetectarColor(tono: BeatColorDetectado, puerto: BeatPuertoI2C, handler: () => void): void {
        vigilar(() => colorDetectado(tono, puerto), handler);
    }

    /**
     * Runs the code inside when the joystick moves in the selected direction
     * (+X, -X, +Y or -Y) away from the center.
     */
    //% block="on JOYSTICK moved $direccion on $puerto"
    //% direccion.defl=BeatJoystickDireccion.MasX
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Events"
    //% color="#F28B3A"
    //% weight=95
    export function alMoverJoystick(direccion: BeatJoystickDireccion, puerto: BeatPuertoUno, handler: () => void): void {
        vigilar(() => joystickEnDireccion(direccion, puerto), handler);
    }

    /**
     * Runs the code inside when the joystick button is pressed.
     */
    //% block="on JOYSTICK BUTTON pressed on $puerto"
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Events"
    //% color="#F28B3A"
    //% weight=94
    export function alPulsarJoystick(puerto: BeatPuertoUno, handler: () => void): void {
        vigilar(() => joystickPulsado(puerto), handler);
    }

    /**
     * Runs the code inside when the line follower reaches the selected position.
     */
    //% block="on LINE $posicion on $puerto"
    //% posicion.defl=BeatPosicionLinea.Centro
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Events"
    //% color="#F28B3A"
    //% weight=93
    export function alSeguirLinea(posicion: BeatPosicionLinea, puerto: BeatPuertoUno, handler: () => void): void {
        vigilar(() => siguelineas(posicion, puerto), handler);
    }

    // --- GRUPO: ENTRADAS LÓGICAS ---

    /**
     * Reads the state of a digital push button.
     */
    //% block="BUTTON pressed on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Logic inputs"
    //% color="#F28B3A"
    //% weight=90
    export function leerPulsador(puerto: BeatPuerto): boolean {
        return pins.digitalReadPin(getDigitalPin(puerto)) == 0;
    }

    /**
     * Reads the state of a digital touch sensor.
     */
    //% block="TOUCH detected on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Logic inputs"
    //% color="#F28B3A"
    //% weight=89
    export function leerBotonTactil(puerto: BeatPuerto): boolean {
        return pins.digitalReadPin(getDigitalPin(puerto)) == 1;
    }

    /**
     * Returns true while the joystick button is pressed.
     */
    //% block="JOYSTICK pressed on $puerto"
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Logic inputs"
    //% color="#F28B3A"
    //% weight=88
    export function joystickPulsado(puerto: BeatPuertoUno): boolean {
        pins.setPull(DigitalPin.P10, PinPullMode.PullUp);
        return pins.digitalReadPin(DigitalPin.P10) == 0;
    }

    /**
     * Checks the line position.
     * Pins: P10 left, P1 center, P2 right.
     */
    //% block="LINE $posicion on $puerto"
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Logic inputs"
    //% color="#F28B3A"
    //% weight=87
    export function siguelineas(posicion: BeatPosicionLinea, puerto: BeatPuertoUno): boolean {
        let valIzq = pins.analogReadPin(AnalogPin.P10);
        let valCen = pins.analogReadPin(AnalogPin.P1);
        let valDer = pins.analogReadPin(AnalogPin.P2);

        const UMBRAL = 30;

        switch (posicion) {
            case BeatPosicionLinea.Izquierda:
                return (valIzq <= UMBRAL && valDer > UMBRAL && valCen > UMBRAL);

            case BeatPosicionLinea.Centro:
                return (valCen <= UMBRAL && valIzq > UMBRAL && valDer > UMBRAL);

            case BeatPosicionLinea.Derecha:
                return (valDer <= UMBRAL && valIzq > UMBRAL && valCen > UMBRAL);

            case BeatPosicionLinea.Ninguna:
                return (valDer > UMBRAL && valIzq > UMBRAL && valCen > UMBRAL);
        }
        return false;
    }

    /**
     * Returns true if the dominant color matches the selection.
     */
    //% block="COLOR $tonoBuscado detected on $puerto"
    //% tonoBuscado.defl=BeatColorDetectado.Rojo
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Logic inputs"
    //% color="#F28B3A"
    //% weight=86
    export function colorDetectado(tonoBuscado: BeatColorDetectado, puerto: BeatPuertoI2C): boolean {
        const rgb = tcs34725ReadRgb();
        const r = tcs34725ToAnalog(rgb[0]);
        const g = tcs34725ToAnalog(rgb[1]);
        const b = tcs34725ToAnalog(rgb[2]);
        const min = 100;
        let detected = false;
        switch (tonoBuscado) {
            case BeatColorDetectado.Rojo:
                detected = r > min && r > g && r > b;
                break;
            case BeatColorDetectado.Verde:
                detected = g > min && g > r && g > b;
                break;
            default:
                detected = b > min && b > r && b > g;
                break;
        }
        return detected;
    }

    /**
     * Returns true when the obstacle sensor detects something.
     * The sensor outputs 0 when there is an obstacle and 1 when there is none.
     */
    //% block="OBSTACLE detected on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Logic inputs"
    //% color="#F28B3A"
    //% weight=85
    export function hayObstaculo(puerto: BeatPuerto): boolean {
        return pins.digitalReadPin(getDigitalPin(puerto)) == 0;
    }

    // --- GRUPO: ENTRADAS NUMÉRICAS ---

    /**
     * Reads the distance in cm using the ultrasonic sensor.
     * Pins: P2 trigger, P1 echo. Returns an integer of cm and 0 if
     * there is no echo.
     */
    //% block="DISTANCE (cm) on $puerto"
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=80
    export function leerDistancia(puerto: BeatPuertoUno): number {
        pins.digitalWritePin(DigitalPin.P2, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P2, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P2, 0);

        let d = pins.pulseIn(DigitalPin.P1, PulseValue.High, 25000);
        if (d == 0) return 0;

        return Math.floor(d / 58);
    }

    /**
     * Reads temperature (°C) or humidity (%) from the DHT11.
     * Returns an integer, or -1 if the reading fails.
     */
    //% block="$magnitud on $puerto"
    //% magnitud.defl=BeatMagnitudDHT.Temperatura
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=79
    export function leerDHT11(magnitud: BeatMagnitudDHT, puerto: BeatPuerto): number {
        const data = dht11Read(getDigitalPin(puerto));
        if (data.length < 5) return -1;
        return magnitud == BeatMagnitudDHT.Humedad ? data[0] : data[2];
    }

    /**
     * Reads light intensity on the selected port.
     */
    //% block="LIGHT on $puerto"
    //% puerto.defl=BeatPuertoAnalog.Puerto0
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=78
    export function leerLuz(puerto: BeatPuertoAnalog): number {
        return pins.analogReadPin(getAnalogPin(puerto));
    }

    /**
     * Reads soil moisture on the selected port.
     */
    //% block="SOIL MOISTURE on $puerto"
    //% puerto.defl=BeatPuertoAnalog.Puerto0
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=77
    export function leerHumedadSuelo(puerto: BeatPuertoAnalog): number {
        return pins.analogReadPin(getAnalogPin(puerto));
    }

    /**
     * Reads a potentiometer on the selected port.
     */
    //% block="POTENTIOMETER on $puerto"
    //% puerto.defl=BeatPuertoAnalog.Puerto0
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=76
    export function leerPotenciometro(puerto: BeatPuertoAnalog): number {
        return pins.analogReadPin(getAnalogPin(puerto));
    }

    /**
     * Reads the joystick X or Y axis on Port 1. Returns 0-1023 (center ~512).
     */
    //% block="JOYSTICK $eje on $puerto"
    //% eje.defl=BeatJoystickEje.EjeX
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=75
    export function leerJoystick(eje: BeatJoystickEje, puerto: BeatPuertoUno): number {
        if (eje == BeatJoystickEje.EjeY) return pins.analogReadPin(AnalogPin.P2);
        return pins.analogReadPin(AnalogPin.P1);
    }

    /**
     * Reads the R, G or B level from the TCS34725 color sensor.
     */
    //% block="COLOR level $canal on $puerto"
    //% canal.defl=BeatColorCanal.Rojo
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Numeric inputs"
    //% color="#F28B3A"
    //% weight=74
    export function leerNivelColor(canal: BeatColorCanal, puerto: BeatPuertoI2C): number {
        const rgb = tcs34725ReadRgb();
        switch (canal) {
            case BeatColorCanal.Rojo:
                return tcs34725ToAnalog(rgb[0]);
            case BeatColorCanal.Verde:
                return tcs34725ToAnalog(rgb[1]);
            default:
                return tcs34725ToAnalog(rgb[2]);
        }
    }

    // --- GRUPO: SALIDAS ---

    /**
     * Turns an LED connected to the given port on or off.
     * Writes a high (1) or low (0) level to the port's digital pin.
     * Warning: Port 2 uses P11 and Port 3 uses P5, shared with the
     * micro:bit's B and A buttons.
     */
    //% block="$accion LED on $puerto"
    //% accion.defl=BeatLedAccion.Prender
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=72
    export function ledSimple(accion: BeatLedAccion, puerto: BeatPuerto): void {
        pins.digitalWritePin(getDigitalPin(puerto), <number>accion);
    }

    /**
     * Sets the brightness of an LED connected to the given port (0 to 255).
     */
    //% block="set LED brightness to $brillo on $puerto"
    //% brillo.min=0 brillo.max=255 brillo.defl=255
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=71
    export function ledBrillo(brillo: number, puerto: BeatPuerto): void {
        const valor = Math.round(pins.map(clamp(brillo, 0, 255), 0, 255, 0, 1023));
        pins.analogWritePin(getPinPwm(puerto), valor);
    }

    /**
     * Shows a color on the RGB LEDs marked in the grid (LEDs 0 to 5).
     */
    //% block="show RGB COLOR $tono on $puerto"
    //% tono.shadow="colorNumberPicker"
    //% puerto.defl=BeatPuerto.Puerto0
    //% gridLiteral=1
    //% imageLiteralColumns=6
    //% imageLiteralRows=1
    //% inlineInputMode=inline
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=70
    export function tiraRgbColor(leds: string, tono: number, puerto: BeatPuerto): void {
        tiraRgbPintar(leds, tono, puerto);
    }

    /**
     * Shows an R, G, B color on the RGB LEDs marked in the grid (LEDs 0 to 5).
     */
    //% block="show RGB COLOR R $r G $g B $b on $puerto"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=0
    //% b.min=0 b.max=255 b.defl=0
    //% puerto.defl=BeatPuerto.Puerto0
    //% gridLiteral=1
    //% imageLiteralColumns=6
    //% imageLiteralRows=1
    //% inlineInputMode=inline
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=69
    export function tiraRgbLed(leds: string, r: number, g: number, b: number, puerto: BeatPuerto): void {
        const tono = (clamp(r, 0, 255) << 16) | (clamp(g, 0, 255) << 8) | clamp(b, 0, 255);
        tiraRgbPintar(leds, tono, puerto);
    }

    /**
     * Turns off all the LEDs of the RGB strip.
     */
    //% block="turn off RGB COLOR on $puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=68
    export function tiraRgbApagar(puerto: BeatPuerto): void {
        const buf = tiraRgbBuffer(puerto);
        buf.fill(0);
        tiraRgbMostrar(buf, puerto);
    }

    /**
     * Draws a pattern on the 8x8 matrix by picking the LEDs on the grid.
     */
    //% blockId=beatmundial_matriz_dibujar
    //% block="draw on MATRIX on $puerto"
    //% puerto.defl=BeatPuertoI2C.IIC
    //% gridLiteral=1
    //% imageLiteralColumns=8
    //% imageLiteralRows=8
    //% imageLiteralScale=0.8
    //% inlineInputMode=external
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=67
    export function matrizDibujar(dibujo: string, puerto: BeatPuertoI2C): void {
        matrizInit();
        const celdas = celdasMarcadas(dibujo, 64);
        const cols = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 64; i++) {
            if (celdas[i]) cols[i % 8] |= (1 << (i >> 3));
        }
        matrizDibujarVentana(cols, 0);
    }

    /**
     * Scrolls text from right to left across the 8x8 matrix.
     * Blocks execution until the scroll finishes.
     */
    //% block="scroll on MATRIX $texto on $puerto"
    //% texto.defl="abc"
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=66
    export function matrizDesplazar(texto: string, puerto: BeatPuertoI2C): void {
        matrizDesplazarTexto(texto);
    }

    /**
     * Scrolls a number from right to left across the 8x8 matrix.
     * Blocks execution until the scroll finishes.
     */
    //% block="scroll on MATRIX $numero on $puerto"
    //% numero.defl=0
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=65
    export function matrizDesplazarNumero(numero: number, puerto: BeatPuertoI2C): void {
        matrizDesplazarTexto("" + numero);
    }

    /**
     * Turns off all the LEDs on the 8x8 matrix.
     */
    //% block="clear MATRIX on $puerto"
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=64
    export function matrizBorrar(puerto: BeatPuertoI2C): void {
        matrizInit();
        for (let f = 0; f < 8; f++) matrizBuffer[f] = 0;
        matrizVolcar();
    }

    /**
     * Writes text on the LCD at position (x, y).
     */
    //% block="write on LCD $texto at x $x y $y on $puerto"
    //% texto.defl="abc"
    //% x.min=0 x.max=15 x.defl=0
    //% y.min=0 y.max=1 y.defl=0
    //% puerto.defl=BeatPuertoI2C.IIC
    //% inlineInputMode=inline
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=63
    export function lcdMostrar(texto: string, x: number, y: number, puerto: BeatPuertoI2C): void {
        lcdEnsureInit();
        lcdSetCursor(x, y);
        const limit = 16;
        for (let i = 0; i < texto.length && i < limit; i++) {
            lcdData(texto.charCodeAt(i));
        }
    }

    /**
     * Writes a number on the LCD at position (x, y).
     */
    //% block="write on LCD $numero at x $x y $y on $puerto"
    //% numero.defl=0
    //% x.min=0 x.max=15 x.defl=0
    //% y.min=0 y.max=1 y.defl=0
    //% puerto.defl=BeatPuertoI2C.IIC
    //% inlineInputMode=inline
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=62
    export function lcdMostrarNumero(numero: number, x: number, y: number, puerto: BeatPuertoI2C): void {
        lcdMostrar("" + numero, x, y, puerto);
    }

    /**
     * Clears the LCD screen.
     */
    //% block="clear LCD on $puerto"
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=61
    export function lcdBorrar(puerto: BeatPuertoI2C): void {
        lcdEnsureInit();
        lcdCommand(0x01);
        basic.pause(2);
    }

    // --- SUBCATEGORÍA "… MÁS" (advanced=true: aparece en el índice bajo FIFA Foundation) ---

    /**
     * Disables or enables the micro:bit's display (LED matrix).
     * Disable it in "on start" to avoid interference with the line follower
     * and the joystick button (P10).
     */
    //% block="$accion micro:bit DISPLAY"
    //% accion.defl=BeatPantallaAccion.Deshabilitar
    //% advanced=true
    //% group="Outputs"
    //% color="#D9591A"
    //% weight=60
    export function pantallaMicrobit(accion: BeatPantallaAccion): void {
        led.enable(accion == BeatPantallaAccion.Habilitar);
    }

    // --- GRUPO: MOTORES ---

    /**
     * Moves the robot in the given direction at medium speed (50%).
     */
    //% block="move MOTOR $motor $direccion"
    //% motor.defl=BeatMotor.Ambos
    //% group="Motors"
    //% color="#9E3E10"
    //% weight=50
    export function mover(direccion: BeatDireccion, motor: BeatMotor): void {
        moverVelocidad(direccion, motor, 50);
    }

    /**
     * Moves the robot controlling direction and speed (0 to 100).
     */
    //% block="move MOTOR $motor $direccion at speed $velocidad"
    //% motor.defl=BeatMotor.Ambos
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=100
    //% group="Motors"
    //% color="#9E3E10"
    //% weight=49
    export function moverVelocidad(direccion: BeatDireccion, motor: BeatMotor, velocidad: number): void {
        let pwm = pins.map(velocidad, 0, 100, 0, 1023);
        if (pwm < 0) pwm = 0;
        if (pwm > 1023) pwm = 1023;

        // AJUSTE DE LÓGICA (Corrección Usuario):
        // Motor Izquierdo (Bloque) -> Ahora controla P13/P14 (Físico)
        // Motor Derecho (Bloque)   -> Ahora controla P15/P16 (Físico)

        // DIRECCIONES INVERTIDAS:
        // P13 (Nuevo Izq): Antes Adelante=0 -> Ahora Adelante=1
        // P15 (Nuevo Der): Antes Adelante=1 -> Ahora Adelante=0

        let dirIzq = 0;
        let dirDer = 0;
        let pwmIzq = pwm;
        let pwmDer = pwm;

        switch (direccion) {
            case BeatDireccion.Adelante:
                dirIzq = 1; // P13 en 1 para avanzar
                dirDer = 0; // P15 en 0 para avanzar
                break;
            case BeatDireccion.Atras:
                dirIzq = 0; // P13 en 0 para retroceder
                dirDer = 1; // P15 en 1 para retroceder
                break;
            case BeatDireccion.Izquierda:
                // Giro sobre eje a la izquierda: Izq Atrás, Der Adelante
                dirIzq = 0;
                dirDer = 0;
                break;
            case BeatDireccion.Derecha:
                // Giro sobre eje a la derecha: Izq Adelante, Der Atrás
                dirIzq = 1;
                dirDer = 1;
                break;
        }

        // Aplicar lógica al MOTOR IZQUIERDO (Ahora mapeado a P13/P14)
        if (motor === BeatMotor.Ambos || motor === BeatMotor.Izquierdo) {
            pins.digitalWritePin(DigitalPin.P13, dirIzq);
            pins.analogWritePin(AnalogPin.P14, pwmIzq);
        }

        // Aplicar lógica al MOTOR DERECHO (Ahora mapeado a P15/P16)
        if (motor === BeatMotor.Ambos || motor === BeatMotor.Derecho) {
            pins.digitalWritePin(DigitalPin.P15, dirDer);
            pins.analogWritePin(AnalogPin.P16, pwmDer);
        }
    }

    /**
     * Stops the selected motors.
     */
    //% block="stop MOTOR $motor"
    //% motor.defl=BeatMotor.Ambos
    //% group="Motors"
    //% color="#9E3E10"
    //% weight=48
    export function parar(motor: BeatMotor): void {
        // Apagar Izquierdo (P14 PWM)
        if (motor === BeatMotor.Ambos || motor === BeatMotor.Izquierdo) {
            pins.analogWritePin(AnalogPin.P14, 0);
        }
        // Apagar Derecho (P16 PWM)
        if (motor === BeatMotor.Ambos || motor === BeatMotor.Derecho) {
            pins.analogWritePin(AnalogPin.P16, 0);
        }
    }

    /**
     * Moves the servo on the selected port to the given angle.
     */
    //% block="move SERVO to $grados° on $puerto"
    //% grados.min=0 grados.max=180 grados.defl=90
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Motors"
    //% color="#9E3E10"
    //% weight=47
    export function servoPosicionar(grados: number, puerto: BeatPuerto): void {
        const pin = getPinPwm(puerto);
        const clamped = clampServoAngle(grados);
        pins.servoWritePin(pin, clamped);
        servoPosiciones[puertoIndex(puerto)] = clamped;
    }

    /**
     * Moves the servo smoothly to the given angle, one degree every ms milliseconds.
     */
    //% block="move SERVO to $grados° smoothly every $ms ms on $puerto"
    //% grados.min=0 grados.max=180 grados.defl=90
    //% ms.min=1 ms.defl=10
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Motors"
    //% color="#9E3E10"
    //% weight=46
    export function servoMoverGradual(grados: number, ms: number, puerto: BeatPuerto): void {
        const pin = getPinPwm(puerto);
        const target = clampServoAngle(grados);
        const index = puertoIndex(puerto);
        let current = servoPosiciones[index];
        if (ms < 1) ms = 1;
        if (current === target) {
            pins.servoWritePin(pin, target);
            return;
        }
        const step = current < target ? 1 : -1;
        for (let pos = current; pos != target; pos += step) {
            pins.servoWritePin(pin, pos);
            basic.pause(ms);
        }
        pins.servoWritePin(pin, target);
        servoPosiciones[index] = target;
    }

    /**
     * Controls the fan. Pins: P2 and P1.
     */
    //% block="$accion FAN on $puerto"
    //% accion.defl=BeatFanAccion.Izquierda
    //% puerto.defl=BeatPuertoUno.Puerto1
    //% group="Motors"
    //% color="#9E3E10"
    //% weight=45
    export function ventilador(accion: BeatFanAccion, puerto: BeatPuertoUno): void {
        switch (accion) {
            case BeatFanAccion.Izquierda:
                pins.digitalWritePin(DigitalPin.P2, 1);
                pins.digitalWritePin(DigitalPin.P1, 0);
                break;
            case BeatFanAccion.Derecha:
                pins.digitalWritePin(DigitalPin.P2, 0);
                pins.digitalWritePin(DigitalPin.P1, 1);
                break;
            default:
                pins.digitalWritePin(DigitalPin.P2, 0);
                pins.digitalWritePin(DigitalPin.P1, 0);
                break;
        }
    }

    // --- UTILIDADES INTERNAS ---

    let lcdInicializado = false;
    const LCD_ADDR = 0x27;
    const LCD_BACKLIGHT = 0x08;
    const LCD_ENABLE = 0x04;
    const TCS34725_ADDR = 0x29;
    const TCS34725_COMMAND = 0x80;
    const TCS34725_ENABLE = 0x00;
    const TCS34725_ATIME = 0x01;
    const TCS34725_CONTROL = 0x0F;
    const TCS34725_STATUS = 0x13;
    const TCS34725_CDATAL = 0x14;
    const TCS34725_RDATAL = 0x16;
    const TCS34725_GDATAL = 0x18;
    const TCS34725_BDATAL = 0x1A;
    const TIRA_RGB_LEDS = 6;
    const TIRA_RGB_BRILLO = 128;        // 0 a 255, mismo valor por defecto que usaba neopixel
    const servoPosiciones = [90, 90, 90, 90];
    const tiraRgbBuffers: Buffer[] = [null, null, null, null];
    let tcs34725Inicializado = false;
    const HT16K33_ADDR = 0x70;
    const HT16K33_BRILLO = 15;          // 0 a 15
    const MATRIZ_ROTACION_COLUMNA = 0;  // ver nota de calibración
    let matrizInicializada = false;
    const matrizBuffer = [0, 0, 0, 0, 0, 0, 0, 0];
    const JOYSTICK_CENTRO = 512;
    const JOYSTICK_ZONA_MUERTA = 100;   // margen alrededor del centro para ignorar el temblor
    const MATRIZ_DESPLAZAR_MS = 200;    // velocidad fija del texto en movimiento (ms por columna)

    // Devuelve true si el joystick está inclinado hacia la dirección pedida, fuera
    // de la zona muerta. "+" es un valor del eje por encima del centro (~512).
    // Si en el kit "+" y "-" salen invertidos, cambiar acá el signo.
    function joystickEnDireccion(direccion: BeatJoystickDireccion, puerto: BeatPuertoUno): boolean {
        switch (direccion) {
            case BeatJoystickDireccion.MasX:
                return leerJoystick(BeatJoystickEje.EjeX, puerto) > JOYSTICK_CENTRO + JOYSTICK_ZONA_MUERTA;
            case BeatJoystickDireccion.MenosX:
                return leerJoystick(BeatJoystickEje.EjeX, puerto) < JOYSTICK_CENTRO - JOYSTICK_ZONA_MUERTA;
            case BeatJoystickDireccion.MasY:
                return leerJoystick(BeatJoystickEje.EjeY, puerto) > JOYSTICK_CENTRO + JOYSTICK_ZONA_MUERTA;
            default:
                return leerJoystick(BeatJoystickEje.EjeY, puerto) < JOYSTICK_CENTRO - JOYSTICK_ZONA_MUERTA;
        }
    }

    // --- Eventos ---
    // Un único ciclo en segundo plano revisa cada condición registrada y, cuando pasa
    // de falsa a verdadera, levanta un evento en el bus de MakeCode. Así cada handler
    // corre en su propio hilo y se encola si está ocupado, igual que los eventos nativos.

    const FUENTE_EVENTOS = 0x7A01;      // ID de fuente propio para los eventos de la extensión
    const EVENTOS_PERIODO_MS = 20;

    class Vigilante {
        leer: () => boolean;
        previo: boolean;
        valor: number;

        constructor(leer: () => boolean, valor: number) {
            this.leer = leer;
            this.previo = false;
            this.valor = valor;
        }
    }

    const vigilantes: Vigilante[] = [];
    let cicloEventosIniciado = false;

    function vigilar(leer: () => boolean, handler: () => void): void {
        // El valor 0 significa "cualquier evento" en el bus, por eso se empieza en 1.
        const valor = vigilantes.length + 1;
        vigilantes.push(new Vigilante(leer, valor));
        control.onEvent(FUENTE_EVENTOS, valor, handler);
        if (cicloEventosIniciado) return;
        cicloEventosIniciado = true;
        control.inBackground(() => {
            while (true) {
                for (let i = 0; i < vigilantes.length; i++) {
                    const v = vigilantes[i];
                    const ahora = v.leer();
                    if (ahora && !v.previo) control.raiseEvent(FUENTE_EVENTOS, v.valor);
                    v.previo = ahora;
                }
                basic.pause(EVENTOS_PERIODO_MS);
            }
        });
    }

    // --- Grillas (matriz 8x8 y tira RGB) ---

    // Recorre el texto de una grilla y devuelve qué celdas están marcadas.
    // '#' 35, '*' 42, '1' 49 marcado; '.' 46, '0' 48, '_' 95 sin marcar.
    // El resto (espacios, saltos de línea, tabulaciones) se ignora.
    function celdasMarcadas(dibujo: string, total: number): boolean[] {
        const celdas: boolean[] = [];
        for (let p = 0; p < dibujo.length && celdas.length < total; p++) {
            const c = dibujo.charCodeAt(p);
            if (c == 35 || c == 42 || c == 49) {
                celdas.push(true);
            } else if (c == 46 || c == 48 || c == 95) {
                celdas.push(false);
            }
        }
        while (celdas.length < total) celdas.push(false);
        return celdas;
    }

    function lcdEnsureInit(): void {
        if (lcdInicializado) return;
        lcdInicializado = true;
        basic.pause(50);
        lcdWrite4(0x30, 0);
        control.waitMicros(4500);
        lcdWrite4(0x30, 0);
        control.waitMicros(4500);
        lcdWrite4(0x30, 0);
        control.waitMicros(150);
        lcdWrite4(0x20, 0);
        lcdCommand(0x28); // 4-bit, 2-line
        lcdCommand(0x0C); // display on
        lcdCommand(0x06); // entry mode
        lcdCommand(0x01); // clear
        basic.pause(2);
    }

    function lcdWrite4(data: number, mode: number): void {
        const value = data | mode | LCD_BACKLIGHT;
        pins.i2cWriteNumber(LCD_ADDR, value | LCD_ENABLE, NumberFormat.Int8LE);
        control.waitMicros(1);
        pins.i2cWriteNumber(LCD_ADDR, value & ~LCD_ENABLE, NumberFormat.Int8LE);
        control.waitMicros(50);
    }

    function lcdSend(value: number, mode: number): void {
        const high = value & 0xF0;
        const low = (value << 4) & 0xF0;
        lcdWrite4(high, mode);
        lcdWrite4(low, mode);
    }

    function lcdCommand(cmd: number): void {
        lcdSend(cmd, 0);
    }

    function lcdData(data: number): void {
        lcdSend(data, 1);
    }

    function lcdSetCursor(x: number, y: number): void {
        const col = clamp(x, 0, 15);
        const row = clamp(y, 0, 1);
        const rowOffsets = [0x00, 0x40];
        lcdCommand(0x80 | (col + rowOffsets[row]));
    }

    function tcs34725Init(): void {
        if (tcs34725Inicializado) return;
        tcs34725Inicializado = true;
        tcs34725Write(TCS34725_ATIME, 0xEB); // ~50ms integration
        tcs34725Write(TCS34725_CONTROL, 0x01); // 4x gain
        tcs34725Write(TCS34725_ENABLE, 0x01); // PON
        control.waitMicros(3000);
        tcs34725Write(TCS34725_ENABLE, 0x03); // PON + AEN
        basic.pause(60);
    }

    function tcs34725Write(reg: number, value: number): void {
        const buf = pins.createBuffer(2);
        buf[0] = TCS34725_COMMAND | reg;
        buf[1] = value & 0xff;
        pins.i2cWriteBuffer(TCS34725_ADDR, buf);
    }

    function tcs34725Read8(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDR, TCS34725_COMMAND | reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDR, NumberFormat.UInt8BE);
    }

    function tcs34725Read16(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDR, TCS34725_COMMAND | reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDR, NumberFormat.UInt16LE);
    }

    function tcs34725ReadRgb(): number[] {
        tcs34725Init();
        if ((tcs34725Read8(TCS34725_STATUS) & 0x01) == 0) {
            basic.pause(5);
        }
        const r = tcs34725Read16(TCS34725_RDATAL);
        const g = tcs34725Read16(TCS34725_GDATAL);
        const b = tcs34725Read16(TCS34725_BDATAL);
        return [r, g, b];
    }

    function tcs34725ToAnalog(value: number): number {
        return clamp(Math.floor((value * 1023) / 65535), 0, 1023);
    }

    function matrizInit(): void {
        if (matrizInicializada) return;
        matrizInicializada = true;
        matrizComando(0x21);                                  // oscilador ON
        matrizComando(0x81);                                  // display ON
        matrizComando(0xE0 | clamp(HT16K33_BRILLO, 0, 15));   // brillo
        for (let f = 0; f < 8; f++) matrizBuffer[f] = 0;
        matrizVolcar();
    }

    function matrizComando(cmd: number): void {
        pins.i2cWriteNumber(HT16K33_ADDR, cmd, NumberFormat.UInt8BE);
    }

    function matrizVolcar(): void {
        const buf = pins.createBuffer(17);
        buf[0] = 0x00;
        for (let f = 0; f < 8; f++) {
            let fila = matrizBuffer[f] & 0xFF;
            if (MATRIZ_ROTACION_COLUMNA > 0) {
                const r = MATRIZ_ROTACION_COLUMNA;
                fila = ((fila << r) | (fila >> (8 - r))) & 0xFF;
            }
            buf[1 + f * 2] = fila;
            buf[2 + f * 2] = 0;
        }
        pins.i2cWriteBuffer(HT16K33_ADDR, buf);
    }

    // Desplaza un texto de derecha a izquierda por la matriz, a velocidad fija.
    function matrizDesplazarTexto(texto: string): void {
        matrizInit();
        const cols = matrizColumnasTexto(texto);
        for (let offset = -8; offset <= cols.length; offset++) {
            matrizDibujarVentana(cols, offset);
            basic.pause(MATRIZ_DESPLAZAR_MS);
        }
    }

    function matrizColumnasTexto(texto: string): number[] {
        const cols: number[] = [];
        for (let i = 0; i < texto.length; i++) {
            let c = texto.charCodeAt(i);
            if (c < 32 || c > 126) c = 32;
            const base = (c - 32) * 5;
            for (let j = 0; j < 5; j++) cols.push(MATRIZ_FUENTE[base + j]);
            cols.push(0);
        }
        return cols;
    }

    function matrizDibujarVentana(cols: number[], offset: number): void {
        for (let f = 0; f < 8; f++) matrizBuffer[f] = 0;
        for (let x = 0; x < 8; x++) {
            const idx = offset + x;
            const columna = (idx >= 0 && idx < cols.length) ? cols[idx] : 0;
            for (let y = 0; y < 8; y++) {
                if ((columna >> y) & 1) matrizBuffer[y] |= (1 << x);
            }
        }
        matrizVolcar();
    }

    const MATRIZ_FUENTE = hex`000000000000005f00000007000700147f147f14242a7f2a12231308646236495620500008070300001c2241000041221c002a1c7f1c2a08083e080800807030000808080808000060600020100804023e5149453e00427f400072494949462141494d331814127f1027454545393c4a49493141211109073649494936464949291e0000140000004034000000081422411414141414004122140802015909063e415d594e7c1211127c7f494949363e414141227f4141413e7f494949417f090909013e414151737f0808087f00417f41002040413f017f081422417f404040407f021c027f7f0408107f3e4141413e7f090909063e4151215e7f09192946264949493203017f01033f4040403f1f2040201f3f4038403f631408146303047804036159494d43007f4141410204081020004141417f04020102044040404040000307080020545478407f284444383844444428384444287f385454541800087e090218a4a49c787f0804047800447d40002040403d007f1028440000417f40007c047804787c080404783844444438fc1824241818242418fc7c08040408485454542404043f44243c4040207c1c2040201c3c4030403c44281028444c9090907c4464544c440008364100000077000000413608000201020402`;

    function tiraRgbBuffer(puerto: BeatPuerto): Buffer {
        const index = puertoIndex(puerto);
        let buf = tiraRgbBuffers[index];
        if (!buf) {
            buf = pins.createBuffer(TIRA_RGB_LEDS * 3);
            tiraRgbBuffers[index] = buf;
        }
        return buf;
    }

    // Pinta con un color 0xRRGGBB los LEDs marcados en la grilla. Los no marcados
    // conservan el color que tenían, porque el buffer de cada puerto es persistente.
    function tiraRgbPintar(leds: string, tono: number, puerto: BeatPuerto): void {
        const buf = tiraRgbBuffer(puerto);
        const marcados = celdasMarcadas(leds, TIRA_RGB_LEDS);
        for (let i = 0; i < TIRA_RGB_LEDS; i++) {
            if (marcados[i]) tiraRgbSetPixel(buf, i, tono);
        }
        tiraRgbMostrar(buf, puerto);
    }

    // Guarda un color 0xRRGGBB en el buffer, en el orden GRB que esperan los WS2812B.
    function tiraRgbSetPixel(buf: Buffer, led: number, tono: number): void {
        const r = (((tono >> 16) & 0xFF) * TIRA_RGB_BRILLO) >> 8;
        const g = (((tono >> 8) & 0xFF) * TIRA_RGB_BRILLO) >> 8;
        const b = ((tono & 0xFF) * TIRA_RGB_BRILLO) >> 8;
        buf[led * 3] = g;
        buf[led * 3 + 1] = r;
        buf[led * 3 + 2] = b;
    }

    function tiraRgbMostrar(buf: Buffer, puerto: BeatPuerto): void {
        light.sendWS2812Buffer(buf, getDigitalPin(puerto));
    }

    function getAnalogPin(puerto: BeatPuertoAnalog): AnalogPin {
        switch (puerto) {
            case BeatPuertoAnalog.Puerto0:
                return AnalogPin.P0;
            default:
                return AnalogPin.P2;
        }
    }

    function getDigitalPin(puerto: BeatPuerto): DigitalPin {
        switch (puerto) {
            case BeatPuerto.Puerto0:
                return DigitalPin.P0;
            case BeatPuerto.Puerto1:
                return DigitalPin.P2;
            case BeatPuerto.Puerto2:
                return DigitalPin.P11;
            default:
                return DigitalPin.P5;
        }
    }

    // Pin del puerto como AnalogPin, para PWM (servo y brillo del LED).
    function getPinPwm(puerto: BeatPuerto): AnalogPin {
        return <AnalogPin><number>getDigitalPin(puerto);
    }

    function puertoIndex(puerto: BeatPuerto): number {
        switch (puerto) {
            case BeatPuerto.Puerto0:
                return 0;
            case BeatPuerto.Puerto1:
                return 1;
            case BeatPuerto.Puerto2:
                return 2;
            default:
                return 3;
        }
    }

    function clampServoAngle(value: number): number {
        return clamp(value, 0, 180);
    }

    function clamp(value: number, min: number, max: number): number {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    function dht11Read(pin: DigitalPin): number[] {
        const data = [0, 0, 0, 0, 0];

        pins.digitalWritePin(pin, 0);
        basic.pause(18);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(30);
        pins.setPull(pin, PinPullMode.PullUp);

        if (pins.pulseIn(pin, PulseValue.Low, 1000) == 0) return [];
        if (pins.pulseIn(pin, PulseValue.High, 1000) == 0) return [];

        for (let i = 0; i < 40; i++) {
            if (pins.pulseIn(pin, PulseValue.Low, 1000) == 0) return [];
            const high = pins.pulseIn(pin, PulseValue.High, 1000);
            if (high == 0) return [];
            const index = i >> 3;
            data[index] <<= 1;
            if (high > 40) data[index] |= 1;
        }

        const checksum = (data[0] + data[1] + data[2] + data[3]) & 0xFF;
        if (checksum != data[4]) return [];
        return data;
    }
}
