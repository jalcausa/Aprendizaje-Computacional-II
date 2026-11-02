# Evaluación de la práctica 4 — Álvaro

## Aspecto 1 — Modelos pre-entrenados estudiados

**Número de modelos pre-entrenados: 3.**

Se comparan VGG16, ResNet50 y MobileNetV2 (ImageNet, `include_top=False`), con cuatro propuestas:
- Las tres bases congeladas, con la misma cabeza (GAP → Dense 128 → Dropout 0,3 → Dense 10), Adam (lr 1e-3) y 6 épocas.
- VGG16 con *fine-tuning* del `block5` (lr 1e-5, parada temprana).

Como referencia se añaden el MLP de la práctica 1 y la CNN de la práctica 3. Sus métricas están escritas a mano porque los `.keras` no se encontraron en el entorno.

## Aspecto 2 — Transferencia de conocimiento

**Calificación: Sí.**

Es la implementación más cuidada. La adaptación de la entrada va dentro del modelo:
- Paso a 3 canales con `Concatenate`.
- `Resizing` a 32×32.
- El `preprocess_input` propio de cada red, con los datos en 0–255.

La base se congela (`trainable=False`) y se llama con `training=False`, de modo que las BatchNorm de ResNet50 y MobileNetV2 mantienen sus estadísticas. El *fine-tuning* se hace bien: en dos fases, primero la cabeza con la base congelada y después solo `block5` con una tasa de aprendizaje muy baja.

Una salvedad: a 32×32, MobileNetV2 está fuera de las resoluciones para las que hay pesos (96–224), como avisa la propia salida.

## Aspecto 3 — Configuración con la mejor clasificación

**Calificación: Sí.**

El ganador se elige por accuracy de validación: VGG16 con *fine-tuning*. Tiene un 98,40 % en validación, 98,48 % en test (152 errores) y pérdida de 0,0548, con informe de clasificación por clase.

Sin embargo, la conclusión afirma que «supera el 99 % de exactitud en test», cifra que no coincide con la salida (98,48 %).

## Aspecto 4 — Visualización gráfica y numérica

**Calificación: 5/5.**

Presentación muy completa:
- Tabla ordenada con tiempo, accuracy de train/val/test y errores de test, que incluye las referencias de las prácticas 1 y 3.
- Barras horizontales de accuracy y de errores de test con los valores rotulados.
- Curvas de accuracy de train y validación por propuesta, marcando el inicio del *fine-tuning*.
- Matrices de confusión de test de las cuatro propuestas.
- `classification_report` del ganador.

Mejoras menores: faltan las curvas de pérdida y el número de parámetros de cada modelo.

## Aspecto 5 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`mejor_modelo_tl.save('mejor_modelo_transfer_learning_mnist.keras')` guarda la variable del ganador. Antes se reevalúa en test (0,9848) y la salida confirma el guardado. Es un acierto que el modelo guardado incluya la adaptación de la entrada: recibe directamente imágenes 28×28×1.

No se recarga para verificarlo. Convendría hacerlo, porque las capas `Lambda` pueden requerir `safe_mode=False` al cargar.

## Aspecto 6 — Estudio, posibles mejoras y criterio de selección

**Calificación: 7/10.**

Metodológicamente sólido:
- Validación estratificada del 10 % separada del test.
- Selección por accuracy de validación.
- Preprocesado correcto de cada red y BatchNorm en inferencia.
- *Fine-tuning* en dos fases con parada temprana y `restore_best_weights`.
- Semilla por modelo y comparación con las prácticas anteriores.
- Una explicación razonada de por qué los modelos congelados no superan a una CNN pequeña (cambio de dominio y compresión espacial).

El criterio es adecuado y la ventaja del ganador es clara (98,40 % frente a 94,92 % en validación).

Puntos a mejorar:
- **Conclusiones que no cuadran con las salidas:**
  - «Supera el 99 % en test»: es 98,48 %.
  - El *fine-tuning* «dispara la precisión hasta igualar a las redes específicas», pero son 152 errores frente a 79 de la CNN de la práctica 3, casi el doble.
- **Resolución:** se argumenta que a 224×224 en NumPy no cabría en memoria, pero el redimensionado ya está dentro del modelo, así que se podría haber probado 64, 96 o más sin ese problema. A 32×32 el mapa final queda en 1×1 y MobileNetV2 está fuera de rango.
  - Esto explica mejor su 66 % que la idea de que VGG y ResNet «preservan mejor la estructura geométrica».
- ***Fine-tuning* incompleto:** solo se ajusta VGG16, cuando ResNet50 era la mejor congelada. Habría que aplicarlo a ambas para comparar en igualdad.
- **Tiempo:** los 56 s del *fine-tuning* no incluyen los 49,7 s de la fase congelada previa, y las referencias de las prácticas 1 y 3 tienen tiempos y métricas copiados de otras sesiones, no reevaluados. La comparación de tiempos no es homogénea.
- **Ruido:** una sola semilla. Con la diferencia actual no es decisivo, pero convendría repetir.

## Retroalimentación global

Muy buena entrega: transferencia correctamente implementada (preprocesado dentro del modelo, base en inferencia, *fine-tuning* en dos fases), validación separada del test, visualización excelente, comparación con las prácticas anteriores y el modelo guardado. Para mejorarla:
- Corregir las cifras de la conclusión (98,48 %, no >99 %, y no iguala a la CNN propia).
- Aprovechar el redimensionado dentro del modelo para probar resoluciones mayores, sobre todo con MobileNetV2.
- Aplicar el *fine-tuning* también a ResNet50.
- Medir el tiempo total de cada propuesta y recargar el modelo guardado para verificarlo.
