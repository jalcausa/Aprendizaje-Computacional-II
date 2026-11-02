# Evaluación de la práctica 4 — Manuel

## Aspecto 1 — Modelos pre-entrenados estudiados

**Número de modelos pre-entrenados: 2.**

Se usan VGG16 y ResNet50 (ImageNet, `include_top=False`), cada uno con tres cabezas tras GlobalAveragePooling:
- Ligera: Dense 32.
- Dropout: Dense 64 + Dropout 0,3.
- Profunda dual: Dense 64 → Dense 32.

En total son 6 configuraciones, todas con Adam, 3 épocas, lote 256 y entrada de 32×32×3. Lo único que se estudia es la cabeza. No se varía la resolución, el optimizador ni el grado de congelación.

## Aspecto 2 — Transferencia de conocimiento

**Calificación: Sí.**

La base se congela (`base_model.trainable = False`) y solo se entrena la cabeza. La entrada se adapta: se redimensiona a 32×32, el mínimo que admiten VGG16 y ResNet50, y el canal gris se replica a 3.

Sin embargo, la normalización es un simple `/255` y no el `preprocess_input` de cada red. Ambas esperan valores en 0–255, en BGR y con la media de ImageNet restada. Con 32×32, además, el mapa final de la base queda en 1×1.

## Aspecto 3 — Configuración con la mejor clasificación

**Calificación: Sí.**

La sección 4 especifica con detalle el ganador:
- Configuración: VGG16 congelada → GAP → Dense 64 → Dense 32 → Dense 10, con Adam, lote 256, 3 épocas y entrada 32×32×3.
- Resultados: 94,94 % en test (506 errores), 94,96 % en entrenamiento y 22,96 s.

## Aspecto 4 — Visualización gráfica y numérica

**Calificación: 4/5.**

La tabla comparativa recoge accuracy y pérdida de train y test, errores de train y test, y tiempo de las 6 configuraciones. La figura de 6 paneles incluye:
- Barras de accuracy train/test con valores.
- Errores absolutos en test.
- Tiempo.
- Dispersión tiempo frente a accuracy, coloreada por arquitectura.
- Matrices de confusión de train y test del ganador, con etiquetas.

Puntos débiles:
- No se muestran curvas de aprendizaje: el `history` se guarda pero no se usa. Con solo 3 épocas habrían mostrado que los modelos siguen aprendiendo.
- No se indica el número de parámetros.
- Las matrices se muestran solo para el ganador.

## Aspecto 5 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`modelos_objetos[idx_mejor].save('mejor_modelo_tl_mnist.keras')` guarda el modelo con mayor accuracy de test, que coincide con el declarado ganador. No se recarga para comprobarlo. El redimensionado a 32×32 y el paso a RGB quedan fuera del modelo, así que habrá que repetirlos al usarlo.

## Aspecto 6 — Estudio, posibles mejoras y criterio de selección

**Calificación: 4/10.**

Lo positivo:
- El cuaderno está bien estructurado: descripción de las arquitecturas, tabla resumen y ficha del ganador.
- Fija una semilla.
- Las seis cabezas son idénticas en código para ambas bases, así que la comparación VGG16/ResNet50 es justa.
- El criterio de desempate (accuracy y luego pérdida) está definido.

El problema es que los resultados son pobres para MNIST (el mejor, 94,94 %, queda por debajo del MLP de la práctica 1) y no se analiza por qué.

Puntos a mejorar:
- **Entrenamiento insuficiente:** con 3 épocas, la accuracy de entrenamiento (94,96 %) es prácticamente igual a la de test (94,94 %). Es infraajuste, no buena generalización. Las diferencias entre cabezas se miden con modelos sin converger.
- **Preprocesado y resolución:** falta `preprocess_input` y se usa la resolución mínima (32×32). Probablemente esto explica más de la diferencia VGG16/ResNet50 (88–90 %) que la «complejidad residual» que se alega. Convendría probar `preprocess_input`, resoluciones mayores (64 o 96) y un *fine-tuning* del último bloque.
- **Criterio:** existe `validation_split=0.1`, pero se selecciona por accuracy de test. Además, la «Train Acc» se calcula sobre las 60 000 imágenes, incluida la validación.
- **Documentación incoherente:** en la sección 2.1, las cabezas de VGG16 se describen como 64 / 128 + Dropout / 256→64, pero la tabla y el código usan 32 / 64 + Dropout / 64→32.
- **Justificaciones no respaldadas:**
  - Las capas densas «actúan como un comité» que crea «prototipos lógicos».
  - Que el ganador sea «la configuración más rápida en converger» se apoya en 0,5 s de diferencia. Además, los tiempos bajan siempre con el orden de ejecución (28,4 → 23,5 → 23,0 s y 37,9 → 34,6 → 33,7 s), lo que apunta a calentamiento y no a la cabeza.
  - No se mide la convergencia.
- **Ruido:** una sola ejecución y sin parada temprana.

## Retroalimentación global

Entrega ordenada y bien presentada, con una tabla y una figura comparativa completas, la base correctamente congelada, el ganador bien especificado y el modelo guardado. El estudio se limita a variar la cabeza con modelos infraentrenados (3 épocas, sin `preprocess_input`, a 32×32), y las justificaciones son más retóricas que empíricas. Para mejorar:
- Entrenar más épocas o con parada temprana.
- Aplicar el preprocesado de cada red y probar resoluciones mayores.
- Añadir curvas de aprendizaje y una fase de *fine-tuning*.
- Seleccionar con validación.
- Corregir la descripción de las cabezas de VGG16.
