/**
 * Bloques personalizados para FIFA Foundation
 */

enum BeatMotor {
    //% block="Both"
    Ambos = 0,
    //% block="Left motor"
    Izquierdo = 1,
    //% block="Right motor"
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

enum BeatFanAccion {
    //% block="Stop"
    Parar = 2,
    //% block="Turn left"
    Izquierda = 0,
    //% block="Turn right"
    Derecha = 1
}

enum BeatJoystickEje {
    //% block="X axis"
    EjeX = 0,
    //% block="Y axis"
    EjeY = 1,
    //% block="button"
    Pulsador = 2
}

enum BeatPuertoJoystick {
    //% block="Port 1"
    Puerto1 = 1
}

enum BeatPuertoI2C {
    //% block="IIC"
    IIC = 0
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
    //% block="Turn on"
    Prender = 1,
    //% block="Turn off"
    Apagar = 0
}

enum BeatLedIndex {
    //% block="0"
    Led0 = 0,
    //% block="1"
    Led1 = 1,
    //% block="2"
    Led2 = 2,
    //% block="3"
    Led3 = 3,
    //% block="4"
    Led4 = 4,
    //% block="5"
    Led5 = 5
}

enum BeatLedSeleccion {
    //% block="all"
    Todos = -1,
    //% block="0"
    Led0 = 0,
    //% block="1"
    Led1 = 1,
    //% block="2"
    Led2 = 2,
    //% block="3"
    Led3 = 3,
    //% block="4"
    Led4 = 4,
    //% block="5"
    Led5 = 5
}

//% color="#ed6a22" weight=100 icon="" block="FIFA Foundation"
//% groups='["Setup","Digital sensors","Analog sensors","Outputs","Motors","Displays"]'
namespace beatMundial {

    // --- GRUPO: CONFIGURACIÓN ---

    /**
     * Disables the micro:bit's LED matrix.
     * Use it in "on start" to avoid interference with the line sensor (P10).
     */
    //% block="Disable LED matrix"
    //% group="Setup"
    //% color="#00A54F"
    //% weight=100
    export function deshabilitarMatriz(): void {
        led.enable(false);
    }

    /**
     * Enables the micro:bit's LED matrix.
     */
    //% block="Enable LED matrix"
    //% group="Setup"
    //% color="#00A54F"
    //% weight=99
    export function habilitarMatriz(): void {
        led.enable(true);
    }

    // --- GRUPO: MOTORES ---

    /**
     * Moves the robot in the given direction at medium speed (50%).
     */
    //% block="Move ｜ %direccion %motor"
    //% motor.defl=BeatMotor.Ambos
    //% group="Motors"
    //% color="#221E1F"
    //% weight=90
    export function mover(direccion: BeatDireccion, motor: BeatMotor): void {
        moverVelocidad(direccion, motor, 50);
    }

    /**
     * Moves the robot controlling direction and speed (0 to 100).
     */
    //% block="Move ｜ %direccion %motor at speed %velocidad"
    //% motor.defl=BeatMotor.Ambos
    //% velocidad.min=0 velocidad.max=100 velocidad.defl=100
    //% group="Motors"
    //% color="#221E1F"
    //% weight=85
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
    //% block="Stop ｜ %motor"
    //% group="Motors"
    //% color="#221E1F"
    //% weight=80
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

    // --- GRUPO: ENTRADAS DIGITALES ---

