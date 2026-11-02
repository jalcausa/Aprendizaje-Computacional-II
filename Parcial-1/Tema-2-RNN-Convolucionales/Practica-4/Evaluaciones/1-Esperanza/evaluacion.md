# Evaluación de la práctica 4 — Esperanza

## Aspecto 1 — Modelos pre-entrenados estudiados

**Número de modelos pre-entrenados: 3.**

Se comparan MobileNetV2, ResNet50 y DenseNet121 de `tf.keras.applications` (pesos de ImageNet, `include_top=False`). Todos llevan la misma cabeza: GlobalAveragePooling → Dense 128 → Dropout 0,3 → Dense 10. Se entrenan con Adam (lr 1e-4), 3 épocas y lote 64 sobre un submuestreo de 6 000 imágenes de entrenamiento y 1 200 de test, redimensionadas a 96×96×3. Hay una única configuración por modelo base: no se varía la cabeza, la resolución ni el grado de congelación.

## Aspecto 2 — Transferencia de conocimiento

**Calificación: No.**

La entrada sí se adapta: las imágenes se redimensionan a 96×96 y el canal gris se replica a 3 canales. Pero la base se deja entrenable (`base_model.trainable = True`), así que en los tres modelos se reentrenan todos los pesos de ImageNet junto con la cabeza. Eso es un *fine-tuning* completo, no una transferencia con la base congelada. Tampoco se aplica el `preprocess_input` de cada red: se pasan valores en [0, 1] a redes que esperan otra escala (ResNet50 resta la media por canal en BGR, MobileNetV2 espera [−1, 1] y DenseNet normaliza a lo ImageNet).

## Aspecto 3 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se elige DenseNet121 de forma programática (máxima accuracy) y se muestra su accuracy (81,42 %), pérdida (0,5769) y tiempo (439 s). Los hiperparámetros están en el código, pero no hay una frase que reúna la configuración completa del ganador (resolución, cabeza, optimizador y épocas).

## Aspecto 4 — Visualización gráfica y numérica

**Calificación: 3/5.**

Hay una tabla con accuracy, pérdida y tiempo de los tres modelos, curvas comparativas de accuracy y pérdida de validación, y una matriz de confusión por modelo.

Puntos débiles:
- Las curvas muestran solo la validación. Con las de entrenamiento se habría visto enseguida la enorme brecha (99,9 % en entrenamiento frente a 12–81 % en validación).
- Con 3 épocas, las curvas tienen 3 puntos y el eje x es fraccionario (0,25; 0,5…) y empieza en 0.
- La tabla no incluye la accuracy de entrenamiento, el número de errores ni los parámetros de cada red.
- Las matrices de confusión no se acompañan de ningún análisis que concuerde con ellas (ver Aspecto 6).

## Aspecto 5 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`mejor_info["model"].save(...)` guarda el modelo seleccionado como `mejor_modelo_densenet121_mnist.keras`, y la salida confirma el guardado. No se recarga para verificarlo. Además, el preprocesado (redimensionado y paso a RGB) queda fuera del modelo, así que quien lo use tendrá que repetirlo a mano.

## Aspecto 6 — Estudio, posibles mejoras y criterio de selección

**Calificación: 3/10.**

La estructura es clara (introducción, metodología, tabla, curvas, matrices, conclusión), compara tres arquitecturas distintas, fija semillas y mide el tiempo. Pero los resultados indican que algo falla y no se detecta: el mejor modelo (81,42 %) queda muy por debajo de un MLP sencillo de la práctica 1 (~97–98 %).

Puntos a mejorar:
- **Transferencia mal planteada:** al dejar la base entrenable, se reentrenan millones de pesos con solo 6 000 imágenes y 3 épocas. Además, la base trabaja en modo entrenamiento (BatchNorm actualizando estadísticas) y la entrada no tiene el preprocesado que esperan los pesos. Lo más probable es que eso explique que la accuracy de entrenamiento llegue al 99,9 % mientras la de validación se queda en 12–81 %. Habría que congelar la base (`trainable=False`, llamándola con `training=False`), aplicar `preprocess_input` y, como mucho, descongelar después el último bloque con una tasa de aprendizaje pequeña.
- **Colapso no detectado:**
  - ResNet50 predice siempre «1». Su matriz tiene toda la masa en esa columna, y el 12,33 % es exactamente la proporción de unos (148/1 200). La curva de validación es plana en 0,1233.
  - MobileNetV2 desvía la mayoría de errores hacia el «9».

  La conclusión lo atribuye a «problemas de convergencia», pero en entrenamiento ResNet50 sí converge (99,87 %). Lo que falla es la generalización o la inferencia.
- **Afirmaciones no respaldadas por las salidas:**
  - Se dice que los errores se concentran en pares parecidos (4/9, 3/5/8). Las matrices muestran otra cosa: todo a «1» en ResNet50, mucho a «9» en MobileNetV2 y, en DenseNet121, sobre todo 2→3, 1→7, 4→7 y 5→3.
  - «Los modelos profundos alcanzan mejores tasas de acierto» no cuadra con que ResNet50 sea el peor.
- **Criterio:** se usa el test como validación (`validation_data=(X_test, …)`) y se selecciona por accuracy de test. Habría que separar una validación del entrenamiento y reservar el test para la evaluación final.
- **Tamaño de la muestra:** con 1 200 imágenes de test y una sola ejecución, las métricas tienen mucha varianza. Conviene usar el conjunto completo o, al menos, el test completo.

## Retroalimentación global

Cuaderno bien organizado, con tres arquitecturas, tabla, curvas, matrices de confusión, tiempos y el mejor modelo guardado. Pero no se hace transferencia de conocimiento: la base se reentrena entera y sin su preprocesado, y eso produce resultados anómalos (ResNet50 predice siempre «1», y el mejor modelo no llega al nivel de un MLP). Además, la conclusión no los cuestiona e interpreta las matrices de forma que no concuerda con ellas. Para mejorar:
- Congelar la base y aplicar `preprocess_input`.
- Añadir curvas de entrenamiento.
- Separar validación y test.
- Probar *fine-tuning* parcial como segunda fase.
- Revisar las conclusiones contra las salidas.
