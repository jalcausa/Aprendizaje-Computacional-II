# Evaluación de la práctica — Alberto

## Aspecto 1 — Implementación del modelo

**Calificación: 5/5**

La red está implementada completamente con NumPy: capa oculta sigmoide, salida lineal, MSE y retropropagación con el factor `-2 / N` coherente con la definición de `error = y - output`. Además, normaliza tanto la entrada como el objetivo y desnormaliza las predicciones.

## Aspecto 2 — Parametrización y versatilidad

**Calificación: 4/5**

Los tamaños de las capas se configuran en el constructor y la tasa de aprendizaje y las épocas en `fit`. La principal limitación es que la semilla `42` está fijada dentro de la clase en vez de exponerse como parámetro, lo que dificulta comparar distintas inicializaciones.

## Aspecto 3 — Monitorización del entrenamiento

**Calificación: 5/5**

El MSE se guarda en `historial_errores` en cada época y se representa mediante `plot_loss`. La gráfica final también permite comprobar visualmente la aproximación aprendida, aunque el límite vertical fijo del error podría ocultar parte de la evolución en otros experimentos.

## Aspecto 4 — Calidad sobre los datos de test

**Calificación: 4/5**

**MSE de test: `0.001596291027`**, segundo mejor resultado de las cinco entregas. El MSE de entrenamiento es muy bajo (`0.000032111918`), pero la predicción central queda por debajo del valor real, lo que explica la diferencia respecto al modelo mejor clasificado.

## Aspecto 5 — Reproducibilidad

**Calificación: 5/5**

La semilla `42` se establece siempre al construir la red y el entrenamiento es de lote completo. Aunque sería más flexible parametrizarla, la configuración actual sí garantiza que las ejecuciones produzcan el mismo modelo.

## Retroalimentación global

Es una implementación sólida y obtiene la segunda mejor generalización del grupo. Las mejoras más claras son parametrizar la semilla, evitar el límite vertical fijo de la gráfica y sustituir la ruta absoluta `/data_train.parquet` por una ruta relativa para que el notebook funcione en cualquier entorno.