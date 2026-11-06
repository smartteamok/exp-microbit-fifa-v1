# FIFA Foundation

Extensión de bloques para micro:bit v2 usada en el kit de robótica educativa de FIFA Foundation.

## Organización de los bloques
Los bloques se agrupan según lo que hacen o devuelven, y cada grupo tiene su tono de naranja:

| Grupo | Color | Bloques |
|---|---|---|
| Eventos | naranja claro | al pulsar BOTÓN, al tocar TÁCTIL, si hay OBSTÁCULO, si DISTANCIA es menor a, al detectar COLOR, al cambiar eje del JOYSTICK, al seguir LÍNEA |
| Entradas lógicas | naranja claro | BOTÓN, TÁCTIL, JOYSTICK pulsado, LÍNEA, COLOR detectado, OBSTÁCULO |
| Entradas numéricas | naranja claro | DISTANCIA, TEMPERATURA / HUMEDAD (DHT11), LUZ, HUMEDAD DEL SUELO, POTENCIÓMETRO, JOYSTICK X/Y, nivel de COLOR |
| Salidas | naranja medio | LED, COLOR RGB (tira de 6 LEDs), MATRIZ 8x8, LCD |
| Motores | naranja oscuro | MOTOR, SERVO, HÉLICE |
| … más | naranja medio | habilitar / deshabilitar PANTALLA del micro:bit |

## Qué maneja
- Motores DC con control de dirección y velocidad.
- Sensores digitales: botón, táctil, obstáculo, seguidor de línea, ultrasonido y DHT11
  (temperatura y humedad en un solo bloque).
- Sensores analógicos: humedad de suelo, luz y potenciómetro.
- Joystick (ejes X/Y y pulsador) y sensor de color (canales RGB y detección).
- Eventos: los bloques "al …" ejecutan su contenido una vez cada vez que la condición
  empieza a cumplirse (por ejemplo, al pulsar el botón), sin necesidad de un "para siempre".
- LED simple: prender y apagar en cualquiera de los 4 puertos.
- Tira RGB: se marcan en una grilla los LEDs (0 a 5) que toman el color.
- Matriz 8x8 I2C (HT16K33, dirección 0x70): dibujo, texto en movimiento y borrado.
- Pantalla LCD I2C.
- Actuadores: servos y hélice.

## Puertos
Cada bloque solo ofrece los puertos compatibles con su componente:

| Puertos | Componentes |
|---|---|
| 0, 1, 2, 3 | botón, táctil, obstáculo, LED, DHT11, tira RGB, servo |
| 0, 1 | humedad de suelo, luz, potenciómetro |
| 1 | joystick, seguidor de línea, ultrasonido, hélice |
| IIC | matriz 8x8, sensor de color, LCD |

## Nota de pines
El ultrasonido, el seguidor de línea, la hélice y el joystick comparten P1/P2 (puerto 1),
así que usa solo uno a la vez. El seguidor de línea y el pulsador del joystick usan P10, que
comparte la pantalla de la micro:bit: usa "deshabilitar PANTALLA del micro:bit" (en "… más")
al iniciar.

## Idiomas
Los bloques están disponibles en inglés (idioma base) y español
(_locales/es). El editor de MakeCode elige automáticamente según su
configuración de idioma.

Nota: ni la pantalla LCD ni la matriz 8x8 pueden mostrar acentos ni
la letra ñ. Son limitaciones de la tabla de caracteres del hardware.

## Licencia
MIT
