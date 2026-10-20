# Evaluación de la práctica 3 — Ignacio

## Aspecto 1 — Configuraciones distintas estudiadas

**Número de configuraciones: 3.**

Se implementan en PyTorch tres CNN para los 10 dígitos, entrenadas con Adam (tasa 0,001), lote 64 y 5 épocas:
- `CNNSimple`: Conv 16@5×5 → MaxPool → capa lineal.
- `CNNMedia`: dos bloques Conv 32/64@3×3 + MaxPool, Dropout 0,5 y Dense 128.
- `CNNAvanzada`: tres `Conv2d` 32/32/64 con BatchNorm, Dropout 0,4 y BatchNorm en la capa densa.

Es el mínimo para hablar de comparación y el estudio queda muy limitado.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

El código elige `CNN Media` por la accuracy final de test (98,77 %) y lo imprime. No hay ninguna conclusión escrita: la configuración ganadora solo se identifica por esa salida, sin resumir su arquitectura ni sus hiperparámetros y sin justificar la elección.

## Aspecto 3 — Visualización gráfica y numérica

**Calificación: 2/5.**

Hay una figura que compara las tres redes y una tabla con las métricas finales, pero ambas son escasas:
- La figura muestra accuracy y pérdida de test por época, con el eje de épocas en valores fraccionarios (0,5; 1,5…).
- La tabla solo recoge pérdida y accuracy de test de la última época.
- No aparecen accuracy ni errores de entrenamiento, matrices de confusión, parámetros ni tiempo.
- El código de la celda del gráfico no reproduce la figura guardada: tras `plt.subplot(1, 2, 1)` se dibujan también las pérdidas sin crear el segundo subgráfico (y con otros títulos). Al volver a ejecutarla, accuracy y pérdida quedarían superpuestas en un solo eje.

## Aspecto 4 — Almacenamiento del mejor modelo

**Calificación: Yes.**

Se guarda el `state_dict` de `mejor_modelo` (la CNN Media) con `torch.save(..., 'mejor_modelo_mnist.pth')`, y la salida confirma el guardado. Es la forma habitual en PyTorch, pero solo conserva los pesos: para reutilizarlo hace falta la definición de `CNNMedia`, y el cuaderno no explica cómo recargarlo ni lo comprueba. El `.pth` no viene adjunto.

## Aspecto 5 — Estudio, posibles mejoras y criterio de selección

**Calificación: 3/10.**

Las tres redes aumentan de complejidad y el código es limpio y reutilizable (una función de entrenamiento con seguimiento por época y selección automática del mejor modelo). Pero el estudio es escaso y no hay análisis escrito.

Puntos a mejorar:
- **Factores mezclados:** de una red a otra cambian a la vez el número de convoluciones, el tamaño de kernel (5×5 y 3×3), los filtros, el Dropout y la BatchNorm, así que no se puede saber qué aporta cada capa. Faltan una referencia MLP y variantes de un solo factor (tipo de pooling, *stride*, *padding*, Dropout, etc.).
- **Sin validación:** el test se evalúa en cada época y se usa para elegir, con lo que el 98,77 % es optimista. Habría que separar una partición de validación.
- **Diferencia no concluyente:** la ventaja de `CNN Media` sobre `CNN Avanzada` es de 9 imágenes (98,77 % frente a 98,68 %), con una única ejecución y sin semilla fijada (`torch.manual_seed`). Además, `CNN Avanzada` tiene la menor pérdida de test (0,0388 frente a 0,0399) y el criterio elegido (accuracy) contradice a la pérdida sin que se comente.
- **Pocas métricas:** no se calculan accuracy ni errores de entrenamiento (no se puede valorar el sobreajuste), tiempo de entrenamiento, número de parámetros ni matriz de confusión.
- **Pocas épocas:** con 5 épocas las curvas aún mejoran (sobre todo en `CNN Simple`), por lo que el orden podría cambiar con más épocas o con parada temprana.
- **Sin análisis:** no hay ninguna celda de texto que explique las arquitecturas, interprete las curvas o responda a la pregunta del enunciado sobre la mejor configuración.

## Retroalimentación global

El código funciona y el mejor modelo se guarda, pero el estudio es muy breve: tres redes que difieren en varios factores, selección con el test, pocas métricas y ninguna interpretación escrita. Para mejorarlo: ampliar las configuraciones cambiando un solo factor cada vez (incluida una referencia MLP), reservar una partición de validación, registrar errores, parámetros y tiempo, mostrar matrices de confusión, fijar semillas, corregir la celda del gráfico y redactar una conclusión que describa la mejor configuración y justifique el criterio.
