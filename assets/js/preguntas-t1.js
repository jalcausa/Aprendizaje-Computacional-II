/* Banco de preguntas · Tema 1 (teoría + prácticas 0, 1 y 2)
   Campos: id, t (tema), p (práctica o null), k (teoria|practica|codigo|calculo), s (subtema),
   q (enunciado, admite HTML y $math$), c (código opcional), o (opciones), a (índice o lista de índices),
   e (explicación), r (enlace a los apuntes). */
window.PREGUNTAS = (window.PREGUNTAS || []).concat([

/* ----------------------------------------------------------------- T1 teoría */
{ id: "t1-01", t: "T1", p: null, k: "teoria", s: "Aprendizaje automático",
  q: "¿Qué caracteriza al aprendizaje automático frente a la programación tradicional?",
  o: ["Se escriben reglas explícitas para cada escenario posible",
      "Se proporcionan ejemplos (datos) y el modelo aprende a transformar entradas en salidas",
      "Solo funciona con datos de longitud fija",
      "No necesita ninguna función objetivo"],
  a: 1, e: "En ML se «programa con datos»: en lugar de codificar reglas, se dan ejemplos y el algoritmo aprende la relación entrada→salida. El rendimiento mejora con más datos.", r: "apuntes/tema-1.html#t1-ml" },

{ id: "t1-02", t: "T1", p: null, k: "teoria", s: "Aprendizaje automático",
  q: "¿Cuál de estos <strong>no</strong> es uno de los cuatro componentes de un problema de aprendizaje automático según las diapositivas?",
  o: ["Datos", "Modelo", "Función objetivo", "Compilador"],
  a: 3, e: "Los cuatro componentes son datos, modelo, función objetivo (pérdida) y algoritmo de optimización.", r: "apuntes/tema-1.html#t1-componentes" },

{ id: "t1-03", t: "T1", p: null, k: "teoria", s: "Aprendizaje automático",
  q: "Sobre la función objetivo (pérdida), ¿qué afirmación es correcta?",
  o: ["Por convención, cuanto mayor es su valor, mejor es el modelo",
      "Cuantifica lo bien que lo hace el modelo y por convención menor es mejor",
      "Solo se usa en aprendizaje no supervisado",
      "Es lo mismo que la tasa de aprendizaje"],
  a: 1, e: "La función objetivo mide el desempeño; se minimiza (lower is better). El algoritmo busca los parámetros que la reducen.", r: "apuntes/tema-1.html#t1-componentes" },

{ id: "t1-04", t: "T1", p: null, k: "teoria", s: "Aprendizaje automático",
  q: "La expresión «garbage in, garbage out» se refiere a que…",
  o: ["los modelos profundos siempre eliminan el ruido de los datos",
      "datos pobres, sesgados o infrarrepresentados producen modelos pobres o sesgados",
      "hay que borrar los datos de entrenamiento tras usarlos",
      "la salida de una red siempre contiene ruido"],
  a: 1, e: "La calidad de los datos limita la del modelo. El sesgo y la infrarrepresentación pueden causar daño real.", r: "apuntes/tema-1.html#t1-componentes" },

{ id: "t1-05", t: "T1", p: null, k: "teoria", s: "Deep learning",
  q: "Según las diapositivas, ¿qué afirmaciones describen el deep learning? (Selecciona todas las correctas)",
  o: ["Las operaciones se aprenden conjuntamente a partir de los datos",
      "Sustituye a los modelos superficiales del final de las cadenas clásicas y a parte del preprocesado manual",
      "Con datos abundantes encajan mejor modelos casi no paramétricos",
      "Nunca acepta soluciones subóptimas: todo se demuestra antes de probarse"],
  a: [0, 1, 2], e: "El DL aprende las operaciones de forma conjunta, reemplaza modelos superficiales y gran parte del preprocesado, y con muchos datos se ajusta mejor con modelos flexibles. Además acepta soluciones subóptimas: prueba cosas antes de demostrarlas.", r: "apuntes/tema-1.html#t1-dl" },

{ id: "t1-06", t: "T1", p: null, k: "teoria", s: "Tipos de problemas",
  q: "En aprendizaje <strong>supervisado</strong>, el conjunto de datos contiene…",
  o: ["solo características, y el modelo descubre grupos",
      "características y etiquetas, y el modelo predice etiquetas a partir de características",
      "recompensas de un entorno",
      "solo etiquetas"],
  a: 1, e: "Supervisado: hay características y etiquetas. No supervisado: sin etiquetas. Refuerzo: interacción y recompensas.", r: "apuntes/tema-1.html#t1-tipos" },

{ id: "t1-07", t: "T1", p: null, k: "teoria", s: "Tipos de problemas",
  q: "Una foto puede estar etiquetada a la vez como «perro», «playa» y «atardecer». ¿Qué tipo de problema es?",
  o: ["Regresión", "Clasificación binaria", "Clasificación multiclase", "Clasificación multietiqueta"],
  a: 3, e: "Multietiqueta: un ejemplo puede pertenecer a varias clases simultáneamente (típicamente una sigmoide por etiqueta). Multiclase: exactamente una clase de entre varias (softmax).", r: "apuntes/tema-1.html#t1-supervisado" },

{ id: "t1-08", t: "T1", p: null, k: "teoria", s: "Tipos de problemas",
  q: "Un sistema de recomendación que asigna una puntuación de relevancia a cada producto para ordenarlos es un problema de…",
  o: ["ranking", "clasificación binaria", "aprendizaje por refuerzo", "regresión lineal sin etiquetas"],
  a: 0, e: "Ranking: asignar puntuaciones de relevancia a elementos; es la base de los recomendadores.", r: "apuntes/tema-1.html#t1-supervisado" },

{ id: "t1-09", t: "T1", p: null, k: "teoria", s: "Tipos de problemas",
  q: "¿Qué práctica del curso es un ejemplo de aprendizaje <strong>no supervisado</strong>?",
  o: ["Práctica 0: aproximar Y a partir de X", "Práctica 2: par / impar", "Práctica 5: GAN que genera dígitos", "Práctica 4: transfer learning"],
  a: 2, e: "La GAN aprende la distribución de los dígitos sin usar sus etiquetas (las etiquetas real/falso se crean durante el entrenamiento). Las demás son supervisadas.", r: "apuntes/tema-1.html#t1-tipos" },

{ id: "t1-10", t: "T1", p: null, k: "teoria", s: "Neurona y MLP",
  q: "¿Por qué una red con varias capas ocultas necesita funciones de activación no lineales?",
  o: ["Porque sin ellas no se pueden calcular gradientes",
      "Porque la composición de transformaciones lineales es otra transformación lineal: apilar capas no aportaría nada",
      "Porque las activaciones lineales consumen más memoria",
      "Porque Keras no permite capas lineales"],
  a: 1, e: "$W_2(W_1x+b_1)+b_2=(W_2W_1)x+(W_2b_1+b_2)$: sin no linealidad, toda la red equivale a una sola capa lineal.", r: "apuntes/tema-1.html#t1-mlp" },

{ id: "t1-11", t: "T1", p: null, k: "calculo", s: "Neurona y MLP",
  q: "¿Cuántos parámetros entrenables tiene una capa <code>Dense(64)</code> que recibe un vector de 128 valores?",
  o: ["8 192", "8 256", "192", "8 320"],
  a: 1, e: "$128\\cdot64$ pesos $+64$ sesgos $=8\\,192+64=8\\,256$.", r: "apuntes/tema-1.html#t1-mlp" },

{ id: "t1-12", t: "T1", p: null, k: "teoria", s: "Neurona y MLP",
  q: "En una neurona artificial, el <strong>sesgo</strong> $b$…",
  o: ["multiplica a cada entrada",
      "es un hiperparámetro que fija el usuario",
      "se suma a la suma ponderada y desplaza la función de activación",
      "solo existe en la capa de salida"],
  a: 2, e: "$z=\\mathbf w^\\top\\mathbf x+b$: el sesgo desplaza la entrada de la activación. Es un parámetro aprendible, igual que los pesos.", r: "apuntes/tema-1.html#t1-neurona" },

{ id: "t1-13", t: "T1", p: null, k: "teoria", s: "Activaciones",
  q: "¿Cuál es el rango de salida de la tangente hiperbólica?",
  o: ["$(0,1)$", "$(-1,1)$", "$[0,\\infty)$", "$\\mathbb R$"],
  a: 1, e: "tanh está acotada entre −1 y 1 y centrada en 0. La sigmoide va de 0 a 1; ReLU de 0 a infinito.", r: "apuntes/tema-1.html#t1-activ" },

{ id: "t1-14", t: "T1", p: null, k: "teoria", s: "Activaciones",
  q: "Si $a=\\sigma(z)$ es la sigmoide, su derivada respecto a $z$ es…",
  o: ["$1-a^2$", "$a(1-a)$", "$e^{-z}$", "$1$ si $z&gt;0$, $0$ si no"],
  a: 1, e: "$\\sigma'(z)=\\sigma(z)(1-\\sigma(z))$. La expresión $1-a^2$ es la derivada de tanh.", r: "apuntes/tema-1.html#t1-activ" },

{ id: "t1-15", t: "T1", p: null, k: "teoria", s: "Activaciones",
  q: "¿Qué afirmaciones sobre ReLU, $f(x)=\\max(0,x)$, son correctas? (Selecciona todas)",
  o: ["Es muy fácil de implementar",
      "No es derivable en $x=0$",
      "Se satura para valores positivos grandes, igual que la sigmoide",
      "AlexNet la popularizó porque acelera el entrenamiento"],
  a: [0, 1, 3], e: "ReLU es trivial de calcular, no es derivable en 0 (en la práctica se usa 0 o 1) y no se satura para $x&gt;0$, por eso entrena más rápido que sigmoide/tanh. AlexNet la introdujo en las CNN modernas.", r: "apuntes/tema-1.html#t1-activ" },

{ id: "t1-16", t: "T1", p: null, k: "teoria", s: "Activaciones",
  q: "¿Por qué las redes profundas con sigmoide o tanh en todas las capas pueden sufrir <em>desvanecimiento del gradiente</em>?",
  o: ["Porque sus salidas no están acotadas",
      "Porque se saturan: para |z| grande su derivada es casi 0 y el producto de muchas derivadas pequeñas en la retropropagación tiende a 0",
      "Porque no son derivables en ningún punto",
      "Porque solo funcionan con lotes de tamaño 1"],
  a: 1, e: "La regla de la cadena multiplica derivadas capa a capa; si cada una es ≪ 1, el gradiente que llega a las primeras capas es diminuto.", r: "apuntes/tema-1.html#t1-activ" },

{ id: "t1-17", t: "T1", p: null, k: "teoria", s: "Activaciones",
  q: "La función softmax en la capa de salida…",
  o: ["devuelve valores no negativos que suman 1 (una distribución de probabilidad)",
      "devuelve un único valor entre −1 y 1",
      "se usa en regresión para predecir valores negativos",
      "es equivalente a aplicar ReLU a cada logit"],
  a: 0, e: "$\\text{softmax}(z)_k=e^{z_k}/\\sum_j e^{z_j}$: salidas positivas que suman 1. La clase predicha es el argmax.", r: "apuntes/tema-1.html#t1-activ" },

{ id: "t1-18", t: "T1", p: null, k: "teoria", s: "Pérdidas",
  q: "Clasificación en 10 clases con etiquetas enteras (0…9) en Keras. ¿Qué combinación es la adecuada?",
  o: ["Dense(1, sigmoid) + binary_crossentropy",
      "Dense(10, softmax) + sparse_categorical_crossentropy",
      "Dense(10, linear) + mean_squared_error",
      "Dense(10, softmax) + categorical_crossentropy sin convertir a one-hot"],
  a: 1, e: "<code>sparse_categorical_crossentropy</code> acepta etiquetas enteras; <code>categorical_crossentropy</code> espera vectores one-hot.", r: "apuntes/tema-1.html#t1-perdida" },

{ id: "t1-19", t: "T1", p: null, k: "teoria", s: "Pérdidas",
  q: "Para un problema de <strong>regresión</strong> cuyo objetivo toma valores positivos y negativos, la capa de salida debe ser…",
  o: ["sigmoide, para acotar la salida", "softmax", "lineal (identidad)", "ReLU, para evitar valores negativos"],
  a: 2, e: "Una salida lineal puede producir cualquier valor real. Sigmoide limitaría a (0,1) y ReLU impediría valores negativos.", r: "apuntes/tema-1.html#t1-perdida" },

{ id: "t1-20", t: "T1", p: null, k: "calculo", s: "Pérdidas",
  q: "Un clasificador asigna probabilidad 0,25 a la clase correcta de un ejemplo. ¿Cuánto vale su entropía cruzada para ese ejemplo (logaritmo natural)?",
  o: ["≈ 0,25", "≈ 0,75", "≈ 1,386", "≈ 2,000"],
  a: 2, e: "$-\\ln 0{,}25=\\ln 4\\approx1{,}386$. Cuanto menor sea la probabilidad de la clase correcta, mayor la pérdida.", r: "apuntes/tema-1.html#t1-perdida" },

{ id: "t1-21", t: "T1", p: null, k: "teoria", s: "Entrenamiento",
  q: "¿Cuál es la regla de actualización del descenso del gradiente?",
  o: ["$\\theta\\leftarrow\\theta+\\eta\\nabla L$", "$\\theta\\leftarrow\\theta-\\eta\\nabla L$", "$\\theta\\leftarrow\\eta\\,\\theta\\nabla L$", "$\\theta\\leftarrow\\nabla L/\\eta$"],
  a: 1, e: "El gradiente apunta hacia donde crece la pérdida; para reducirla se resta una fracción η del gradiente.", r: "apuntes/tema-1.html#t1-gd" },

{ id: "t1-22", t: "T1", p: null, k: "teoria", s: "Entrenamiento",
  q: "La curva de pérdida de entrenamiento oscila con fuerza y a veces crece sin control. La causa más probable es…",
  o: ["una tasa de aprendizaje demasiado grande", "una tasa de aprendizaje demasiado pequeña", "demasiadas pocas épocas", "haber normalizado los datos"],
  a: 0, e: "Con η grande se «salta» de un lado a otro del valle y puede divergir. Con η pequeña la convergencia es lenta pero estable.", r: "apuntes/tema-1.html#t1-gd" },

{ id: "t1-23", t: "T1", p: null, k: "teoria", s: "Entrenamiento",
  q: "La retropropagación (<em>backpropagation</em>) es…",
  o: ["un optimizador que sustituye a Adam",
      "un método para calcular eficientemente los gradientes de la pérdida respecto a todos los parámetros aplicando la regla de la cadena",
      "la técnica que inicializa los pesos",
      "la fase de evaluación con el conjunto de test"],
  a: 1, e: "Backprop calcula ∂L/∂θ desde la salida hacia la entrada reutilizando los valores del forward. El optimizador (SGD, Adam…) usa esos gradientes para actualizar.", r: "apuntes/tema-1.html#t1-chain" },

{ id: "t1-24", t: "T1", p: null, k: "teoria", s: "Entrenamiento",
  q: "¿Por qué no se inicializan todos los pesos de una capa a cero?",
  o: ["Porque NumPy no lo permite",
      "Porque todas las neuronas recibirían el mismo gradiente y aprenderían exactamente lo mismo (simetría)",
      "Porque la pérdida sería negativa",
      "Porque los sesgos también tendrían que ser cero"],
  a: 1, e: "Con pesos idénticos no se rompe la simetría. Los sesgos sí pueden empezar a cero porque los pesos aleatorios ya diferencian a las neuronas.", r: "apuntes/tema-1.html#t1-init" },

{ id: "t1-25", t: "T1", p: null, k: "teoria", s: "Entrenamiento",
  q: "La inicialización de Xavier/Glorot elige pesos aleatorios con una escala que depende de…",
  o: ["el número de épocas", "el tamaño del lote", "el número de entradas y salidas de la capa (fan-in y fan-out)", "la tasa de aprendizaje"],
  a: 2, e: "Límite $\\sqrt{6/(\\text{fan}_{in}+\\text{fan}_{out})}$: mantiene una escala razonable de las activaciones al inicio.", r: "apuntes/tema-1.html#t1-init" },

{ id: "t1-26", t: "T1", p: null, k: "teoria", s: "Optimizadores",
  q: "Relaciona: ¿qué optimizador mantiene una <strong>media móvil del cuadrado de los gradientes</strong> para adaptar la tasa y evitar que se haga demasiado pequeña?",
  o: ["SGD", "AdaGrad", "RMSprop", "Ninguno: todos usan la misma tasa fija"],
  a: 2, e: "RMSprop usa una media móvil de $g^2$. AdaGrad acumula todos los $g^2$ (la tasa puede hacerse muy pequeña). Adam combina momentum y RMSprop.", r: "apuntes/tema-1.html#t1-optim" },

{ id: "t1-27", t: "T1", p: null, k: "teoria", s: "Optimizadores",
  q: "Adam (<em>Adaptive Moment Estimation</em>) combina…",
  o: ["SGD y Dropout", "momentum (primer momento) y RMSprop (segundo momento)", "AdaGrad y parada temprana", "dos tasas de aprendizaje fijas"],
  a: 1, e: "Adam mantiene una media móvil del gradiente ($m$) y del gradiente al cuadrado ($v$), con corrección de sesgo.", r: "apuntes/tema-1.html#t1-optim" },

{ id: "t1-28", t: "T1", p: null, k: "teoria", s: "Optimizadores",
  q: "En Adam, ¿para qué sirven $\\hat m_t=m_t/(1-\\beta_1^t)$ y $\\hat v_t=v_t/(1-\\beta_2^t)$?",
  o: ["Para aplicar regularización L2",
      "Para corregir el sesgo hacia cero de los momentos, que empiezan inicializados a 0",
      "Para evitar dividir por cero",
      "Para reducir la tasa de aprendizaje en cada época"],
  a: 1, e: "Al empezar en 0, $m$ y $v$ están sesgados hacia 0 en los primeros pasos. La corrección lo compensa. Evitar dividir por cero es tarea de $\\varepsilon$.", r: "apuntes/tema-1.html#t1-optim" },

{ id: "t1-29", t: "T1", p: null, k: "teoria", s: "Optimizadores",
  q: "Según las diapositivas, SGD…",
  o: ["actualiza los pesos con el gradiente de un lote pequeño: actualizaciones rápidas pero con más varianza",
      "adapta la tasa de aprendizaje de cada peso",
      "combina momentum y RMSprop",
      "solo puede usarse con el dataset completo"],
  a: 0, e: "SGD estima el gradiente con un lote pequeño: rápido pero ruidoso.", r: "apuntes/tema-1.html#t1-optim" },

{ id: "t1-30", t: "T1", p: null, k: "teoria", s: "Hiperparámetros",
  q: "¿Cuáles de los siguientes son <strong>parámetros aprendibles</strong> (los ajusta el optimizador)? (Selecciona todas)",
  o: ["Pesos", "Sesgos", "Tasa de aprendizaje", "Tamaño de lote"],
  a: [0, 1], e: "Pesos y sesgos se aprenden. Tasa de aprendizaje, épocas, tamaño de lote y conjunto de validación son ajustes (hiperparámetros).", r: "apuntes/tema-1.html#t1-hiper" },

{ id: "t1-31", t: "T1", p: null, k: "teoria", s: "Hiperparámetros",
  q: "Una <strong>época</strong> es…",
  o: ["una actualización de los pesos", "una pasada completa por todo el conjunto de entrenamiento", "el número de neuronas ocultas", "el tiempo que tarda en evaluarse el test"],
  a: 1, e: "En una época el modelo procesa una vez todos los ejemplos; con lotes, eso son ⌈N/B⌉ iteraciones.", r: "apuntes/tema-1.html#t1-hiper" },

{ id: "t1-32", t: "T1", p: null, k: "calculo", s: "Hiperparámetros",
  q: "Con 54 000 imágenes de entrenamiento y lote 128, ¿cuántas actualizaciones de pesos se hacen en 10 épocas?",
  o: ["4 220", "4 219", "422", "540 000"],
  a: 0, e: "⌈54 000/128⌉ = ⌈421,875⌉ = 422 iteraciones por época; × 10 = 4 220.", r: "apuntes/tema-1.html#t1-hiper" },

{ id: "t1-33", t: "T1", p: null, k: "teoria", s: "Hiperparámetros",
  q: "Al reducir el tamaño de lote de 128 a 32 (mismo número de épocas)…",
  o: ["se hacen 4 veces menos actualizaciones por época",
      "se hacen unas 4 veces más actualizaciones por época, con gradientes más ruidosos, y cada época suele tardar más",
      "el modelo deja de necesitar tasa de aprendizaje",
      "el número de parámetros de la red se multiplica por 4"],
  a: 1, e: "Lote más pequeño ⇒ más iteraciones por época y gradientes más ruidosos; aprovecha peor el paralelismo, por lo que suele tardar más (P1: 8,6 s frente a 3,3 s con Adam y 10 épocas).", r: "apuntes/tema-1.html#t1-hiper" },

{ id: "t1-34", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "¿Para qué se usa el conjunto de <strong>validación</strong>?",
  o: ["Para ajustar los pesos en cada iteración",
      "Para elegir hiperparámetros/arquitectura y decidir cuándo parar, sin tocar el test",
      "Para calcular la media de normalización",
      "Para la evaluación final que se publica"],
  a: 1, e: "La validación guía decisiones (selección de modelo, parada temprana). El test se reserva para una estimación final independiente.", r: "apuntes/tema-1.html#t1-gen" },

{ id: "t1-35", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "Un modelo alcanza 99,9 % de accuracy en entrenamiento y 91 % en test. ¿Qué indica?",
  o: ["Subajuste", "Sobreajuste: memoriza el entrenamiento y generaliza peor", "Fuga de datos de test a entrenamiento", "Que la tasa de aprendizaje es demasiado baja"],
  a: 1, e: "Una brecha train−test grande y positiva es la señal típica de sobreajuste.", r: "apuntes/tema-1.html#t1-gen" },

{ id: "t1-36", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "Train 93,8 % y test 93,8 % en MNIST con SGD y 5 épocas, cuando otros modelos llegan al 97,7 %. ¿Diagnóstico?",
  o: ["Sobreajuste severo", "Subajuste: el modelo aún no ha aprendido lo suficiente", "Fuga de información", "Matriz de confusión incorrecta"],
  a: 1, e: "Exactitudes bajas y parecidas en train y test ⇒ subajuste. Más épocas, momentum o una tasa mejor ajustada ayudarían.", r: "apuntes/tema-1.html#p1-interp" },

{ id: "t1-37", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "Sobre Dropout, ¿qué afirmación es correcta?",
  o: ["Apaga neuronas al azar tanto en entrenamiento como en inferencia",
      "Apaga al azar una fracción de neuronas solo durante el entrenamiento para reducir el sobreajuste",
      "Elimina permanentemente las neuronas con pesos pequeños",
      "Tiene muchos parámetros aprendibles"],
  a: 1, e: "Dropout solo actúa en entrenamiento (en inferencia está desactivado) y no tiene parámetros. Obliga a aprender características redundantes.", r: "apuntes/tema-1.html#t1-reg" },

{ id: "t1-38", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "<code>EarlyStopping(monitor='val_loss', patience=4, restore_best_weights=True)</code> hace que el entrenamiento…",
  o: ["pare tras 4 épocas siempre",
      "pare cuando la pérdida de validación lleve 4 épocas sin mejorar y recupere los pesos de la mejor época",
      "pare cuando la pérdida de entrenamiento suba 4 veces",
      "reduzca la tasa de aprendizaje a la cuarta parte"],
  a: 1, e: "<code>patience</code> = épocas sin mejora toleradas; <code>restore_best_weights</code> vuelve al mejor punto de <code>val_loss</code>.", r: "apuntes/tema-1.html#t1-reg" },

{ id: "t1-39", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "¿Qué problema tiene elegir la mejor configuración mirando la accuracy de <strong>test</strong>?",
  o: ["Ninguno, es lo recomendado",
      "La estimación final queda optimista porque el test ha influido en la elección",
      "Que el entrenamiento es más lento",
      "Que no se puede calcular la matriz de confusión"],
  a: 1, e: "Si el test se usa para decidir, deja de ser independiente. Lo correcto: elegir con validación y usar test una sola vez al final.", r: "apuntes/tema-1.html#t1-gen" },

{ id: "t1-40", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "¿Qué es una <strong>fuga de información</strong> (data leakage) al normalizar?",
  o: ["Usar la media y desviación del conjunto de test (o de todo el dataset) para normalizar",
      "Normalizar solo las entradas y no el objetivo",
      "Dividir los píxeles por 255",
      "Guardar la media en un atributo del modelo"],
  a: 0, e: "Las estadísticas deben calcularse solo con entrenamiento y reutilizarse en test; si no, información del test contamina el modelo.", r: "apuntes/tema-1.html#t1-gen" },

{ id: "t1-41", t: "T1", p: null, k: "teoria", s: "Métricas",
  q: "Un modelo de regresión obtiene $R^2=-0{,}2$ en test. ¿Qué significa?",
  o: ["Ajuste casi perfecto", "Que predice peor que usar siempre la media de $y$", "Que el MSE es negativo", "Que el modelo es de clasificación"],
  a: 1, e: "$R^2=1-SSE/SST$; si $SSE&gt;SST$ el modelo es peor que la predicción constante de la media.", r: "apuntes/tema-1.html#t1-metricas" },

{ id: "t1-42", t: "T1", p: null, k: "teoria", s: "Métricas",
  q: "¿Por qué se suele informar del RMSE además del MSE?",
  o: ["Porque el RMSE siempre es menor", "Porque está en las mismas unidades que la variable objetivo y se interpreta mejor", "Porque no penaliza los errores grandes", "Porque se puede calcular sin las predicciones"],
  a: 1, e: "RMSE = √MSE, en las unidades de $y$: da el tamaño típico del error.", r: "apuntes/tema-1.html#t1-metricas" },

{ id: "t1-43", t: "T1", p: null, k: "teoria", s: "Métricas",
  q: "En una matriz de confusión $C_{ij}$ (fila = clase real $i$, columna = predicción $j$), el número de errores es…",
  o: ["la traza de la matriz", "la suma de la primera fila", "la suma de todas las celdas fuera de la diagonal", "el máximo de la matriz"],
  a: 2, e: "La diagonal son los aciertos; errores = N − traza = suma fuera de la diagonal.", r: "apuntes/tema-1.html#t1-metricas" },

{ id: "t1-44", t: "T1", p: null, k: "calculo", s: "Métricas",
  q: "Matriz de confusión binaria (filas reales, columnas predichas): [[4857, 69], [75, 4999]]. ¿Accuracy?",
  o: ["97,56 %", "98,56 %", "99,31 %", "48,57 %"],
  a: 1, e: "(4857 + 4999) / 10 000 = 9 856 / 10 000 = 98,56 % (144 errores = 69 + 75). Es la matriz de test de la P2.", r: "apuntes/tema-1.html#t1-metricas" },

{ id: "t1-45", t: "T1", p: null, k: "teoria", s: "Capas y frameworks",
  q: "¿Qué capas <strong>no</strong> tienen parámetros aprendibles? (Selecciona todas)",
  o: ["Dropout", "Pooling", "Flatten", "Dense"],
  a: [0, 1, 2], e: "Dropout, pooling y transformaciones de forma (Flatten, Reshape) no aprenden nada. Dense sí (pesos y sesgos).", r: "apuntes/tema-1.html#t1-capas" },

{ id: "t1-46", t: "T1", p: null, k: "teoria", s: "Capas y frameworks",
  q: "Una capa <strong>recurrente</strong>…",
  o: ["mantiene un estado entre pasos de tiempo y sirve para datos secuenciales",
      "aplica filtros que capturan rasgos espaciales",
      "apaga neuronas al azar",
      "reduce las dimensiones espaciales"],
  a: 0, e: "Las recurrentes conservan estado a lo largo del tiempo (series temporales, lenguaje).", r: "apuntes/tema-1.html#t1-capas" },

{ id: "t1-47", t: "T1", p: null, k: "teoria", s: "Capas y frameworks",
  q: "Según las diapositivas, ¿qué framework destaca por su <strong>arquitectura dinámica</strong> y fue creado por Facebook?",
  o: ["TensorFlow", "PyTorch", "Keras", "DeepLearning4J"],
  a: 1, e: "PyTorch (Facebook/Meta): Python y grafos dinámicos. TensorFlow es de Google; Keras es una API de alto nivel; DL4J es Java.", r: "apuntes/tema-1.html#t1-capas" },

{ id: "t1-48", t: "T1", p: null, k: "teoria", s: "Capas y frameworks",
  q: "Keras se describe en las diapositivas como…",
  o: ["un framework de Java para Hadoop", "una API de alto nivel que funciona sobre TensorFlow, Theano o CNTK", "el toolkit cognitivo de Microsoft", "un framework de Apache con soporte para Julia y Go"],
  a: 1, e: "Keras es la API de alto nivel (hoy integrada en TensorFlow como tf.keras).", r: "apuntes/tema-1.html#t1-capas" },

{ id: "t1-49", t: "T1", p: null, k: "codigo", s: "Capas y frameworks",
  q: "¿Qué hace el argumento <code>validation_split=.1</code> en esta llamada?",
  c: `model.fit(data, target, epochs=10, batch_size=16, validation_split=.1)`,
  o: ["Usa el 10 % del test como validación",
      "Aparta el 10 % de los datos de entrenamiento para validar y no entrena con él",
      "Entrena con el 10 % de los datos",
      "Reduce la tasa de aprendizaje un 10 % por época"],
  a: 1, e: "Keras reserva la última fracción indicada de los datos de entrenamiento para calcular métricas de validación en cada época.", r: "apuntes/tema-1.html#t1-pasos" },

{ id: "t1-50", t: "T1", p: null, k: "teoria", s: "Generalización",
  q: "¿Por qué se restablece la misma semilla antes de construir <strong>cada</strong> modelo en un estudio comparativo?",
  o: ["Para que todos partan de condiciones comparables (misma inicialización y barajado) y las diferencias se deban al factor estudiado",
      "Para que todos los modelos obtengan exactamente la misma accuracy",
      "Para acelerar el entrenamiento",
      "Porque Keras lo exige"],
  a: 0, e: "Reiniciar la semilla controla la inicialización y el orden aleatorio, haciendo la comparación justa y reproducible.", r: "apuntes/tema-1.html#t1-repro" },

/* ----------------------------------------------------------------- P0 */
{ id: "p0-01", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Qué tipo de problema resuelve la Práctica 0?",
  o: ["Clasificación binaria", "Regresión: aproximar una función continua Y = f(X)", "Clustering", "Reducción de dimensionalidad"],
  a: 1, e: "Cada observación tiene una entrada escalar X y un objetivo continuo Y: es regresión.", r: "apuntes/tema-1.html#p0" },

{ id: "p0-02", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Cuál fue el cambio principal respecto al ejemplo de clasificación de referencia?",
  o: ["Añadir más capas ocultas", "Usar una salida lineal (sin sigmoide ni umbral) y el MSE como pérdida", "Usar softmax en la salida", "Eliminar la capa oculta"],
  a: 1, e: "En regresión no interesa limitar la salida a [0,1] ni aplicar umbral: salida lineal + MSE.", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-03", t: "T1", p: "P0", k: "calculo", s: "Práctica 0",
  q: "En la red 1–12–1 de la P0, ¿qué forma tiene <code>W1</code>?",
  o: ["(12, 1)", "(1, 12)", "(86, 12)", "(12, 12)"],
  a: 1, e: "<code>W1</code> conecta 1 entrada con 12 neuronas ocultas: (input_size, hidden_size) = (1, 12). <code>W2</code> es (12, 1).", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-04", t: "T1", p: "P0", k: "calculo", s: "Práctica 0",
  q: "¿Cuántos parámetros entrenables tiene la red 1–12–1 de la P0?",
  o: ["24", "36", "37", "48"],
  a: 2, e: "W1: 1·12 = 12; b1: 12; W2: 12·1 = 12; b2: 1. Total 37.", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-05", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Por qué el código usa <code>datos[[\"X\"]]</code> (dobles corchetes) en lugar de <code>datos[\"X\"]</code>?",
  o: ["Para ordenar la columna", "Para obtener una matriz de forma (n, 1) en lugar de un vector (n,) y simplificar las multiplicaciones matriciales", "Para eliminar los NaN", "Para convertir a float32"],
  a: 1, e: "Con dobles corchetes pandas devuelve un DataFrame 2D y <code>to_numpy</code> da forma (n, 1).", r: "apuntes/tema-1.html#p0-datos" },

{ id: "p0-06", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Qué estadísticas usa <code>predict</code> para normalizar los datos de test?",
  o: ["La media y desviación de los datos de test", "Las calculadas en <code>fit</code> con los datos de entrenamiento (<code>X_mean_</code>, <code>X_std_</code>)", "La media conjunta de train y test", "Ninguna: el test no se normaliza"],
  a: 1, e: "Reutilizar las estadísticas de entrenamiento evita la fuga de información y aplica exactamente la misma transformación.", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-07", t: "T1", p: "P0", k: "codigo", s: "Práctica 0",
  q: "Este fragmento calcula el gradiente que llega a la capa oculta. ¿Qué expresión es la correcta para la red de la P0 (tanh oculta)?",
  c: `d_output = 2 * error / n_values
d_hidden = (d_output @ self.W2.T) * ______`,
  o: ["<code>hidden * (1 - hidden)</code>", "<code>(1 - hidden**2)</code>", "<code>np.tanh(hidden)</code>", "<code>1</code>"],
  a: 1, e: "Si $a=\\tanh(z)$, $da/dz=1-a^2$. <code>hidden*(1-hidden)</code> sería la derivada de la sigmoide.", r: "apuntes/tema-1.html#p0-backprop" },

{ id: "p0-08", t: "T1", p: "P0", k: "codigo", s: "Práctica 0",
  q: "Un compañero escribió este código para guardar el mejor modelo. ¿Qué falla?",
  c: `if mse < best_loss:
    best_loss = mse
    best_parameters = parameters      # parameters = [self.W1, self.b1, self.W2, self.b2]
...
parameter -= self.learning_rate * m_corrected / (np.sqrt(v_corrected) + epsilon)`,
  o: ["Nada, es correcto",
      "Guarda referencias, no copias: como Adam modifica los arrays en el sitio (<code>-=</code>), <code>best_parameters</code> cambia con ellos y acaba siendo el último estado",
      "Debería comparar con <code>&gt;</code>",
      "<code>best_loss</code> debería inicializarse a 0"],
  a: 1, e: "Hay que guardar <code>[p.copy() for p in parameters]</code>. Con referencias, el «mejor» estado se sobrescribe en cada actualización in place.", r: "apuntes/tema-1.html#p0-backprop" },

{ id: "p0-09", t: "T1", p: "P0", k: "codigo", s: "Práctica 0",
  q: "¿Qué problema tiene esta salida para la P0, cuyo objetivo Y toma valores entre −0,39 y 0,34 (sin normalizar)?",
  c: `def _forward(self, X):
    a1 = np.tanh(X @ self.W1 + self.b1)
    output = 1 / (1 + np.exp(-(a1 @ self.W2 + self.b2)))   # sigmoide
    return a1, output`,
  o: ["Ninguno",
      "La sigmoide solo produce valores en (0, 1): nunca podría predecir los valores negativos",
      "Debería usar softmax",
      "Debería usar ReLU en la salida"],
  a: 1, e: "En regresión con valores de cualquier signo la salida debe ser lineal. ReLU tampoco serviría (no da negativos).", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-10", t: "T1", p: "P0", k: "codigo", s: "Práctica 0",
  q: "¿Qué error metodológico contiene esta versión de <code>predict</code>?",
  c: `def predict(self, X):
    X_scaled = (X - X.mean(axis=0)) / X.std(axis=0)
    _, pred = self._forward(X_scaled)
    return pred * self.y_std_ + self.y_mean_`,
  o: ["Ninguno",
      "Normaliza con las estadísticas de los datos recibidos (p. ej. test) en lugar de las aprendidas en fit: transformación distinta y posible fuga",
      "Debería desnormalizar con la media de X",
      "No llama a fit antes"],
  a: 1, e: "Hay que usar <code>self.X_mean_</code> y <code>self.X_std_</code> calculadas con train. Además, con un único ejemplo, <code>X.std()</code> sería 0.", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-11", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Qué garantiza el comportamiento determinista del modelo de la P0? (Selecciona todas)",
  o: ["La semilla fija en <code>np.random.default_rng(seed)</code> para la inicialización",
      "El entrenamiento de lote completo, sin barajado ni otras operaciones aleatorias",
      "El uso de Adam en lugar de SGD",
      "Guardar el MSE en <code>history_</code>"],
  a: [0, 1], e: "Misma semilla ⇒ misma inicialización; lote completo ⇒ no hay aleatoriedad en el orden. Con mismos datos y operaciones, el modelo final es idéntico.", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-12", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Por qué se usa <code>np.random.default_rng(self.seed)</code> en lugar de <code>np.random.seed(...)</code>?",
  o: ["Porque es más rápido", "Porque crea un generador local que no modifica el estado aleatorio global", "Porque genera números enteros", "Porque es obligatorio en NumPy 2"],
  a: 1, e: "Un generador local aísla la aleatoriedad del modelo del resto del programa.", r: "apuntes/tema-1.html#p0-clase" },

{ id: "p0-13", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Por qué la curva de aprendizaje de la P0 se dibuja con el eje Y en escala logarítmica?",
  o: ["Porque el MSE es negativo", "Para ver a la vez la gran caída inicial (≈10⁻²) y las mejoras minúsculas del final (≈10⁻⁷)", "Porque matplotlib lo exige", "Para ocultar las oscilaciones"],
  a: 1, e: "El MSE baja varios órdenes de magnitud; en escala lineal la parte final sería una línea plana.", r: "apuntes/tema-1.html#p0-eval" },

{ id: "p0-14", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "En test, la mayor parte del error de la P0 se concentra en…",
  o: ["los extremos X = ±5", "el hueco central sin muestras de entrenamiento, donde la red interpola (predice ≈0,83 frente a ≈0,87)", "los puntos con Y negativa", "ningún sitio: el error de test es 0"],
  a: 1, e: "Interpolar una región no observada es más difícil que ajustar puntos vistos. La forma de la curva allí depende del sesgo de suavidad de la red.", r: "apuntes/tema-1.html#p0-eval" },

{ id: "p0-15", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Qué papel tiene el parámetro <code>l2</code> en el cálculo <code>dW2 = hidden.T @ d_output + self.l2 * self.W2</code>?",
  o: ["Es la tasa de aprendizaje de la segunda capa", "Añade el gradiente de una penalización de los pesos grandes (regularización L2 / weight decay)", "Normaliza la salida", "Corrige el sesgo de Adam"],
  a: 1, e: "La derivada de $\\tfrac{\\lambda}{2}\\|W\\|^2$ es $\\lambda W$. Favorece soluciones más suaves. En el experimento final vale 0.", r: "apuntes/tema-1.html#p0-backprop" },

{ id: "p0-16", t: "T1", p: "P0", k: "codigo", s: "Práctica 0",
  q: "Varias entregas usaban <code>d_output = error</code>. Comparado con <code>d_output = 2 * error / n_values</code>, ¿qué consecuencia tiene?",
  o: ["Ninguna", "El gradiente no corresponde al MSE que se monitoriza: su magnitud crece con el número de ejemplos y cambia el tamaño efectivo del paso", "La red pasa a ser de clasificación", "Se invierte el signo de la actualización"],
  a: 1, e: "Sin dividir por N se optimiza (la mitad de) la suma de errores al cuadrado; el paso depende del tamaño del dataset.", r: "apuntes/tema-1.html#p0-backprop" },

{ id: "p0-17", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "Un compañero usó 10 neuronas y solo 1 000 épocas y obtuvo MSE de train 0,025 y de test 0,112. ¿Diagnóstico?",
  o: ["Sobreajuste", "Subajuste: la red apenas ha aprendido la función; necesita más épocas o ajustar la tasa", "Fuga de información", "Un resultado excelente"],
  a: 1, e: "Errores altos tanto en train como en test ⇒ subajuste.", r: "apuntes/tema-1.html#t1-gen" },

{ id: "p0-18", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Por qué <code>fit</code> termina con <code>return self</code>?",
  o: ["Para liberar memoria", "Para permitir encadenar llamadas: <code>model.fit(X, y).predict(X_new)</code>", "Porque Python lo exige en los métodos", "Para reiniciar los pesos"],
  a: 1, e: "Es el patrón de scikit-learn. Además, <code>is_fitted_ = True</code> impide predecir antes de entrenar.", r: "apuntes/tema-1.html#p0-backprop" },

{ id: "p0-19", t: "T1", p: "P0", k: "practica", s: "Práctica 0",
  q: "¿Por qué usar pandas y Matplotlib no incumple la restricción «sin frameworks» de la P0?",
  o: ["Porque el enunciado no decía nada", "Porque solo cargan datos y dibujan; el modelo, el forward, el backprop y Adam están programados con NumPy", "Porque pandas incluye redes neuronales", "Sí la incumple"],
  a: 1, e: "La restricción se refiere a frameworks de aprendizaje (Keras, PyTorch, scikit-learn…).", r: "apuntes/tema-1.html#p0-datos" },

/* ----------------------------------------------------------------- P1 */
{ id: "p1-01", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Cuál es el objetivo del estudio de la Práctica 1?",
  o: ["Encontrar la mejor arquitectura para MNIST", "Estudiar el efecto de los hiperparámetros de entrenamiento manteniendo fija la arquitectura", "Comparar TensorFlow y PyTorch", "Implementar backprop a mano"],
  a: 1, e: "Con la arquitectura fija, las diferencias se pueden atribuir al optimizador, las épocas y el lote.", r: "apuntes/tema-1.html#p1" },

{ id: "p1-02", t: "T1", p: "P1", k: "calculo", s: "Práctica 1",
  q: "¿Cuántas configuraciones tiene el diseño factorial {SGD, RMSprop, Adam} × {5, 10 épocas} × {lote 32, 128}?",
  o: ["7", "8", "12", "18"],
  a: 2, e: "3 × 2 × 2 = 12. Un diseño factorial completo prueba todas las combinaciones y revela interacciones.", r: "apuntes/tema-1.html#p1-diseno" },

{ id: "p1-03", t: "T1", p: "P1", k: "calculo", s: "Práctica 1",
  q: "¿Cuántos parámetros entrenables tiene Flatten → Dense(128, ReLU) → Dense(10, softmax) para imágenes 28×28?",
  o: ["100 480", "101 770", "784 000", "101 632"],
  a: 1, e: "784·128 + 128 = 100 480; 128·10 + 10 = 1 290; total 101 770. Flatten no tiene parámetros.", r: "apuntes/tema-1.html#p1-modelo" },

{ id: "p1-04", t: "T1", p: "P1", k: "calculo", s: "Práctica 1",
  q: "Con los 60 000 ejemplos de entrenamiento de MNIST y lote 32, ¿cuántas iteraciones hay por época?",
  o: ["469", "1 875", "1 876", "60 000"],
  a: 1, e: "60 000 / 32 = 1 875 exactamente. Con lote 128 serían ⌈468,75⌉ = 469.", r: "apuntes/tema-1.html#t1-hiper" },

{ id: "p1-05", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Qué configuración obtuvo la mejor accuracy de test y con qué resultado?",
  o: ["Adam-e10-b32 · 97,61 %", "Adam-e10-b128 · 97,76 % (224 errores)", "RMSprop-e10-b128 · 97,62 %", "SGD-e10-b32 · 95,16 %"],
  a: 1, e: "Adam, 10 épocas y lote 128: 97,76 % en test, 224 errores, ≈3,3 s de entrenamiento.", r: "apuntes/tema-1.html#p1-resultados" },

{ id: "p1-06", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "Adam-e10-b32 obtuvo la <strong>mejor accuracy de entrenamiento</strong> (99,41 %) pero peor test que Adam-e10-b128. ¿Qué enseña?",
  o: ["Que el lote 32 siempre es peor", "Que ajustar más el entrenamiento no garantiza generalizar mejor", "Que hubo un error en el código", "Que el test es más fácil que el entrenamiento"],
  a: 1, e: "Lo relevante es el rendimiento en datos no vistos; más ajuste en train puede ser algo de sobreajuste (brecha 1,80 pp frente a 1,53 pp).", r: "apuntes/tema-1.html#p1-interp" },

{ id: "p1-07", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Por qué SGD quedó claramente por detrás (91–95 % en test)?",
  o: ["Porque SGD es intrínsecamente incapaz de aprender MNIST",
      "Porque con su tasa por defecto, sin momentum y con 5–10 épocas converge más lentamente: está subajustando",
      "Porque sobreajusta mucho",
      "Porque no admite lotes de 128"],
  a: 1, e: "No es que SGD sea peor siempre: con más épocas, momentum o una tasa ajustada podría acercarse. Train y test bajos y parecidos ⇒ subajuste.", r: "apuntes/tema-1.html#p1-interp" },

{ id: "p1-08", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "SGD-e5-b128 tiene accuracy de test (91,07 %) ligeramente <em>mayor</em> que la de train (90,56 %). ¿Cómo se interpreta?",
  o: ["El test es más fácil en general", "Fluctuación normal por composición de los datos cuando el modelo subajusta; no indica nada especial", "Hay fuga del test al entrenamiento", "El modelo sobreajusta"],
  a: 1, e: "Brechas pequeñas negativas son ruido estadístico en un modelo que aún no ha aprendido lo suficiente.", r: "apuntes/tema-1.html#p1-interp" },

{ id: "p1-09", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Cuál fue la confusión más frecuente del mejor modelo de la P1?",
  o: ["1 → 7", "4 → 9 (14 casos)", "0 → 6", "8 → 3"],
  a: 1, e: "4→9 (14), seguida de 3→5 (11). Son grafías que comparten trazos.", r: "apuntes/tema-1.html#p1-interp" },

{ id: "p1-10", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Por qué el tiempo registrado mide solo la llamada a <code>fit</code>?",
  o: ["Porque predecir es instantáneo", "Porque el enunciado pide el tiempo de entrenamiento, no el del análisis completo", "Porque <code>predict</code> no se puede cronometrar", "Para que SGD parezca más rápido"],
  a: 1, e: "Incluir predicción y métricas mezclaría costes distintos.", r: "apuntes/tema-1.html#p1-bucle" },

{ id: "p1-11", t: "T1", p: "P1", k: "codigo", s: "Práctica 1",
  q: "¿Qué hace esta línea al calcular la matriz de confusión?",
  c: `matrix = np.zeros((10, 10), dtype=np.int64)
np.add.at(matrix, (y_true, y_pred), 1)`,
  o: ["Suma 1 a cada celda de la diagonal",
      "Para cada ejemplo, suma 1 en la celda [clase real, clase predicha], acumulando correctamente aunque un par se repita",
      "Calcula la accuracy",
      "Normaliza la matriz por filas"],
  a: 1, e: "<code>np.add.at</code> hace una suma sin buffer: si el par (i, j) aparece 50 veces, suma 50. <code>matrix[y_true, y_pred] += 1</code> solo sumaría 1 por par repetido.", r: "apuntes/tema-1.html#p1-modelo" },

{ id: "p1-12", t: "T1", p: "P1", k: "codigo", s: "Práctica 1",
  q: "¿Cómo decide este código qué modelo es mejor?",
  c: `score = (test_accuracy, -test_errors, -elapsed)
if score > best_score:
    best_model, best_key, best_score = model, name, score`,
  o: ["Por menor tiempo", "Por mayor accuracy de test; en empate, menos errores; en empate, menos tiempo (comparación lexicográfica de tuplas)", "Por la suma de los tres valores", "Al azar"],
  a: 1, e: "Python compara tuplas elemento a elemento; los signos negativos convierten «menos es mejor» en «más es mejor».", r: "apuntes/tema-1.html#p1-bucle" },

{ id: "p1-13", t: "T1", p: "P1", k: "codigo", s: "Práctica 1",
  q: "¿Por qué los optimizadores se definen así y no como instancias directas?",
  c: `OPTIMIZERS = {
    "SGD": lambda: tf.keras.optimizers.SGD(),
    "Adam": lambda: tf.keras.optimizers.Adam(),
}
model.compile(optimizer=OPTIMIZERS[name](), ...)`,
  o: ["Por estética", "Para crear un optimizador nuevo para cada modelo: guardan estado interno (momentos de Adam) y no deben compartirse entre modelos", "Porque Keras no acepta instancias", "Para que todos usen la misma tasa"],
  a: 1, e: "Reutilizar la misma instancia arrastraría el estado del entrenamiento anterior.", r: "apuntes/tema-1.html#p1-diseno" },

{ id: "p1-14", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Qué conserva el formato <code>.keras</code> con el que se guarda el mejor modelo?",
  o: ["Solo los pesos", "Arquitectura, pesos y configuración de compilación", "Solo la arquitectura", "Los datos de entrenamiento"],
  a: 1, e: "El formato .keras se recarga con <code>tf.keras.models.load_model</code> sin redefinir el modelo. La práctica lo recarga y comprueba que reproduce el 97,76 %.", r: "apuntes/tema-1.html#p1-guardar" },

{ id: "p1-15", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Qué conclusión de la P1 es científicamente válida?",
  o: ["Adam es siempre el mejor optimizador", "Adam-e10-b128 fue la mejor dentro del espacio, arquitectura y semilla probados", "El lote 128 siempre generaliza mejor", "10 épocas es el número óptimo para cualquier red"],
  a: 1, e: "Las conclusiones no deben extrapolarse más allá de las condiciones experimentadas (una semilla, una arquitectura).", r: "apuntes/tema-1.html#p1-interp" },

{ id: "p1-16", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "Al pasar de 5 a 10 épocas con Adam y RMSprop, el train mejora más que el test. ¿Qué indica?",
  o: ["Subajuste", "El inicio de cierto sobreajuste (aumenta la brecha)", "Que el test está mal etiquetado", "Que la tasa de aprendizaje es demasiado baja"],
  a: 1, e: "Crece la brecha train−test: el modelo empieza a ajustar detalles del entrenamiento que no generalizan.", r: "apuntes/tema-1.html#p1-interp" },

{ id: "p1-17", t: "T1", p: "P1", k: "codigo", s: "Práctica 1",
  q: "¿Para qué sirve esta comprobación dentro de <code>evaluate_predictions</code>?",
  c: `if matrix.sum() != len(y) or errors != len(y) - np.trace(matrix):
    raise RuntimeError("Las métricas calculadas no son coherentes")`,
  o: ["Para normalizar la matriz", "Para verificar que la matriz contiene todos los ejemplos y que errores = N − aciertos de la diagonal", "Para calcular el tiempo", "Para elegir el mejor modelo"],
  a: 1, e: "Es una verificación de consistencia entre métricas: la suma de la matriz es N y su traza son los aciertos.", r: "apuntes/tema-1.html#p1-modelo" },

{ id: "p1-18", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Por qué se dividen los píxeles de MNIST por 255?",
  o: ["Para convertirlos a enteros", "Para llevarlos de [0, 255] a [0, 1], mejorar el condicionamiento numérico y estabilizar los gradientes", "Para reducir el número de clases", "Para aplanar la imagen"],
  a: 1, e: "La normalización facilita la optimización; se aplica igual en todas las configuraciones.", r: "apuntes/tema-1.html#p1-datos" },

{ id: "p1-19", t: "T1", p: "P1", k: "practica", s: "Práctica 1",
  q: "¿Por qué Adam-e10-b128 (3,3 s) es unas 2,6 veces más rápido que Adam-e10-b32 (8,6 s)?",
  o: ["Porque usa menos épocas", "Porque con lote 128 hace unas 4 veces menos actualizaciones por época y aprovecha mejor el cálculo vectorizado", "Porque tiene menos parámetros", "Por casualidad"],
  a: 1, e: "469 frente a 1 875 iteraciones por época; cada iteración con lote mayor es algo más cara, pero en total tarda mucho menos.", r: "apuntes/tema-1.html#p1-interp" },

/* ----------------------------------------------------------------- P2 */
{ id: "p2-01", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "¿Cómo se construyen las etiquetas binarias en la P2?",
  o: ["<code>y = dígito // 2</code>", "<code>y = dígito % 2</code> (0 = par, 1 = impar)", "<code>y = dígito &gt; 4</code>", "One-hot de 10 clases"],
  a: 1, e: "El resto de dividir entre 2 da 0 para pares y 1 para impares.", r: "apuntes/tema-1.html#p2-datos" },

{ id: "p2-02", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "¿Qué capa de salida y pérdida se usan en la P2?",
  o: ["Dense(10, softmax) + sparse_categorical_crossentropy", "Dense(1, sigmoid) + binary_crossentropy, con umbral 0,5", "Dense(2, relu) + MSE", "Dense(1, linear) + MSE"],
  a: 1, e: "Una neurona sigmoide devuelve P(impar); se clasifica impar si ≥ 0,5.", r: "apuntes/tema-1.html#p2-modelos" },

{ id: "p2-03", t: "T1", p: "P2", k: "codigo", s: "Práctica 2",
  q: "¿Qué ocurre con esta capa de salida en un problema binario?",
  c: `layers.append(tf.keras.layers.Dense(1, activation='softmax'))
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])`,
  o: ["Funciona igual que la sigmoide",
      "Softmax sobre una sola neurona siempre devuelve 1,0: el modelo predice siempre «impar» y no aprende",
      "Da error de compilación",
      "Equivale a una salida lineal"],
  a: 1, e: "$e^{z}/e^{z}=1$ para cualquier $z$. Con una neurona hay que usar sigmoide (o 2 neuronas softmax con pérdida categórica).", r: "apuntes/tema-1.html#t1-perdida" },

{ id: "p2-04", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "¿Cómo se eligió la mejor configuración en la P2?",
  o: ["Por accuracy de test", "Exclusivamente con un conjunto de validación (6 000 imágenes: 3 000 pares y 3 000 impares); el test solo al final", "Por menor tiempo", "Por mayor accuracy de entrenamiento"],
  a: 1, e: "Corrige la limitación de la P1: el test queda intacto para la estimación final.", r: "apuntes/tema-1.html#p2-datos" },

{ id: "p2-05", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "¿Qué configuración ganó en validación?",
  o: ["base-10", "base-20-stop", "densa-20-stop (128-64 sin Dropout)", "densa-dropout-20-stop (128-64 con Dropout 0,2)"],
  a: 3, e: "98,25 % en validación (105 errores), pesos de la época 8. En test: 98,56 % (144 errores).", r: "apuntes/tema-1.html#p2-resultados" },

{ id: "p2-06", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "La red con una capa densa más y <strong>sin</strong> Dropout se detuvo en la época 6 con los mejores pesos en la época 2 y fue la peor. ¿Interpretación?",
  o: ["Subajuste por falta de capacidad", "Sobreajusta muy rápido: más capacidad sin regularizar no garantiza mejor solución", "Error en la parada temprana", "Que la capa extra no se entrenó"],
  a: 1, e: "Su val_loss mínima llega pronto y luego empeora. Con Dropout 0,2 la misma arquitectura pasa a ser la mejor.", r: "apuntes/tema-1.html#p2-resultados" },

{ id: "p2-07", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "El ganador supera a base-20-stop por solo 2 ejemplos de 6 000. ¿Qué se debe concluir?",
  o: ["Que siempre será superior", "Que es el mejor entre los probados, pero la ventaja no es concluyente con una sola semilla", "Que hay un error", "Que Dropout empeora el modelo"],
  a: 1, e: "Diferencias tan pequeñas están dentro de la variabilidad por semilla y muestra.", r: "apuntes/tema-1.html#p2-resultados" },

{ id: "p2-08", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "¿Por qué las configuraciones de la P2 se diseñaron para cambiar <strong>un solo factor</strong> cada vez?",
  o: ["Para ahorrar tiempo", "Para poder atribuir cada diferencia de rendimiento a un cambio concreto", "Porque Keras no permite más cambios", "Para obtener siempre la misma accuracy"],
  a: 1, e: "Si cambian a la vez capas, Dropout y épocas, no se sabe qué produjo la mejora (fallo frecuente en entregas de compañeros).", r: "apuntes/tema-1.html#p2-modelos" },

{ id: "p2-09", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "¿Por qué la accuracy de entrenamiento se recalcula con <code>predict</code> tras <code>fit</code> en lugar de usar la del historial?",
  o: ["Porque el historial no guarda accuracy", "Para medirla sin Dropout (en inferencia) y con los pesos finales restaurados, de forma comparable entre modelos", "Para que sea más alta", "Porque fit no calcula métricas"],
  a: 1, e: "Durante <code>fit</code>, la métrica de train se calcula con Dropout activo y con pesos que cambian dentro de la época.", r: "apuntes/tema-1.html#p2-modelos" },

{ id: "p2-10", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "En test, ¿qué dígitos acumularon más errores de paridad?",
  o: ["0 y 1", "8 y 9 (23 y 25 errores)", "3 y 6", "Todos por igual"],
  a: 1, e: "8 (23) y 9 (25) son los más difíciles; 0 (6) y 3 (7) los más fáciles.", r: "apuntes/tema-1.html#p2-resultados" },

{ id: "p2-11", t: "T1", p: "P2", k: "codigo", s: "Práctica 2",
  q: "Completa la predicción binaria a partir de la salida sigmoide:",
  c: `probabilities = model.predict(x, batch_size=512, verbose=0).ravel()
predictions = ______`,
  o: ["<code>np.argmax(probabilities)</code>", "<code>(probabilities &gt;= 0.5).astype('int32')</code>", "<code>probabilities.round(2)</code>", "<code>np.argmax(probabilities, axis=1)</code>"],
  a: 1, e: "Con una sola neurona no hay argmax entre clases: se aplica el umbral 0,5. <code>.ravel()</code> pasa de (n, 1) a (n,).", r: "apuntes/tema-1.html#p2-modelos" },

{ id: "p2-12", t: "T1", p: "P2", k: "practica", s: "Práctica 2",
  q: "Pasar la base de 10 a 20 épocas (con parada temprana) mejora la validación en 9 ejemplos pero la brecha train−val sube de 1,33 a 1,63 pp. ¿Qué indica?",
  o: ["Que seguir optimizando el entrenamiento puede empeorar la generalización (más sobreajuste)", "Que el modelo subajusta", "Que la validación está contaminada", "Nada relevante"],
  a: 0, e: "Train sube más que validación: mayor brecha = más memorización.", r: "apuntes/tema-1.html#p2-resultados" },

{ id: "p2-13", t: "T1", p: "P2", k: "codigo", s: "Práctica 2",
  q: "¿Qué asegura esta línea?",
  c: `assert len(np.intersect1d(np.flatnonzero(fit_mask), validation_indices)) == 0`,
  o: ["Que las clases estén equilibradas", "Que ningún ejemplo de validación se use también para entrenar (sin solapamiento)", "Que el test no se haya tocado", "Que hay 6 000 ejemplos"],
  a: 1, e: "<code>intersect1d</code> busca índices comunes; debe estar vacío.", r: "apuntes/tema-1.html#p2-datos" }

]);
