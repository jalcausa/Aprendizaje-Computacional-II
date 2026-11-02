# Evaluación de la práctica 4 — Antonio

## Aspecto 1 — Modelos pre-entrenados estudiados

**Número de modelos pre-entrenados: 2.**

Se usan VGG16 y ResNet50 (ImageNet, `include_top=False`) en tres experimentos. Todos entrenan 5 épocas con lote 64 sobre las 60 000 imágenes:
- VGG16 congelado: GAP → Dense 128 → Dropout 0,3 → Dense 10, Adam con lr 1e-3.
- ResNet50 congelado: misma cabeza y optimizador.
- ResNet50 «afinado»: se descongelan las últimas 15 capas, Dropout 0,5 y lr 1e-4.

## Aspecto 2 — Transferencia de conocimiento

**Calificación: Sí.**

La entrada se adapta dentro del modelo con `Resizing(224, 224)`, la resolución nativa de ImageNet, y `grayscale_to_rgb`, seguidos del `preprocess_input` de cada red. Los datos se mantienen en 0–255.

En los experimentos 1 y 2 la base está congelada (`trainable=False`). En el 3 se descongelan solo las últimas 15 capas de ResNet50 con una tasa de aprendizaje baja. Dos detalles de ese *fine-tuning*:
- Se hace en una sola fase, con la cabeza aleatoria entrenándose a la vez que las capas descongeladas.
- Esas 15 capas incluyen BatchNorm entrenables, y como la base no se llama con `training=False`, actualizan sus estadísticas. Aquí ha funcionado, pero lo recomendable es mantenerlas congeladas.

## Aspecto 3 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se declara ganador ResNet50 afinado (últimas 15 capas, Dropout 0,5, lr 1e-4): 99,29 % de accuracy y pérdida de 0,0318 en test, con 1 230 s de entrenamiento. La justificación tiene en cuenta también el tiempo frente a las otras dos propuestas.

## Aspecto 4 — Visualización gráfica y numérica

**Calificación: 3/5.**

Se muestran métricas por época (pérdida de entrenamiento, pérdida y accuracy de validación), una tabla resumen con accuracy, pérdida y tiempo de test, y curvas comparativas de accuracy y pérdida de validación de los tres modelos.

Puntos débiles:
- No hay matrices de confusión, número de errores ni accuracy de entrenamiento.
- No hay gráficos de barras que comparen las métricas finales.
- No se muestran curvas de entrenamiento, así que no se ve la brecha train−val.
- El eje de épocas usa valores fraccionarios (1,5; 2,5…).
- La «validación» de las curvas es en realidad el test (ver Aspecto 6).

## Aspecto 5 — Almacenamiento del mejor modelo

**Calificación: Sí.**

Se selecciona de forma programática el de mayor accuracy de test y se guarda con `mejor_modelo.save('mejor_modelo_mnist_tl.keras')`, que coincide con el declarado ganador. Es un acierto que el modelo incluya el redimensionado, el paso a RGB y el preprocesado: recibe directamente imágenes 28×28×1.

No se recarga para verificarlo. Convendría hacerlo, porque las capas `Lambda` con funciones anónimas requieren `safe_mode=False` al cargar.

## Aspecto 6 — Estudio, posibles mejoras y criterio de selección

**Calificación: 5/10.**

Lo positivo:
- Entrada a 224×224 integrada en el modelo, sin cargar en memoria las imágenes grandes.
- Preprocesado correcto.
- Semillas fijadas y dataset completo.
- Tiempos medidos.
- Una conclusión razonada que relaciona accuracy y coste, y justifica la tasa de aprendizaje baja del *fine-tuning*.

Puntos a mejorar:
- **Criterio:** se usa el test como validación (`validation_data=(x_test, y_test)`) y se selecciona por accuracy de test. La «val acc» con la que se elige en el texto es la misma cifra de test, así que la estimación final está sesgada. Habría que separar una validación del entrenamiento y reservar el test para el final.
- **Factores no aislados:** del experimento 2 al 3 cambian a la vez las capas descongeladas, la tasa de aprendizaje (1e-3 → 1e-4) y el Dropout (0,3 → 0,5). No se puede atribuir la mejora solo al *fine-tuning*. Tampoco se aplica el *fine-tuning* a VGG16.
- ***Fine-tuning* en una fase:** lo habitual es entrenar primero la cabeza con la base congelada y después descongelar el último bloque, manteniendo las BatchNorm en inferencia. «Últimas 15 capas» tampoco coincide con un bloque completo de ResNet50. Sería más claro descongelar por nombre (`conv5_`).
- **Afirmaciones no respaldadas:** se dice que el modelo afinado «sigue aprendiendo y mejorando en cada época». En la época 4 baja al 98,80 % y la pérdida sube a 0,0509. Además, se toma el valor de la última época sin parada temprana ni `restore_best_weights`.
- **Alcance:** solo dos modelos base y tres configuraciones, con una sola ejecución. Se podría variar la resolución (224 es costoso: más de 1 100 s por modelo), la cabeza o probar redes más ligeras.

## Retroalimentación global

Entrega correcta: transferencia bien implementada (entrada a 224×224, preprocesado integrado, base congelada), semillas fijadas, tiempos medidos, conclusión razonada y el mejor modelo guardado con toda la adaptación de la entrada. Para mejorarla:
- Separar validación y test, y seleccionar con validación.
- Cambiar un solo factor al pasar al *fine-tuning*, en dos fases y con las BatchNorm congeladas.
- Añadir matrices de confusión, errores, curvas de entrenamiento y un gráfico comparativo de barras.
- Ajustar la conclusión a lo que muestran las curvas.
