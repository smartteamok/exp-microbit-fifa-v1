# FIFA Foundation

Extensión de bloques para micro:bit v2 usada en el kit de robótica educativa de FIFA Foundation.

## Qué maneja
- Motores DC con control de dirección y velocidad.
- Sensores digitales: seguidor de línea, ultrasonido, botones y DHT11.
- Sensores analógicos: humedad de suelo, luz y potenciómetro.
- LED simple: prender y apagar en cualquiera de los 4 puertos.
- Matriz 8x8 I2C (HT16K33, dirección 0x70): texto fijo, texto en
  movimiento y borrado.
- Actuadores: servos y ventilador.
- Visualización: tira RGB (NeoPixel).
- Entrada adicional: joystick y sensor de color (canales RGB y detección).

## Nota de pines
El ultrasonido y el seguidor de línea comparten P1/P2, así que usa solo uno a la vez.

## Idiomas
Los bloques están disponibles en inglés (idioma base) y español
(_locales/es). El editor de MakeCode elige automáticamente según su
configuración de idioma.

Nota: ni la pantalla LCD ni la matriz 8x8 pueden mostrar acentos ni
la letra ñ. Son limitaciones de la tabla de caracteres del hardware.

## Licencia
MIT
