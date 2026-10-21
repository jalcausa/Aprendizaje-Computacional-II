/* Banco de preguntas · Tema 2 (teoría CNN + prácticas 3 y 4) */
window.PREGUNTAS = (window.PREGUNTAS || []).concat([

/* ----------------------------------------------------------------- T2 teoría */
{ id: "t2-01", t: "T2", p: null, k: "teoria", s: "Motivación CNN",
  q: "¿Qué problema de las capas densas (fully connected) motivó las CNN según las diapositivas?",
  o: ["No pueden tener funciones de activación", "No son invariantes a traslaciones", "No se pueden entrenar con backprop", "Solo admiten entradas binarias"],
  a: 1, e: "Una densa conecta cada píxel con cada neurona: un rasgo desplazado activa pesos distintos. Además tiene muchos más parámetros.", r: "apuntes/tema-2.html#t2-intro" },

{ id: "t2-02", t: "T2", p: null, k: "teoria", s: "Motivación CNN",
  q: "¿Qué tres ideas dan a las CNN invarianza a traslaciones y distorsiones? (Selecciona todas)",
  o: ["Localidad", "Pesos compartidos", "Submuestreo espacial/temporal", "Conexión total entre capas"],
  a: [0, 1, 2], e: "Localidad (campos receptivos pequeños), pesos compartidos (el mismo filtro en todas las posiciones) y submuestreo (pooling/stride).", r: "apuntes/tema-2.html#t2-intro" },

{ id: "t2-03", t: "T2", p: null, k: "teoria", s: "Convolución",
  q: "Según la definición de las diapositivas, la convolución mide…",
  o: ["la distancia euclídea entre dos funciones", "el solapamiento entre dos funciones cuando una se invierte y se desplaza", "el máximo de una función en una ventana", "la derivada de una función"],
  a: 1, e: "$(f*g)(x)=\\int f(z)g(x-z)dz$: una función se invierte ($-z$) y se desplaza ($x$).", r: "apuntes/tema-2.html#t2-conv" },

{ id: "t2-04", t: "T2", p: null, k: "teoria", s: "Convolución",
  q: "¿Qué calculan realmente las capas <code>Conv2D</code> de Keras y PyTorch?",
  o: ["La convolución con el kernel invertido 180°", "La correlación cruzada (sin invertir el kernel); como el filtro se aprende, la diferencia es irrelevante", "Una transformada de Fourier", "El producto matricial de toda la imagen"],
  a: 1, e: "Los frameworks implementan correlación cruzada. Si hiciera falta, la red aprendería el filtro ya invertido.", r: "apuntes/tema-2.html#t2-conv" },

{ id: "t2-05", t: "T2", p: null, k: "calculo", s: "Convolución",
  q: "Correlación cruzada (lo que hace Conv2D) de la entrada [[1,2,3],[4,5,6],[7,8,9]] con el kernel [[1,2,1],[0,0,0],[−1,−2,−1]], sin padding. Resultado:",
  o: ["24", "−24", "0", "−32"],
  a: 1, e: "(1·1+2·2+3·1) − (7·1+8·2+9·1) = 8 − 32 = −24. Con la convolución «con inversión» saldría +24.", r: "apuntes/tema-2.html#t2-ej-conv" },

{ id: "t2-06", t: "T2", p: null, k: "calculo", s: "Convolución",
  q: "Entrada [[1,2,3],[4,5,6],[7,8,9]] y kernel [[1,2],[2,1]], sin padding y stride 1. ¿Resultado?",
  o: ["[[18, 24], [36, 42]]", "[[12, 18], [30, 36]]", "[[18, 36], [24, 42]]", "[[5, 7], [11, 13]]"],
  a: 0, e: "1+4+8+5 = 18; 2+6+10+6 = 24; 4+10+14+8 = 36; 5+12+16+9 = 42. Como el kernel es simétrico bajo un giro de 180°, convolución y correlación coinciden.", r: "apuntes/tema-2.html#t2-ej-conv" },

{ id: "t2-07", t: "T2", p: null, k: "calculo", s: "Tamaño de salida",
  q: "Entrada 200×200 → Conv 3×3, stride 1, padding 0 → MaxPool 3×3, stride 1. ¿Tamaño final?",
  o: ["198×198", "196×196", "194×194", "66×66"],
  a: 1, e: "Conv: (200−3+0)/1+1 = 198. Pool: (198−3)/1+1 = 196.", r: "apuntes/tema-2.html#t2-ej-dim" },

{ id: "t2-08", t: "T2", p: null, k: "calculo", s: "Tamaño de salida",
  q: "Entrada 200×200 → Conv 3×3, stride 2, padding 1 → AvgPool 3×3, stride 1. ¿Tamaño final?",
  o: ["100×100", "98×98", "99×99", "97×97"],
  a: 1, e: "Conv: ⌊(200−3+2)/2⌋+1 = ⌊99,5⌋+1 = 100. Pool: (100−3)/1+1 = 98.", r: "apuntes/tema-2.html#t2-ej-dim" },

{ id: "t2-09", t: "T2", p: null, k: "calculo", s: "Tamaño de salida",
  q: "Entrada 200×200 → Conv 5×5, stride 1, padding 1 → AvgPool 5×5, stride 2. ¿Tamaño final?",
  o: ["98×98", "97×97", "96×96", "99×99"],
  a: 1, e: "Conv: 200−5+2+1 = 198. Pool: ⌊(198−5)/2⌋+1 = ⌊96,5⌋+1 = 97.", r: "apuntes/tema-2.html#t2-ej-dim" },

{ id: "t2-10", t: "T2", p: null, k: "calculo", s: "Tamaño de salida",
  q: "Una imagen 32×32×3 pasa por <code>Conv2D(10, kernel_size=5, strides=1, padding='valid')</code>. ¿Forma de salida y nº de parámetros?",
  o: ["28×28×10 · 760 parámetros", "28×28×10 · 250 parámetros", "32×32×10 · 760 parámetros", "28×28×3 · 750 parámetros"],
  a: 0, e: "Tamaño: 32−5+1 = 28; canales = nº de filtros = 10. Parámetros: (5·5·3 + 1)·10 = 760.", r: "apuntes/tema-2.html#t2-params" },

{ id: "t2-11", t: "T2", p: null, k: "calculo", s: "Parámetros",
  q: "¿Cuántos parámetros tiene <code>Conv2D(64, 3)</code> aplicada sobre un mapa de forma (13, 13, 32)?",
  o: ["576", "18 432", "18 496", "346 112"],
  a: 2, e: "(3·3·32 + 1)·64 = 289·64 = 18 496. El tamaño espacial 13×13 no influye.", r: "apuntes/tema-2.html#t2-params" },

{ id: "t2-12", t: "T2", p: null, k: "teoria", s: "Capas conv",
  q: "¿Qué efecto tiene aumentar el <strong>stride</strong> de una convolución?",
  o: ["Aumenta el tamaño del mapa de características", "Reduce el tamaño del mapa y hace perder resolución espacial", "Aumenta el número de parámetros", "Añade ceros alrededor de la entrada"],
  a: 1, e: "El filtro salta más posiciones: menos salidas, menos detalle. Stride 1 da mapas densos.", r: "apuntes/tema-2.html#t2-capa" },

{ id: "t2-13", t: "T2", p: null, k: "teoria", s: "Capas conv",
  q: "Con <code>padding='same'</code> y stride 1…",
  o: ["la salida tiene la misma dimensión espacial que la entrada", "no se añade relleno", "la salida es siempre 1×1", "se duplica el número de canales"],
  a: 0, e: "Same padding añade los ceros necesarios para conservar el tamaño. Valid (sin padding) reduce la salida y puede perder información del borde.", r: "apuntes/tema-2.html#t2-capa" },

{ id: "t2-14", t: "T2", p: null, k: "teoria", s: "Capas conv",
  q: "Sobre el tamaño del filtro, ¿qué es correcto?",
  o: ["Filtros grandes capturan más contexto y patrones complejos pero producen mapas más pequeños", "Filtros pequeños producen mapas más pequeños", "El tamaño del filtro no afecta al tamaño del mapa", "Los filtros grandes tienen menos parámetros"],
  a: 0, e: "Grande: contexto amplio, mapa menor, más parámetros. Pequeño: detalles finos, mapa mayor.", r: "apuntes/tema-2.html#t2-capa" },

{ id: "t2-15", t: "T2", p: null, k: "teoria", s: "Pooling",
  q: "¿Qué afirmaciones sobre las capas de pooling son correctas? (Selecciona todas)",
  o: ["Reducen las dimensiones espaciales", "No tienen parámetros aprendibles", "Aportan robustez frente a pequeños desplazamientos", "Aumentan el número de canales"],
  a: [0, 1, 2], e: "Pooling reduce resolución, no aprende nada y da invarianza local. El número de canales no cambia.", r: "apuntes/tema-2.html#t2-pool" },

{ id: "t2-16", t: "T2", p: null, k: "calculo", s: "Pooling",
  q: "MaxPooling 2×2 con stride 2 sobre [[1,3,2,1],[4,6,5,0],[3,1,1,2],[0,2,7,2]]. ¿Resultado?",
  o: ["[[6,5],[3,7]]", "[[3.5,2],[1.5,3]]", "[[4,5],[3,7]]", "[[6,5],[2,7]]"],
  a: 0, e: "Máximos de cada bloque 2×2: {1,3,4,6}→6, {2,1,5,0}→5, {3,1,0,2}→3, {1,2,7,2}→7. La opción con decimales es el average pooling.", r: "apuntes/tema-2.html#t2-pool" },

{ id: "t2-17", t: "T2", p: null, k: "teoria", s: "Pooling",
  q: "Según las diapositivas, el average pooling es…",
  o: ["un caso especial de capa convolucional (con pesos fijos 1/k²)", "equivalente a Dropout", "una capa con parámetros aprendibles", "lo mismo que max pooling"],
  a: 0, e: "Promediar una ventana es convolucionar con un kernel constante 1/k², que no se aprende.", r: "apuntes/tema-2.html#t2-pool" },

{ id: "t2-18", t: "T2", p: null, k: "teoria", s: "Pooling",
  q: "Global Average Pooling (GAP) transforma un mapa de forma (7, 7, 128) en…",
  o: ["(1, 1) ", "un vector de 128 valores (un promedio por canal)", "un vector de 6 272 valores", "(7, 7)"],
  a: 1, e: "GAP promedia todo el mapa de cada canal. Sustituye a Flatten + Dense grandes (GoogLeNet), pero pierde dónde aparece cada rasgo.", r: "apuntes/tema-2.html#t2-pool" },

{ id: "t2-19", t: "T2", p: null, k: "teoria", s: "Otras capas",
  q: "¿Qué ocurre si se apilan varias convoluciones <strong>sin</strong> función de activación entre ellas?",
  o: ["La red aprende más rápido", "Equivalen a una única convolución lineal", "Aumenta la invarianza a traslaciones", "No se puede entrenar"],
  a: 1, e: "La composición de operaciones lineales es lineal: sin activación no se capturan rasgos no lineales ni jerarquías.", r: "apuntes/tema-2.html#t2-otras" },

{ id: "t2-20", t: "T2", p: null, k: "teoria", s: "Otras capas",
  q: "Según las diapositivas, ¿dónde se coloca normalmente la Batch Normalization en una CNN?",
  o: ["Antes de la convolución", "Después de la convolución y antes de la función de activación", "Después del Flatten únicamente", "Al final de la red, tras softmax"],
  a: 1, e: "Conv (sin sesgo) → BN → ReLU. BN acelera y estabiliza el entrenamiento.", r: "apuntes/tema-2.html#t2-otras" },

{ id: "t2-21", t: "T2", p: null, k: "teoria", s: "Otras capas",
  q: "¿Por qué la convolución previa a una BatchNorm suele crearse con <code>use_bias=False</code>?",
  o: ["Porque BN no admite sesgos", "Porque BN resta la media (anulando el sesgo) y ya tiene su propio desplazamiento aprendible β", "Para que la red sea más profunda", "Porque el sesgo provoca sobreajuste"],
  a: 1, e: "Cualquier sesgo constante desaparece al restar la media del lote; β cumple esa función.", r: "apuntes/tema-2.html#t2-otras" },

{ id: "t2-22", t: "T2", p: null, k: "teoria", s: "Otras capas",
  q: "Recomendación de las diapositivas sobre Dropout en CNN:",
  o: ["Tasas más altas en las capas conv que en las densas", "Tasas más bajas en las capas conv que en las densas, normalmente tras el pooling", "Dropout solo antes de la primera convolución", "Nunca usar Dropout en CNN"],
  a: 1, e: "Ejemplo P3: 0,25 tras cada pooling y 0,5 tras la densa. Reduce la correlación entre mapas y mejora la generalización.", r: "apuntes/tema-2.html#t2-otras" },

{ id: "t2-23", t: "T2", p: null, k: "teoria", s: "Capas conv",
  q: "Dos convoluciones 3×3 consecutivas (stride 1) tienen un campo receptivo equivalente a…",
  o: ["3×3", "5×5", "6×6", "9×9"],
  a: 1, e: "Cada 3×3 añade 2 píxeles: 3 → 5. Con menos parámetros que una 5×5 y una no linealidad extra (idea de VGG).", r: "apuntes/tema-2.html#t2-campo" },

{ id: "t2-24", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "¿Qué rasgos corresponden a <strong>LeNet-5</strong>? (Selecciona todas)",
  o: ["Diseñada por Yann LeCun en 1998 para dígitos manuscritos", "Activaciones sigmoide/tanh y average pooling 2×2", "Introdujo las conexiones residuales", "3 capas densas de 120, 84 y 10 neuronas"],
  a: [0, 1, 3], e: "LeNet-5: 2 conv + 2 avg pool + 3 densas, entrada 32×32, tanh/sigmoide. Las residuales son de ResNet.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-25", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "¿Qué introdujo <strong>AlexNet</strong> (ganadora de ImageNet 2012)?",
  o: ["Módulos Inception con ramas paralelas", "ReLU, max pooling solapado, LRN y Dropout en las capas densas; entrenada en 2 GPU", "Bloques densos con concatenación", "Average pooling y tanh"],
  a: 1, e: "AlexNet: 5 conv + 3 densas, ReLU (entrenamiento más rápido), overlapping max pooling, Local Response Normalization, Dropout, data augmentation y SGD con momentum.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-26", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "¿Cuál es la idea central de <strong>VGG</strong>?",
  o: ["Ramas paralelas con filtros 1×1, 3×3 y 5×5", "Red profunda y uniforme de bloques con filtros pequeños 3×3: más profundidad con filtros pequeños mejora el rendimiento", "Sumar la entrada a la salida de cada bloque", "Clasificadores auxiliares"],
  a: 1, e: "VGG (Oxford, 2014) introdujo la idea de bloques: 16–19 capas, casi todas 3×3 + ReLU + max pooling, y 3 densas. Muy usada para transfer learning.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-27", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "En el módulo Inception de GoogLeNet, ¿para qué sirven las convoluciones 1×1?",
  o: ["Para aumentar la resolución", "Para reducir la dimensionalidad (número de canales) y abaratar las ramas 3×3 y 5×5", "Para detectar bordes", "Para sustituir a la función de activación"],
  a: 1, e: "Una conv 1×1 mezcla canales en cada píxel; con pocos filtros reduce canales antes de las convoluciones caras.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-28", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "¿Para qué usa GoogLeNet 2 clasificadores auxiliares durante el entrenamiento?",
  o: ["Para clasificar en paralelo dos datasets", "Para combatir el desvanecimiento del gradiente inyectando señal en capas intermedias", "Para reducir el número de parámetros", "Para hacer data augmentation"],
  a: 1, e: "Los clasificadores intermedios mejoran el aprendizaje en una red de 22 capas; se descartan en inferencia.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-29", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "Diferencia clave entre ResNet y DenseNet:",
  o: ["ResNet concatena; DenseNet suma", "ResNet suma la entrada a la salida del bloque; DenseNet concatena las salidas de todas las capas anteriores", "Ambas concatenan", "DenseNet no usa BatchNorm"],
  a: 1, e: "ResNet: $y=F(x)+x$. DenseNet: cada capa recibe $[x_0,\\dots,x_{l-1}]$ concatenados; mucha reutilización de rasgos y alto coste computacional.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-30", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "En DenseNet, ¿qué son las <em>capas de transición</em>?",
  o: ["Las capas densas finales", "Las que conectan bloques densos: BatchNorm, conv 1×1 y average pooling", "Capas de Dropout entre bloques", "Las conexiones residuales"],
  a: 1, e: "Reducen canales (1×1) y resolución (avg pool) entre bloques densos.", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-31", t: "T2", p: null, k: "teoria", s: "Arquitecturas",
  q: "¿Qué ventaja aportan las <em>skip connections</em> de ResNet?",
  o: ["Eliminan la necesidad de entrenar", "Permiten que el gradiente fluya mejor y entrenar redes muy profundas aprendiendo funciones residuales", "Reducen la resolución", "Sustituyen a la función de activación"],
  a: 1, e: "El camino identidad facilita el flujo del gradiente; hay variantes de 34, 50, 101 y 152 capas (bottleneck en las profundas).", r: "apuntes/tema-2.html#t2-modelos" },

{ id: "t2-32", t: "T2", p: null, k: "teoria", s: "Transfer learning",
  q: "En la <strong>extracción de características</strong> con una red preentrenada…",
  o: ["se reentrenan todos los pesos desde cero", "se congela la base y solo se entrena una cabeza clasificadora nueva", "se descongela toda la red con una tasa alta", "se usa la red sin modificar su clasificador de 1 000 clases"],
  a: 1, e: "Base congelada (requires_grad=False / trainable=False) + cabeza nueva. Es rápido y barato.", r: "apuntes/tema-2.html#t2-transfer" },

{ id: "t2-33", t: "T2", p: null, k: "teoria", s: "Transfer learning",
  q: "Al hacer <strong>ajuste fino</strong> (fine-tuning) de una red preentrenada se recomienda…",
  o: ["una tasa de aprendizaje mayor que al entrenar la cabeza", "una tasa de aprendizaje pequeña (p. ej. 10 veces menor) para no destruir los filtros aprendidos", "reinicializar los pesos de la base", "eliminar la normalización de entrada"],
  a: 1, e: "El ajuste debe ser sutil. En la P4: Adam 10⁻³ para la cabeza y 10⁻⁴ para el ajuste fino.", r: "apuntes/tema-2.html#t2-transfer" },

{ id: "t2-34", t: "T2", p: null, k: "teoria", s: "Transfer learning",
  q: "Para usar MNIST con una red preentrenada en ImageNet hay que… (Selecciona todas)",
  o: ["Redimensionar las imágenes a una resolución mayor", "Replicar el canal de gris en 3 canales", "Normalizar con la media y desviación de ImageNet (o el preprocess_input de la red)", "Convertir las etiquetas a 1 000 clases"],
  a: [0, 1, 2], e: "Las redes esperan imágenes RGB, más grandes y normalizadas como en ImageNet. Las etiquetas se quedan en 10 clases con una cabeza nueva.", r: "apuntes/tema-2.html#t2-adaptar" },

{ id: "t2-35", t: "T2", p: null, k: "teoria", s: "Transfer learning",
  q: "¿Dónde están los modelos preentrenados en cada framework?",
  o: ["TF: <code>tf.keras.applications</code> · PyTorch: <code>torchvision.models</code>", "TF: <code>tf.data</code> · PyTorch: <code>torch.optim</code>", "TF: <code>tf.keras.layers</code> · PyTorch: <code>torch.nn</code>", "Ambos en <code>sklearn.models</code>"],
  a: 0, e: "Ej.: <code>VGG16(include_top=False, weights='imagenet')</code> y <code>vgg16(weights=VGG16_Weights.DEFAULT)</code>.", r: "apuntes/tema-2.html#t2-adaptar" },

{ id: "t2-36", t: "T2", p: null, k: "codigo", s: "Transfer learning",
  q: "¿Qué hace este código de Keras?",
  c: `base = VGG16(include_top=False, weights='imagenet', input_shape=(224, 224, 3))
base.trainable = False`,
  o: ["Carga VGG16 sin sus capas densas finales y congela todos sus pesos", "Carga VGG16 con pesos aleatorios", "Entrena VGG16 desde cero", "Carga solo las capas densas de VGG16"],
  a: 0, e: "<code>include_top=False</code> quita el clasificador de ImageNet; <code>trainable=False</code> congela la base para extraer características.", r: "apuntes/tema-2.html#t2-adaptar" },

{ id: "t2-37", t: "T2", p: null, k: "teoria", s: "Transfer learning",
  q: "Durante el fine-tuning de una red con BatchNorm, lo recomendado es…",
  o: ["Dejar las BN en modo entrenamiento para que se adapten a los dígitos", "Mantener las BN congeladas y en modo inferencia, para no contaminar sus estadísticas de ImageNet con lotes de dígitos", "Eliminar todas las BN", "Duplicar el momentum de las BN"],
  a: 1, e: "En PyTorch <code>module.eval()</code> (y reaplicarlo tras <code>model.train()</code>); en Keras, llamar a la base con <code>training=False</code>.", r: "apuntes/tema-2.html#t2-adaptar" },

/* ----------------------------------------------------------------- P3 */
{ id: "p3-01", t: "T2", p: "P3", k: "codigo", s: "Práctica 3",
  q: "¿Por qué falla este modelo al entrenar con <code>x_train</code> de forma (60000, 28, 28)?",
  c: `model = tf.keras.Sequential([
    layers.Input(shape=(28, 28)),
    layers.Conv2D(32, 3, activation='relu'),
    layers.Flatten(),
    layers.Dense(10, activation='softmax')])`,
  o: ["Falta la función de activación", "Conv2D espera tensores (alto, ancho, canales): hay que añadir el canal → (28, 28, 1)", "Debería usar Conv1D", "Flatten no puede ir tras Conv2D"],
  a: 1, e: "En la P3 se usa <code>(imagenes / 255.0)[..., np.newaxis]</code> e <code>Input(shape=(28, 28, 1))</code>.", r: "apuntes/tema-2.html#p3-datos" },

{ id: "p3-02", t: "T2", p: "P3", k: "calculo", s: "Práctica 3",
  q: "En <code>cnn-2conv-maxpool</code> (Conv 3×3 valid → MaxPool 2 → Conv 3×3 valid → MaxPool 2) con 64 filtros en la segunda conv, ¿cuántos valores produce Flatten?",
  o: ["1 600", "3 136", "5 408", "2 304"],
  a: 0, e: "28 → 26 → 13 → 11 → 5 (⌊11/2⌋). 5·5·64 = 1 600.", r: "apuntes/tema-2.html#p3-arqs" },

{ id: "p3-03", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "<code>cnn-1conv</code> tiene 693 962 parámetros y <code>cnn-2conv-maxpool</code> solo 225 034. ¿Por qué tiene menos la red con más convoluciones?",
  o: ["Porque la segunda conv no tiene sesgos", "Porque la segunda conv + pool reduce la salida de Flatten de 5 408 a 1 600 valores y la capa Dense (que concentra casi todos los parámetros) se hace mucho más pequeña", "Porque usa average pooling", "Es un error de conteo"],
  a: 1, e: "Dense(128) tras 5 408 entradas ≈ 692 k parámetros; tras 1 600 ≈ 205 k.", r: "apuntes/tema-2.html#p3-arqs" },

{ id: "p3-04", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "LeNet-5 (61 706 parámetros) comete menos errores que el MLP de referencia (101 770). ¿Qué demuestra?",
  o: ["Que más parámetros siempre es peor", "Que la ventaja de las CNN no se debe solo al número de parámetros: localidad, pesos compartidos y pooling son un sesgo inductivo adecuado para imágenes", "Que tanh es mejor que ReLU", "Nada, es casualidad"],
  a: 1, e: "Con un 40 % menos de parámetros, LeNet obtiene 125 errores de validación frente a 139 (159 frente a 229 en test).", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-05", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "¿Por qué la red con <strong>Global Average Pooling</strong> (cnn-bn-gap) fue de las peores CNN en MNIST?",
  o: ["Porque tenía demasiados parámetros", "Porque al promediar cada mapa pierde dónde aparece cada rasgo, y en un dígito la posición relativa de los trazos es esencial; con solo 3 capas el campo receptivo es pequeño", "Porque no usaba BatchNorm", "Porque usaba stride 2"],
  a: 1, e: "Un 4 y un 9 tienen rasgos parecidos en lugares distintos. GAP funciona en redes muy profundas (GoogLeNet).", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-06", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "Sustituir el pooling por convoluciones con stride 2 (<code>cnn-2conv-stride2</code>) produjo…",
  o: ["la mejor exactitud de todas", "la CNN más rápida, pero 27 errores de validación más: se analizan menos posiciones y se pierde detalle", "más parámetros y más precisión", "el mismo resultado exacto"],
  a: 1, e: "1,8 s/época frente a 4,7 s, pero 99 errores frente a 72.", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-07", t: "T2", p: "P3", k: "calculo", s: "Práctica 3",
  q: "<code>cnn-2conv-bn-dropout</code> tiene 288 parámetros más que <code>cnn-2conv-maxpool</code> (32 y 64 filtros). ¿De dónde salen?",
  o: ["De Dropout", "Se quitan 96 sesgos de las conv (use_bias=False) y se añaden 384 de BN (4 por canal: γ, β, media y varianza móviles): +288", "De una capa densa extra", "Del Flatten"],
  a: 1, e: "BN: 4·(32+64) = 384; sesgos eliminados: 32+64 = 96. 384 − 96 = 288 (las medias/varianzas móviles no son entrenables).", r: "apuntes/tema-2.html#p3-arqs" },

{ id: "p3-08", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "¿Qué arquitectura ganó la P3 (por validación) y con qué resultado?",
  o: ["cnn-2conv-dropout · 70 errores", "vgg-bn-dropout · 98,97 % val (62 errores), 99,18 % test (82 errores)", "lenet5 · 125 errores", "cnn-bn-gap · 124 errores"],
  a: 1, e: "Dos bloques [Conv-BN-ReLU ×2 → MaxPool → Dropout 0,25] con 32 y 64 filtros, Dense 128 + Dropout 0,5. 468 394 parámetros.", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-09", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "En test, <code>cnn-2conv-bn-dropout</code> (78 errores) supera a la ganadora (82). ¿Qué hay que hacer?",
  o: ["Cambiar la elección al mejor en test", "Mantener la elección hecha con validación: las tres mejores están en empate técnico y cambiarla mirando el test invalidaría la estimación", "Repetir solo con la del test", "Descartar ambas"],
  a: 1, e: "4 imágenes de 10 000 están dentro del ruido. La correlación de Spearman val–test (0,94) muestra que el orden es muy parecido.", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-10", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "Añadir Dropout a <code>cnn-2conv-maxpool</code> apenas cambió los errores de validación (72 → 70). ¿Qué sí mejoró claramente?",
  o: ["El tiempo de entrenamiento", "La menor pérdida de validación de todas y 117 → 81 errores en test: permite entrenar más épocas sin sobreajustar", "El número de parámetros", "Nada"],
  a: 1, e: "Sin Dropout la val_loss sube desde la época 6; con Dropout se aprovechan 11 épocas útiles.", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-11", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "Max pooling obtuvo 11 errores de validación menos que average pooling. ¿Explicación razonable?",
  o: ["Average tiene más parámetros", "Max conserva la respuesta más intensa (¿aparece el trazo?), mientras que la media la diluye con el fondo negro", "Max reduce más la resolución", "Average no es invariante a traslaciones"],
  a: 1, e: "Aun así la ventaja es pequeña y en test empatan (117 frente a 116).", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-12", t: "T2", p: "P3", k: "codigo", s: "Práctica 3",
  q: "¿Qué orden de capas sigue la recomendación de las diapositivas?",
  c: `# Opción A
layers.Conv2D(32, 3, activation='relu'), layers.BatchNormalization()
# Opción B
layers.Conv2D(32, 3, use_bias=False), layers.BatchNormalization(), layers.Activation('relu')`,
  o: ["La opción A", "La opción B", "Las dos son idénticas", "Ninguna de las dos"],
  a: 1, e: "BN después de la conv y antes de la activación, y conv sin sesgo. Es lo que hace la función <code>conv(..., batch_norm=True)</code> de la P3.", r: "apuntes/tema-2.html#p3-arqs" },

{ id: "p3-13", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "¿Qué tienen en común las mejores redes de la P3?",
  o: ["Usan GAP y tanh", "Al menos dos niveles de convolución con ReLU, MaxPooling y regularización (Dropout y/o BatchNorm)", "Una única convolución muy grande", "Stride 2 en todas las capas"],
  a: 1, e: "La regularización permite entrenar más épocas sin que la validación empeore.", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-14", t: "T2", p: "P3", k: "practica", s: "Práctica 3",
  q: "Si importa el coste, ¿qué alternativa a la ganadora recomienda la P3?",
  o: ["mlp-referencia", "cnn-2conv-dropout: casi la misma exactitud con la mitad de parámetros y 1/5 del tiempo", "cnn-bn-gap", "lenet5"],
  a: 1, e: "70 errores de validación y 81 en test, 225 k parámetros, ≈72 s frente a 363 s.", r: "apuntes/tema-2.html#p3-resultados" },

{ id: "p3-15", t: "T2", p: "P3", k: "calculo", s: "Práctica 3",
  q: "LeNet-5 de la P3: Conv 6@5×5 <em>same</em> → AvgPool 2 → Conv 16@5×5 <em>valid</em> → AvgPool 2 → Flatten. ¿Cuántos valores salen del Flatten?",
  o: ["400", "784", "576", "256"],
  a: 0, e: "28 (same) → 14 → 10 (14−5+1) → 5. 5·5·16 = 400.", r: "apuntes/tema-2.html#p3-arqs" },

/* ----------------------------------------------------------------- P4 */
{ id: "p4-01", t: "T2", p: "P4", k: "codigo", s: "Práctica 4",
  q: "¿Qué hace este módulo de la P4?",
  c: `def forward(self, x):                       # x: (n, 1, 28, 28) en [0, 1]
    x = F.interpolate(x, size=(self.res, self.res), mode='bilinear', align_corners=False)
    x = x.expand(-1, 3, -1, -1)
    return (x - self.mean) / self.std`,
  o: ["Data augmentation aleatoria", "Adapta la entrada MNIST a la red de ImageNet: redimensiona, replica el gris en 3 canales y normaliza con media/desviación de ImageNet", "Calcula la pérdida", "Convierte la imagen a escala de grises"],
  a: 1, e: "Al estar dentro del modelo, el modelo exportado acepta directamente (n, 1, 28, 28).", r: "apuntes/tema-2.html#p4-pre" },

{ id: "p4-02", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "¿Qué ventaja tiene meter la adaptación de entrada <strong>dentro</strong> del modelo?",
  o: ["Entrena más rápido", "Quien reutilice el modelo guardado solo pasa imágenes (n, 1, 28, 28) en [0,1]: no tiene que repetir a mano redimensionado, canales ni normalización", "Reduce el número de parámetros", "Evita usar GPU"],
  a: 1, e: "Varias entregas dejaban el preprocesado fuera, obligando al usuario a recordarlo.", r: "apuntes/tema-2.html#p4-pre" },

{ id: "p4-03", t: "T2", p: "P4", k: "codigo", s: "Práctica 4",
  q: "¿Para qué se usa <code>register_buffer</code> con la media y desviación de ImageNet?",
  c: `self.register_buffer('mean', torch.tensor(IMAGENET_MEAN).view(1, 3, 1, 1))`,
  o: ["Para que sean parámetros entrenables", "Para que viajen con el modelo (.to(device), state_dict) sin ser parámetros entrenables", "Para acelerar el backprop", "Para ocultarlos del forward"],
  a: 1, e: "Un buffer es estado del módulo que no recibe gradientes.", r: "apuntes/tema-2.html#p4-pre" },

{ id: "p4-04", t: "T2", p: "P4", k: "codigo", s: "Práctica 4",
  q: "¿Qué consigue <code>net.fc = nn.Identity()</code> en ResNet50?",
  o: ["Congela la red", "Sustituye el clasificador de 1 000 clases por «no hacer nada»: la red devuelve el vector de 2 048 características", "Añade una capa de 10 clases", "Elimina el pooling"],
  a: 1, e: "Así la base actúa como extractor de características para la cabeza nueva.", r: "apuntes/tema-2.html#p4-base" },

{ id: "p4-05", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "ResNet50 con <strong>pesos aleatorios</strong> congelados y cabeza MLP obtuvo exactamente un 10 % en validación. ¿Qué significa?",
  o: ["Que acertó 1 de cada 10 al azar con buena distribución", "Que predecía siempre la misma clase (600 aciertos de 6 000): con pesos aleatorios las características no discriminan; lo que se transfiere son filtros útiles, no solo la arquitectura", "Que el código tenía un error", "Que la tasa de aprendizaje era 0"],
  a: 1, e: "Con ImageNet y cabeza lineal: 190 errores; con pesos aleatorios: 597 (lineal) o colapso total (MLP).", r: "apuntes/tema-2.html#p4-lecciones" },

{ id: "p4-06", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "¿Qué factor influyó más en el resultado de la P4?",
  o: ["Cabeza lineal frente a MLP", "Pasar de base congelada a ajuste fino (parcial o total): reduce los errores entre un 59 % y un 82 %", "La resolución 32 frente a 64", "Usar VGG19 en vez de VGG16"],
  a: 1, e: "Las capas altas de ImageNet están especializadas en fotografías en color; ajustarlas las adapta a trazos grises.", r: "apuntes/tema-2.html#p4-lecciones" },

{ id: "p4-07", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "¿Por qué el ajuste fino parte de la cabeza MLP ya entrenada en la fase A y no de una cabeza aleatoria?",
  o: ["Para ahorrar memoria", "Para que los primeros gradientes que llegan a la base sean pequeños y coherentes y no destruyan los filtros preentrenados", "Porque PyTorch lo exige", "Para que la red tenga menos parámetros"],
  a: 1, e: "Es la receta clásica en dos fases: primero la cabeza con la base congelada, luego el ajuste fino con tasa baja.", r: "apuntes/tema-2.html#t2-transfer" },

{ id: "p4-08", t: "T2", p: "P4", k: "codigo", s: "Práctica 4",
  q: "En este bucle de ajuste fino falta una línea importante tras <code>model.train()</code>. ¿Cuál?",
  c: `for epoch in range(epochs):
    model.train()
    # ← ?
    for x_batch, y_batch in loader:
        optimizer.zero_grad()
        loss = criterion(model(x_batch), y_batch)
        loss.backward()
        optimizer.step()`,
  o: ["<code>torch.no_grad()</code>", "<code>freeze_bn_eval(model)</code>: <code>model.train()</code> vuelve a poner las BatchNorm en modo entrenamiento y hay que devolverlas a eval", "<code>model.eval()</code> para todo el modelo", "<code>loss.item()</code>"],
  a: 1, e: "Si no, las BN recalcularían estadísticas con lotes de dígitos. <code>model.eval()</code> entero también desactivaría el Dropout de la cabeza, que sí debe entrenar.", r: "apuntes/tema-2.html#p4-fit" },

{ id: "p4-09", t: "T2", p: "P4", k: "codigo", s: "Práctica 4",
  q: "¿Qué error hay en esta cabeza si se entrena con <code>nn.CrossEntropyLoss()</code>?",
  c: `head = nn.Sequential(nn.Linear(1024, 256), nn.ReLU(), nn.Dropout(0.5),
                     nn.Linear(256, 10), nn.Softmax(dim=1))
criterion = nn.CrossEntropyLoss()`,
  o: ["Ninguno", "CrossEntropyLoss ya aplica log-softmax a los logits: añadir Softmax lo aplica dos veces y degrada los gradientes", "Falta una sigmoide", "Dropout no puede ir en la cabeza"],
  a: 1, e: "En PyTorch la cabeza debe devolver logits. Para probabilidades, aplicar <code>torch.softmax</code> solo en inferencia.", r: "apuntes/tema-2.html#p4-base" },

{ id: "p4-10", t: "T2", p: "P4", k: "codigo", s: "Práctica 4",
  q: "¿Por qué se usa <code>copy.deepcopy</code> al guardar el mejor estado?",
  c: `best_state = copy.deepcopy({k: v.cpu() for k, v in model.state_dict().items()})
...
model.load_state_dict(best_state)`,
  o: ["Para comprimir los pesos", "Porque <code>state_dict()</code> devuelve referencias a los tensores que se siguen actualizando; sin copia, el «mejor» estado cambiaría con el entrenamiento", "Para mover el modelo a GPU", "No hace falta"],
  a: 1, e: "Es el equivalente a <code>restore_best_weights=True</code> de Keras. (En GPU, <code>.cpu()</code> ya crea una copia; en CPU devuelve el mismo tensor.)", r: "apuntes/tema-2.html#p4-fit" },

{ id: "p4-11", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "¿Qué configuración ganó la P4?",
  o: ["resnet50-32-ft-total", "densenet121-64-ft-total: 99,23 % val (46 errores) y 99,24 % test (76 errores)", "vgg16-32-congelada-mlp", "cnn-p3-desde-cero"],
  a: 1, e: "DenseNet121 a 64 px con ajuste fino total. La CNN de la P3 era solo referencia (no seleccionable).", r: "apuntes/tema-2.html#p4-resultados" },

{ id: "p4-12", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "¿Por qué AlexNet solo se probó a 64×64 y no a 32×32?",
  o: ["Porque es demasiado grande para la GPU", "Porque a 32×32 sus mapas de características se reducen a tamaño 0 antes del pooling final", "Porque no admite 3 canales", "Porque sus pesos no estaban disponibles"],
  a: 1, e: "Sus filtros grandes y strides iniciales reducen muy rápido la resolución.", r: "apuntes/tema-2.html#p4-lecciones" },

{ id: "p4-13", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "ResNet50, la mayor (24 M parámetros) y la mejor congelada, fue la peor en ajuste fino. ¿Explicación propuesta?",
  o: ["No tenía conexiones residuales", "Con lr 10⁻⁴ y BN congeladas, tantos parámetros se desajustan rápido: su val_loss mínima fue en la época 1; probablemente necesitaría una tasa menor (10⁻⁵)", "Porque usa concatenación", "Porque se entrenó en CPU"],
  a: 1, e: "La parada temprana se quedó con la primera época. No se comprobó experimentalmente la tasa menor.", r: "apuntes/tema-2.html#p4-lecciones" },

{ id: "p4-14", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "Comparada con la CNN de la P3, la ganadora de la P4…",
  o: ["es mucho mejor y más pequeña", "reduce los errores de validación un 26 % y de test un 7 %, con unas 15 veces más parámetros y necesitando GPU", "es peor en todo", "tiene los mismos parámetros"],
  a: 1, e: "MNIST es sencillo y lejano a ImageNet: el preentrenamiento aporta menos que en problemas con pocas imágenes o parecidos a fotografías.", r: "apuntes/tema-2.html#p4-lecciones" },

{ id: "p4-15", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "¿Por qué en la fase A (base congelada) las características se calculan <strong>una sola vez</strong>?",
  o: ["Porque la GPU no permite más", "Porque con la base congelada sus salidas no cambian: se guardan los vectores y las cabezas se entrenan sobre ellos, muy barato", "Para evitar el sobreajuste", "Porque las imágenes no cambian de tamaño"],
  a: 1, e: "Ese tiempo se mide aparte (<code>extract_seconds</code>) y lo comparten las dos cabezas del mismo extractor.", r: "apuntes/tema-2.html#t2-transfer" },

{ id: "p4-16", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "Diferencia entre guardar el modelo con TorchScript (<code>torch.jit.trace</code>) y guardar solo el <code>state_dict</code>:",
  o: ["Ninguna", "TorchScript guarda el grafo ejecutable y se carga sin el código de las clases; el state_dict solo tiene pesos y requiere redefinir la arquitectura", "El state_dict incluye el optimizador", "TorchScript solo guarda la cabeza"],
  a: 1, e: "La P4 intentó <code>torch.export</code> (.pt2), falló y usó TorchScript (.pt) como alternativa.", r: "apuntes/tema-2.html#p4-export" },

{ id: "p4-17", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "La cabeza MLP mejora a la lineal con VGG16 (412 → 345 errores) pero la empeora con ResNet50 (190 → 212). ¿Por qué?",
  o: ["Por un error de semilla", "Las características de ResNet50 ya son casi linealmente separables y la MLP solo añade varianza; las de VGG son más pobres y la capa oculta ayuda", "VGG tiene más capas", "La MLP no tiene Dropout"],
  a: 1, e: "La utilidad de una cabeza más compleja depende de la calidad del extractor.", r: "apuntes/tema-2.html#p4-lecciones" },

{ id: "p4-18", t: "T2", p: "P4", k: "practica", s: "Práctica 4",
  q: "En PyTorch, las imágenes de MNIST se representan como <code>(n, 1, 28, 28)</code>; en Keras (P3), como <code>(n, 28, 28, 1)</code>. ¿Por qué?",
  o: ["Por un error de la P4", "PyTorch usa formato channels-first y Keras channels-last", "PyTorch no admite canales", "Keras trabaja con imágenes transpuestas"],
  a: 1, e: "Es una convención de cada framework; hay que respetarla en las capas de convolución.", r: "apuntes/tema-2.html#p3-datos" }

]);
