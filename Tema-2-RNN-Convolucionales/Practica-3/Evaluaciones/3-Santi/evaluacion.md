# Evaluación de la práctica 3 — Santi

## Aspecto 1 — Configuraciones distintas estudiadas

**Número de configuraciones: 10.**

Una red densa de referencia (la de la práctica 1) y nueve CNN sobre los 10 dígitos, organizadas en estudios:
- **Base y kernel/padding:** Conv 32 3×3 `valid` + MaxPool + Dense 64 (base), la misma con kernel 5×5 y la misma con *padding* `same`.
- **Pooling:** la base con AveragePooling.
- **Profundidad:** dos bloques Conv 32/64.
- **Regularización:** dos bloques con Dropout, dos bloques con BatchNorm, y BatchNorm + Dropout con Dense 128.
- **VGG:** bloques Conv-Conv-Pool con Dropout 0,25/0,40.

Todas usan Adam, lote 128, 5 épocas (6 el modelo VGG), `validation_split=0,1` y la semilla 42 fijada antes de cada modelo.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se identifica `Est.5: Doble Conv-Conv-Pool (VGG)`: [Conv 32 ×2 → MaxPool → Dropout 0,25] → [Conv 64 ×2 → MaxPool → Dropout 0,25] → Dense 128 → Dropout 0,40 → Dense 10. Tiene 467 818 parámetros y logra un 99,21 % en test (79 errores), con Adam y lote 128. La arquitectura y las métricas se detallan en la celda de selección y en las conclusiones finales.

## Aspecto 3 — Visualización gráfica y numérica

**Calificación: 4/5.**

Es muy completa:
- Curvas de entrenamiento y validación de cada experimento, y una tabla comparativa por estudio.
- Tabla consolidada con parámetros, tiempo, accuracy, pérdida y errores en train y test.
- Panel de cuatro gráficos (accuracy, errores, tiempo y dispersión rendimiento-coste con el tamaño proporcional a los parámetros).
- Matrices de confusión de train y test, informe de clasificación por dígito y galería de errores.

Puntos débiles:
- Las matrices de confusión (con 326 y 91 errores), el informe y la galería corresponden al modelo 4C, no al ganador declarado.
- En el gráfico de dispersión se solapan varias etiquetas (Est.1 y Est.2, y el MLP sobre el eje).
- Los gráficos solo muestran test, no validación.
- Varias cifras del texto no coinciden con las tablas (véase el Aspecto 5).

## Aspecto 4 — Almacenamiento del mejor modelo

**Calificación: No.**

El modelo que se guarda no es el que se declara mejor. La celda de resumen asigna `mejor_modelo = cnn_opt`, es decir, el 4C (BatchNorm + Dropout, 99,09 %, 91 errores). Esa variable es la que se analiza (las matrices muestran 91 errores) y la que se guarda en `mejor_modelo_cnn_mnist.keras`. Sin embargo, el título «Modelo Seleccionado», la justificación y las conclusiones finales designan al Est.5 (`cnn_vgg_doble`, 79 errores), que nunca se guarda. Bastaba con `mejor_modelo = cnn_vgg_doble`, o con elegirlo de forma programática a partir de `resultados_experimentos`. El guardado en sí funciona (la salida confirma la ruta y 4,89 MB), pero no se recarga para verificarlo.

## Aspecto 5 — Estudio, posibles mejoras y criterio de selección

**Calificación: 6/10.**

Es el estudio más amplio de la tanda y el mejor planteado como progresión. Incluye el MLP de referencia, kernel, *padding*, tipo de pooling, profundidad, Dropout, BatchNorm y bloques VGG. Para cada modelo se recogen parámetros, tiempo y errores en train y test, con curvas de validación. El razonamiento sobre el tamaño de la capa densa es correcto (5 408 frente a 3 136 valores tras `Flatten`).

Puntos a mejorar:
- **Criterio:** se elige por accuracy de test, aunque cada modelo entrena con `validation_split=0,1` (solo se usa para las curvas). El ganador supera al 4C en 12 imágenes (79 frente a 91) con una sola semilla, y además entrena 6 épocas frente a 5, con otra capa densa y otro Dropout. La comparación no es equivalente ni la diferencia concluyente.
- **Comparaciones no aisladas:**
  - Est.3 cambia también el *padding* respecto a la base (`valid`→`same`).
  - El 4C cambia respecto al 4B Dense 64→128 y añade Dropout.
  - El Est.5 cambia épocas, capas y Dropout a la vez.

  Por eso la «confirmación del principio VGG» no está probada: no hay un modelo equivalente con Conv 5×5.
- **Texto desincronizado con las salidas:**
  - Estudio 1: «84,35 s, 98,07 %, 193 fallos» frente a 43,01 s, 98,08 % y 192 de la tabla.
  - Estudio 2: «98,36 % frente a 98,09 %, 164 frente a 191 errores, 66,28 s frente a 77,99 s y 727 frente a 588 errores de entrenamiento», cuando las salidas dan 98,35 %, 165 errores, 45,77 s frente a 37,82 s y 574 frente a 726.
  - «~140 errores» de la CNN base frente a los 165 reales.
  - Además, se afirma que MaxPooling es más barato (la salida muestra lo contrario, 45,77 s frente a 37,82 s), y las conclusiones finales lo repiten.
- **BatchNorm y tiempo:** se dice que BN «acelera la convergencia», pero en los modelos 4B y 4C la accuracy de validación de la primera época se desploma (31 % y 34 %), cosa que no se menciona. Los tiempos son poco fiables: las épocas del 4B pasan de 40 s a 72 s dentro del mismo entrenamiento. Concluir que VGG es «más eficiente» que BN por 233 s frente a 289 s no es sostenible.
- **Ruido:** una sola semilla y diferencias de pocas imágenes (113 frente a 119 por el Dropout, 153 frente a 165 por el kernel 5×5) se presentan como efectos de las capas.
- **Reproducibilidad:** los contadores de ejecución no son consecutivos (la carga de datos se ejecutó tras entrenar los primeros modelos). Conviene ejecutar el cuaderno completo antes de entregarlo para que texto y salidas coincidan.

## Retroalimentación global

Trabajo ambicioso, con el estudio más variado y una presentación gráfica muy completa. Sin embargo, el modelo guardado no es el declarado ganador, la selección se hace con el test y varias conclusiones citan cifras de una ejecución anterior. Para mejorarlo: guardar el modelo realmente elegido (y recargarlo para comprobarlo), seleccionar con validación, igualar épocas y cambiar un solo factor al comparar, repetir con varias semillas y volver a ejecutar el cuaderno entero para que el texto concuerde con las salidas.
