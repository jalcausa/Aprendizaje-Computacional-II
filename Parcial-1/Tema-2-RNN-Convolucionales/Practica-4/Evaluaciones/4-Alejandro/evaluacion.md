# Evaluación de la práctica 4 — Alejandro

## Aspecto 1 — Modelos pre-entrenados estudiados

**Número de modelos pre-entrenados: 2.**

Se usan VGG16 y ResNet50 (ImageNet, `include_top=False`), cada uno en dos fases, lo que da 4 configuraciones:
- Base congelada: GAP → Dense 128 → Dense 10, Adam por defecto, 5 épocas.
- *Fine-tuning*: se descongela el último bloque (`block5` / `conv5_`) con Adam (lr 1e-4) durante 5 épocas más.

Se trabaja con 20 000 imágenes de entrenamiento a 64×64×3 y el test completo (10 000). No se varía la cabeza ni la resolución.

## Aspecto 2 — Transferencia de conocimiento

**Calificación: Sí.**

En la primera fase la base se congela (`base.trainable = False`) y solo se entrena la cabeza. La entrada se adapta con `tf.image.resize` a 64×64 y `grayscale_to_rgb`, y se aplica el `preprocess_input` correspondiente a cada red con los datos en 0–255.

En la segunda fase solo se descongelan las capas del último bloque, dejando las BatchNorm congeladas, y se reduce la tasa de aprendizaje. Es el procedimiento correcto.

## Aspecto 3 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se identifica de forma programática VGG16 con *fine-tuning*: 98,75 % en validación y 98,57 % en test. La conclusión es muy escueta y no reúne la configuración completa (resolución, cabeza, épocas de cada fase, tasas de aprendizaje), que solo se deduce del código.

## Aspecto 4 — Visualización gráfica y numérica

**Calificación: 3/5.**

Hay una tabla con accuracy de validación, accuracy de test y pérdida de test de las 4 configuraciones. Una figura añade las curvas de accuracy y pérdida de validación de ambos modelos, con una línea donde empieza el *fine-tuning*, y barras de accuracy de test con valores.

Puntos débiles:
- No hay matrices de confusión ni número de errores.
- No se muestran las curvas de entrenamiento, así que no se ve el sobreajuste.
- No se mide el tiempo ni el número de parámetros. Por eso la conclusión habla de «mayor tiempo» sin datos.
- Las curvas empiezan en la época 0.

## Aspecto 5 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`registrar()` guarda `mejor_modelo_mnist.keras` cada vez que mejora la accuracy de validación, así que el fichero final es VGG16 con *fine-tuning*, el declarado ganador. Después se recarga con `load_model` y se predicen 10 imágenes de test, todas correctas, aplicando el mismo preprocesado.

El redimensionado y `preprocess_input` quedan fuera del modelo. Integrarlos como capas facilitaría su uso futuro.

## Aspecto 6 — Estudio, posibles mejoras y criterio de selección

**Calificación: 6/10.**

El planteamiento es correcto y compacto:
- Comparación congelado frente a *fine-tuning* en dos fases.
- Preprocesado propio de cada red.
- BatchNorm congeladas.
- Selección por accuracy de validación (10 % del entrenamiento), con el test reservado.
- El modelo guardado se recarga y se prueba.

El criterio es adecuado. Pero el estudio es corto y el análisis casi inexistente.

Puntos a mejorar:
- **Empate sin resolver:** la diferencia entre los dos *fine-tuning* es de 0,10 puntos en validación (2 imágenes de 2 000) y 0,09 en test, con una sola ejecución y sin semilla fijada. ResNet50 tiene menor pérdida de test (0,0498 frente a 0,0553). Convendría un criterio de desempate o repetir con varias semillas.
- **Valor de la última época:** se toma la accuracy de validación de la última época, aunque VGG16 llegó al 99,05 % en la época 4 de *fine-tuning*. Una parada temprana con `restore_best_weights` o un `ModelCheckpoint` lo aprovecharía.
- **Afirmaciones no respaldadas:** la conclusión dice que ResNet50 tiene «un menor número de errores aunque con un mayor tiempo de ejecución». En test tiene más errores (accuracy 98,48 % frente a 98,57 %), y el tiempo no se mide.
- **Alcance:** solo dos modelos y una cabeza, usando un tercio del conjunto de entrenamiento. Se podría variar la resolución (64 es poco para ResNet50: el mapa final queda en 2×2), la cabeza (Dropout) o probar redes más ligeras (MobileNetV2, EfficientNet).
- **Análisis:** falta explicar por qué el *fine-tuning* mejora tanto (de 95,6 a 98,6 % en VGG16) y comparar con las CNN de la práctica 3.

## Retroalimentación global

Implementación técnicamente correcta y limpia: base congelada, preprocesado adecuado, *fine-tuning* en dos fases con las BatchNorm congeladas, selección por validación, y el modelo guardado, recargado y probado. Lo que más resta es la parte de análisis y visualización. Para mejorar:
- Añadir matrices de confusión, errores, tiempos y curvas de entrenamiento.
- Fijar semillas y quedarse con la mejor época.
- Resolver el empate VGG16/ResNet50 con un criterio explícito.
- Escribir una conclusión que concuerde con los números y explique los resultados.