    /**
     * Checks the line position.
     * Fixed pins: P10 left, P1 center, P2 right.
     * The port selector has no effect yet.
     */
    //% block="Line follower ｜ %posicion on %puerto"
    //% group="Digital sensors"
    //% color="#979592"
    //% weight=50
    export function siguelineas(posicion: BeatPosicionLinea, puerto: BeatPuerto): boolean {
        // Pines fijos para el conector 1
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
     * Reads the distance in cm using the ultrasonic sensor.
     * Fixed pins: P2 trigger, P1 echo. Returns an integer of cm and 0 if
     * there is no echo. The port selector has no effect yet.
     */
    //% block="Ultrasonic ｜ Distance (cm) on %puerto"
    //% group="Digital sensors"
    //% color="#CC1F26"
    //% weight=58
    export function leerDistancia(puerto: BeatPuerto): number {
        // Pines fijos para el conector 1 (Ultrasonido)
        pins.digitalWritePin(DigitalPin.P2, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P2, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P2, 0);

        let d = pins.pulseIn(DigitalPin.P1, PulseValue.High, 25000);
        if (d == 0) return 0;

        return Math.floor(d / 58);
    }

    // --- GRUPO: MOTORES ---

    /**
     * Controls the fan. Fixed pins: P2 and P1.
     * The port selector has no effect yet.
     */
    //% block="Fan ｜ %accion on %puerto"
    //% accion.defl=BeatFanAccion.Parar
    //% group="Motors"
    //% color="#CC1F26"
    //% weight=95
    export function ventilador(accion: BeatFanAccion, puerto: BeatPuerto): void {
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

    /**
     * Positions a servo on the selected port.
     */
    //% block="Servo ｜ %grados ° on %puerto"
    //% grados.min=0 grados.max=180 grados.defl=90
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Motors"
    //% color="#4F98CE"
    //% weight=75
    export function servoPosicionar(puerto: BeatPuerto, grados: number): void {
        const pin = getServoPin(puerto);
        const clamped = clampServoAngle(grados);
        pins.servoWritePin(pin, clamped);
        servoPosiciones[puertoIndex(puerto)] = clamped;
    }

    /**
     * Moves the servo smoothly to the desired angle.
     */
    //% block="Servo ｜ %grados ° smoothly every %ms ms on %puerto"
    //% grados.min=0 grados.max=180 grados.defl=90
    //% ms.min=1 ms.defl=10
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Motors"
    //% color="#4F98CE"
    //% weight=70
    export function servoMoverGradual(puerto: BeatPuerto, grados: number, ms: number): void {
        const pin = getServoPin(puerto);
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

    // --- GRUPO: SENSORES ---

    /**
     * Reads soil moisture on the selected port.
     */
    //% block="Soil moisture ｜ on %puerto"
    //% puerto.defl=BeatPuertoAnalog.Puerto0
    //% group="Analog sensors"
    //% color="#DA418A"
    //% weight=70
    export function leerHumedadSuelo(puerto: BeatPuertoAnalog): number {
        return pins.analogReadPin(getAnalogPin(puerto));
    }

    /**
     * Reads light intensity on the selected port.
     */
    //% block="Light sensor ｜ on %puerto"
    //% puerto.defl=BeatPuertoAnalog.Puerto0
    //% group="Analog sensors"
    //% color="#DA418A"
    //% weight=68
    export function leerLuz(puerto: BeatPuertoAnalog): number {
        return pins.analogReadPin(getAnalogPin(puerto));
    }

    /**
     * Reads a potentiometer on the selected port.
     */
    //% block="Potentiometer ｜ on %puerto"
    //% puerto.defl=BeatPuertoAnalog.Puerto0
    //% group="Analog sensors"
    //% color="#DA418A"
    //% weight=66
    export function leerPotenciometro(puerto: BeatPuertoAnalog): number {
        return pins.analogReadPin(getAnalogPin(puerto));
    }

    /**
     * Reads the R, G or B level from the TCS34725 color sensor.
     */
    //% block="Color sensor ｜ %canal level"
    //% canal.defl=BeatColorCanal.Rojo
    //% group="Analog sensors"
    //% color="#89267F"
    //% weight=65
    export function leerNivelColor(canal: BeatColorCanal): number {
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

    /**
     * Returns true if the dominant color matches the selection.
     */
    //% block="Color sensor ｜ detected color is %tonoBuscado"
    //% tonoBuscado.defl=BeatColorDetectado.Rojo
    //% group="Analog sensors"
    //% color="#89267F"
    //% weight=64
    export function colorDetectado(tonoBuscado: BeatColorDetectado): boolean {
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
     * Reads the joystick on Port 1.
     * X and Y axes return 0-1023, the button returns 0 or 1.
     */
    //% block="Joystick ｜ %eje on %puerto"
    //% eje.defl=BeatJoystickEje.EjeX
    //% puerto.defl=BeatPuertoJoystick.Puerto1
    //% group="Analog sensors"
    //% color="#979592"
    //% weight=63
    export function leerJoystick(eje: BeatJoystickEje, puerto: BeatPuertoJoystick): number {
        switch (eje) {
            case BeatJoystickEje.EjeX:
                return pins.analogReadPin(AnalogPin.P1);
            case BeatJoystickEje.EjeY:
                return pins.analogReadPin(AnalogPin.P2);
            default:
                pins.setPull(DigitalPin.P10, PinPullMode.PullUp);
                return pins.digitalReadPin(DigitalPin.P10) == 0 ? 1 : 0;
        }
    }

    /**
     * Reads the state of a digital touch button.
     */
    //% block="Touch ｜ on %puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Digital sensors"
    //% color="#4F98CE"
    //% weight=60
    export function leerBotonTactil(puerto: BeatPuerto): boolean {
        return pins.digitalReadPin(getDigitalPin(puerto)) == 1;
    }

    /**
     * Reads the state of a digital push button.
     */
    //% block="Button ｜ on %puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Digital sensors"
    //% color="#4F98CE"
    //% weight=59
    export function leerPulsador(puerto: BeatPuerto): boolean {
        return pins.digitalReadPin(getDigitalPin(puerto)) == 0;
    }

    /**
     * Reads temperature (°C) from the DHT11. Returns an integer.
     * Returns -1 if the reading fails.
     */
    //% block="DTH11 ｜ Temperature (°C) on %puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Digital sensors"
    //% color="#4F98CE"
    //% weight=57
    export function leerTemperaturaDHT11(puerto: BeatPuerto): number {
        const data = dht11Read(getDigitalPin(puerto));
        if (data.length < 5) return -1;
        return data[2];
    }

    /**
     * Reads humidity (%) from the DHT11. Returns an integer.
     * Returns -1 if the reading fails.
     */
    //% block="DTH11 ｜ Humidity (％) on %puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Digital sensors"
    //% color="#4F98CE"
    //% weight=56
    export function leerHumedadDHT11(puerto: BeatPuerto): number {
        const data = dht11Read(getDigitalPin(puerto));
        if (data.length < 5) return -1;
        return data[0];
    }

    // --- GRUPO: PANTALLA ---

    /**
     * Clears the LCD screen.
     */
    //% block="LCD ｜ Clear screen"
    //% group="Displays"
    //% color="#89267F"
    //% weight=48
    export function lcdBorrar(): void {
        lcdEnsureInit();
        lcdCommand(0x01);
        basic.pause(2);
    }

    /**
     * Shows text at position (x, y).
     */
    //% block="LCD ｜ show %texto at x %x y %y"
    //% x.min=0 x.max=15 x.defl=0
    //% y.min=0 y.max=1 y.defl=0
    //% group="Displays"
    //% color="#89267F"
    //% weight=46
    export function lcdMostrar(texto: string, x: number, y: number): void {
        lcdEnsureInit();
        lcdSetCursor(x, y);
        const limit = 16;
        for (let i = 0; i < texto.length && i < limit; i++) {
            lcdData(texto.charCodeAt(i));
        }
    }

    /**
     * Draws a pattern on the 8x8 matrix by picking the LEDs on the grid.
     */
    //% blockId=beatmundial_matriz_dibujar
    //% block="Matrix ｜ Draw on %puerto"
    //% gridLiteral=1
    //% imageLiteralColumns=8
    //% imageLiteralRows=8
    //% imageLiteralScale=0.8
    //% inlineInputMode=external
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Displays"
    //% color="#89267F"
    //% weight=44
    export function matrizDibujar(dibujo: string, puerto: BeatPuertoI2C): void {
        matrizInit();
        const cols = [0, 0, 0, 0, 0, 0, 0, 0];
        let i = 0;
        for (let p = 0; p < dibujo.length && i < 64; p++) {
            // '#' 35, '*' 42, '1' 49 encendido; '.' 46, '0' 48, '_' 95 apagado.
            // El resto (espacios, saltos de linea, tabulaciones) se ignora.
            const c = dibujo.charCodeAt(p);
            if (c == 35 || c == 42 || c == 49) {
                cols[i % 8] |= (1 << (i >> 3));
                i++;
            } else if (c == 46 || c == 48 || c == 95) {
                i++;
            }
        }
        matrizDibujarVentana(cols, 0);
    }

    /**
     * Scrolls text from right to left across the 8x8 matrix.
     * Blocks execution until the scroll finishes.
     */
    //% block="Matrix ｜ Scroll %texto every %ms ms on %puerto"
    //% texto.defl="abc"
    //% ms.min=20 ms.max=1000 ms.defl=200
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Displays"
    //% color="#89267F"
    //% weight=43
    export function matrizDesplazar(texto: string, ms: number, puerto: BeatPuertoI2C): void {
        matrizInit();
        const cols = matrizColumnasTexto(texto);
        const espera = clamp(ms, 20, 1000);
        for (let offset = -8; offset <= cols.length; offset++) {
            matrizDibujarVentana(cols, offset);
            basic.pause(espera);
        }
    }

    /**
     * Turns off all the LEDs on the 8x8 matrix.
     */
    //% block="Matrix ｜ Clear on %puerto"
    //% puerto.defl=BeatPuertoI2C.IIC
    //% group="Displays"
    //% color="#89267F"
    //% weight=42
    export function matrizBorrar(puerto: BeatPuertoI2C): void {
        matrizInit();
        for (let f = 0; f < 8; f++) matrizBuffer[f] = 0;
        matrizVolcar();
    }

    // --- GRUPO: SALIDAS ---

    /**
     * Turns an LED connected to the given port on or off.
     * Writes a high (1) or low (0) level to the port's digital pin.
     * Warning: Port 2 uses P11 and Port 3 uses P5, shared with the
     * micro:bit's B and A buttons.
     */
    //% block="LED ｜ %accion on %puerto"
    //% accion.defl=BeatLedAccion.Prender
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Outputs"
    //% color="#4F98CE"
    //% weight=100
    export function ledSimple(accion: BeatLedAccion, puerto: BeatPuerto): void {
        pins.digitalWritePin(getDigitalPin(puerto), <number>accion);
    }

    /**
     * Lights up the whole RGB strip or a single LED with a color.
     */
    //% block="RGB strip ｜ show color %tono on %led on %puerto"
    //% tono.shadow="colorNumberPicker"
    //% led.defl=BeatLedSeleccion.Todos
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Outputs"
    //% color="#4F98CE"
    //% weight=44
    export function tiraRgbColor(tono: number, led: BeatLedSeleccion, puerto: BeatPuerto): void {
        const strip = neoPixelStrip(puerto);
        if (led === BeatLedSeleccion.Todos) {
            strip.showColor(tono);
            return;
        }
        strip.setPixelColor(<number>led, tono);
        strip.show();
    }

    /**
     * Sets the color of a single LED via R, G and B channels.
     */
    //% block="RGB strip ｜ LED %led R %r G %g B %b on %puerto"
    //% led.defl=BeatLedIndex.Led0
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=0
    //% b.min=0 b.max=255 b.defl=0
    //% puerto.defl=BeatPuerto.Puerto0
    //% inlineInputMode=inline
    //% group="Outputs"
    //% color="#4F98CE"
    //% weight=42
    export function tiraRgbLed(led: BeatLedIndex, r: number, g: number, b: number, puerto: BeatPuerto): void {
        const strip = neoPixelStrip(puerto);
        const index = clamp(<number>led, 0, 5);
        strip.setPixelColor(index, neopixel.rgb(clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255)));
        strip.show();
    }

    /**
     * Turns off the RGB strip.
     */
    //% block="RGB strip ｜ Turn off on %puerto"
    //% puerto.defl=BeatPuerto.Puerto0
    //% group="Outputs"
    //% color="#4F98CE"
    //% weight=41
    export function tiraRgbApagar(puerto: BeatPuerto): void {
        const strip = neoPixelStrip(puerto);
        strip.clear();
        strip.show();
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
    const NEOPIXEL_COUNT = 6;
    const servoPosiciones = [90, 90, 90, 90];
    const neoStrips: neopixel.Strip[] = [null, null, null, null];
    let tcs34725Inicializado = false;
    const HT16K33_ADDR = 0x70;
    const HT16K33_BRILLO = 15;          // 0 a 15
    const MATRIZ_ROTACION_COLUMNA = 0;  // ver nota de calibración
    let matrizInicializada = false;
    const matrizBuffer = [0, 0, 0, 0, 0, 0, 0, 0];

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

    function neoPixelStrip(puerto: BeatPuerto): neopixel.Strip {
        const index = puertoIndex(puerto);
        let strip = neoStrips[index];
        if (!strip) {
            strip = neopixel.create(getDigitalPin(puerto), NEOPIXEL_COUNT, NeoPixelMode.RGB);
            neoStrips[index] = strip;
        }
        return strip;
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

    function getServoPin(puerto: BeatPuerto): AnalogPin {
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
