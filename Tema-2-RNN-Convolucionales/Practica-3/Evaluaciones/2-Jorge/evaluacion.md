# Evaluación de la práctica 3 — Jorge

## Aspecto 1 — Configuraciones distintas estudiadas

**Número de configuraciones: 6.**

Una red densa de referencia y cinco CNN sobre los 10 dígitos, todas con Adam, lote 128, 5 épocas y la semilla 42 fijada antes de cada entrenamiento:
- MLP: Flatten → Dense 64.
- CNN1: Conv 16 → MaxPool → Dense 64.
- CNN2: dos bloques Conv 16/32 + MaxPool.
- CNN2_drop: CNN2 con Dropout 0,25 tras cada bloque.
- CNN2_bn: CNN2_drop con BatchNorm tras cada convolución.
- CNN2_avg: CNN2_drop con AveragePooling.

Una tabla indica con qué red se compara cada una y qué factor cambia. El abanico es pequeño: no se varían tamaño de kernel, *stride*, *padding*, número de filtros ni optimizador.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se identifica de forma programática `CNN2_bn`: Conv 16 → BN → MaxPool → Dropout 0,25 → Conv 32 → BN → MaxPool → Dropout 0,25 → Flatten → Dense 64 → Dense 10. Tiene 106 058 parámetros y logra un 98,92 % en validación (65 errores) y un 98,68 % en test (132 errores). La conclusión recoge arquitectura, métricas y tiempo, y señala con honestidad que `CNN2_drop` queda empatada en validación y entrena en la mitad de tiempo.

## Aspecto 3 — Visualización gráfica y numérica

**Calificación: 5/5.**

Es la presentación más completa y clara de la tanda:
- Tabla ordenada por exactitud de validación, con parámetros, tiempo, accuracy de train/val/test, errores y la brecha train−val.
- Tres gráficos de barras (errores de validación, tiempo y train frente a validación) que resaltan el mejor modelo.
- Curvas de pérdida y exactitud de validación de las tres mejores y del MLP.
- Matriz de confusión de test del ganador (solo errores, para que se vean) con las confusiones más frecuentes.
- Galería de 16 imágenes mal clasificadas.

Las cifras citadas en el texto coinciden con la tabla. Mejoras menores: no se muestra la matriz de entrenamiento y el test aparece solo en la tabla, no en los gráficos.

## Aspecto 4 — Almacenamiento del mejor modelo

**Calificación: Yes.**

`modelo_final.save('mejor_cnn_mnist.keras')` guarda la variable del modelo ganador, junto con un JSON con su configuración. Después se recarga con `load_model`, se comprueba que la exactitud en test es idéntica (0,9868) y se comparan las predicciones de las 10 primeras imágenes. El `.keras` no viene adjunto.

## Aspecto 5 — Estudio, posibles mejoras y criterio de selección

**Calificación: 8/10.**

Es un estudio metodológicamente cuidado. Parte de un MLP como referencia y cada CNN cambia un único factor respecto a la indicada, con 6 000 imágenes de validación reservadas y el criterio fijado de antemano (exactitud de validación). Se registran parámetros, tiempo y sobreajuste (train−val). Las cifras del texto son correctas: los errores de validación bajan de 183 a 95 con una convolución (−48 %), y de 372 a 132 errores de test frente al MLP (−65 %). Además, se reconoce la incertidumbre del resultado (2 imágenes de diferencia, posible efecto del azar, y se propone repetir con varias semillas).

Puntos a mejorar:
- **Alcance reducido:** solo cinco variantes de CNN. Faltan kernel, *stride*, *padding*, número de filtros, optimizador y arquitecturas como LeNet-5, VGG o Global Average Pooling.
- **Ruido sin cerrar:** las diferencias de validación (65, 67 y 73 errores) son de 2 a 8 imágenes con una sola semilla y 5 épocas fijas, sin parada temprana. Se elige `CNN2_bn` pese a reconocer el empate, y la columna de test invierte el orden (115 errores `CNN2_drop` frente a 132 `CNN2_bn`) sin comentarlo. Un desempate fijado de antemano (menor pérdida de validación, menos parámetros o menos tiempo) lo habría resuelto. Repetir con varias semillas sería lo ideal.
- **Colocación de BatchNorm:** la `Conv2D` ya lleva `activation='relu'`, así que BN queda después de la ReLU y no entre convolución y activación como en las diapositivas. La conclusión «BN apenas cambia el resultado» solo vale para esa colocación.
- **Referencia:** el MLP se presenta como «el de la P1», pero usa Dense 64 y la práctica 1 usaba Dense 128.
- **Tiempo:** se advierte de que varía entre ejecuciones y solo se consideran las diferencias grandes (BN, MLP), pero no se repite la medida para confirmarlas.

## Retroalimentación global

Entrega muy sólida: referencia MLP, comparaciones de un solo factor, selección con validación, conclusiones numéricamente correctas, visualización excelente y modelo guardado y verificado. Para mejorarla: ampliar los factores estudiados (kernel, *stride*, *padding*, filtros, optimizador, bloques VGG), usar varias semillas o parada temprana para saber si las diferencias pequeñas son reales, y definir de antemano un criterio de desempate.
