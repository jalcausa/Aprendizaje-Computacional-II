/* Banco de preguntas · Lab 1 (teoría: texto a secuencias, Zipf, perplejidad, representaciones + cuaderno) */
window.PREGUNTAS = (window.PREGUNTAS || []).concat([].concat([

/* ---------------------------------------------------------------- teoría: tokenización y vocabulario */
{ id: "l1t-01", t: "L1", p: null, k: "teoria", s: "Preprocesado de texto",
  q: "¿Cuál es el orden correcto de los pasos típicos para convertir texto en bruto en datos de entrada de un modelo?",
  o: ["Cargar el texto como cadena → dividirlo en tokens → construir un vocabulario que asigne un índice a cada token → convertir el texto en secuencias de índices",
      "Construir el vocabulario → cargar el texto → convertir en índices → dividir en tokens",
      "Dividir en tokens → entrenar el modelo → construir el vocabulario → cargar el texto",
      "Cargar el texto → convertir cada carácter a su código ASCII → entrenar"],
  a: 0, e: "Son los cuatro pasos de las diapositivas. Antes de tokenizar se suele limpiar el texto (minúsculas, quitar puntuación).", r: "apuntes/lab-1.html#l1-pipeline" },

{ id: "l1t-02", t: "L1", p: null, k: "teoria", s: "Tokenización",
  q: "¿Qué es un token y quién decide qué constituye un token?",
  o: ["Es la unidad atómica (indivisible) del texto; qué es exactamente (carácter, palabra, subpalabra…) es una decisión de diseño",
      "Es siempre una palabra completa, por definición",
      "Es un número entero que asigna el sistema operativo",
      "Es una frase completa; lo decide la puntuación"],
  a: 0, e: "Cada paso temporal de la secuencia corresponde a un token, y se puede elegir trabajar con caracteres, palabras o trozos de palabra.", r: "apuntes/lab-1.html#l1-token" },

{ id: "l1t-03", t: "L1", p: null, k: "calculo", s: "Tokenización",
  q: "La frase «Baby needs a new pair of shoes» se tokeniza de dos formas: en palabras y en caracteres (incluidos los espacios). ¿Cuántos tokens da cada una?",
  o: ["7 palabras y 30 caracteres", "7 palabras y 24 caracteres", "6 palabras y 30 caracteres", "30 palabras y 7 caracteres"],
  a: 0, e: "4+5+1+3+4+2+5 = 24 letras más 6 espacios = 30 caracteres. Con palabras la secuencia es corta pero el vocabulario es enorme; con caracteres, al revés.", r: "apuntes/lab-1.html#l1-token" },

{ id: "l1t-04", t: "L1", p: null, k: "teoria", s: "Tokenización",
  q: "¿Qué afirmaciones sobre la tokenización en caracteres frente a la tokenización en palabras son correctas? (Selecciona todas)",
  o: ["Con caracteres el vocabulario es muy pequeño y no hay palabras desconocidas, porque toda palabra se descompone en caracteres conocidos",
      "Con caracteres las secuencias son mucho más largas, lo que aumenta el coste de cómputo",
      "Con palabras cada token lleva mucho más significado que un carácter",
      "Con palabras nunca aparecen tokens desconocidos"],
  a: [0, 1, 2], e: "Con palabras, cualquier palabra no vista en el entrenamiento se convierte en <code>&lt;unk&gt;</code>.", r: "apuntes/lab-1.html#l1-tipos" },

{ id: "l1t-05", t: "L1", p: null, k: "teoria", s: "Tokenización",
  q: "En la tokenización en subpalabras (estilo BPE), ¿cómo se construye el vocabulario?",
  o: ["Se parte de todos los caracteres y se fusiona repetidamente el par de símbolos adyacentes más frecuente del corpus, hasta alcanzar el tamaño de vocabulario deseado",
      "Se toman las palabras de un diccionario y se cortan por la mitad",
      "Se eligen al azar trozos de 3 caracteres",
      "Se separan las palabras por sus sílabas según la ortografía del idioma"],
  a: 0, e: "Por ejemplo, si ('e','s') es el par más frecuente, se crea el token «es». Después, «unhappiness» puede quedar como ['un', 'happ', 'i', 'ness'].", r: "apuntes/lab-1.html#l1-bpe" },

{ id: "l1t-06", t: "L1", p: null, k: "teoria", s: "Tokenización",
  q: "¿Por qué los modelos de lenguaje actuales usan subpalabras en lugar de palabras o caracteres?",
  o: ["Porque equilibran ambos extremos: vocabulario moderado, secuencias de longitud intermedia y palabras nuevas que se descomponen en subpalabras conocidas",
      "Porque eliminan la necesidad de un vocabulario",
      "Porque producen las secuencias más largas posibles",
      "Porque solo funcionan en inglés"],
  a: 0, e: "GPT-4 usa ≈ 100 000 tokens de unos 4 caracteres de media.", r: "apuntes/lab-1.html#l1-bpe" },

{ id: "l1t-07", t: "L1", p: null, k: "teoria", s: "Corpus y vocabulario",
  q: "¿Qué es un corpus?",
  o: ["Una colección de textos escritos o hablados con la que se entrena un modelo", "El vocabulario de un modelo", "El conjunto de pesos de una red", "Un diccionario oficial de un idioma"],
  a: 0, e: "Su tamaño va de miles de tokens (ajuste fino) a billones (modelos fundacionales).", r: "apuntes/lab-1.html#l1-corpus" },

{ id: "l1t-08", t: "L1", p: null, k: "teoria", s: "Corpus y vocabulario",
  q: "Un vocabulario se ha construido con los tokens del corpus de entrenamiento. Durante el test aparece un token que nunca se vio al entrenar. ¿Qué se hace?",
  o: ["Se representa con el token especial <code>&lt;unk&gt;</code> (desconocido)", "Se añade al vocabulario y se reentrena", "Se lanza un error", "Se ignora y se borra del texto"],
  a: 0, e: "En el lab, <code>vocab['ñ']</code> sobre el libro inglés devuelve el índice de <code>&lt;unk&gt;</code>.", r: "apuntes/lab-1.html#l1-vocab" },

{ id: "l1t-09", t: "L1", p: null, k: "calculo", s: "Corpus y vocabulario",
  q: "Tras pasar <em>The Time Machine</em> a minúsculas y sustituir todo lo que no es letra por un espacio, se tokeniza en caracteres. ¿Por qué el vocabulario tiene 28 elementos?",
  o: ["26 letras + el espacio + el token <code>&lt;unk&gt;</code>", "26 letras + 2 signos de puntuación", "28 letras del alfabeto inglés", "27 letras + el salto de línea"],
  a: 0, e: "La clase <code>Vocab</code> añade siempre <code>&lt;unk&gt;</code>, aunque no aparezca en el texto.", r: "apuntes/lab-1.html#l1-vocab" },

/* ---------------------------------------------------------------- teoría: Zipf */
{ id: "l1t-10", t: "L1", p: null, k: "teoria", s: "Ley de Zipf",
  q: "¿Qué establece la ley de Zipf para las frecuencias de las palabras de un texto?",
  o: ["Que la frecuencia $n_i$ de la $i$-ésima palabra más frecuente es proporcional a $1/i^{\\alpha}$, de modo que en escala log-log los puntos forman aproximadamente una recta de pendiente $-\\alpha$",
      "Que todas las palabras tienen la misma frecuencia",
      "Que la frecuencia crece exponencialmente con el rango",
      "Que la frecuencia de una palabra es proporcional a su longitud"],
  a: 0, e: "$\\log n_i=-\\alpha\\log i+c$. Para palabras, $\\alpha\\approx1$.", r: "apuntes/lab-1.html#l1-zipf" },

{ id: "l1t-11", t: "L1", p: null, k: "calculo", s: "Ley de Zipf",
  q: "En un texto que cumple exactamente la ley de Zipf con $\\alpha=1$, la palabra más frecuente aparece 6 000 veces. ¿Cuántas veces aparecerá, aproximadamente, la palabra de rango 3 y la de rango 100?",
  o: ["2 000 y 60", "3 000 y 600", "2 000 y 6", "18 000 y 600 000"],
  a: 0, e: "$n_i=n_1/i^{\\alpha}$: $6000/3=2000$ y $6000/100=60$.", r: "apuntes/lab-1.html#l1-zipf" },

{ id: "l1t-12", t: "L1", p: null, k: "calculo", s: "Ley de Zipf",
  q: "Al representar $\\log_{10}$ de la frecuencia frente a $\\log_{10}$ del rango, la recta ajustada pasa por los puntos $(\\log i,\\log n)=(1;\\,3)$ y $(3;\\,1{,}2)$. ¿Cuánto vale el exponente de Zipf $\\alpha$?",
  o: ["0,9", "−0,9", "1,8", "2,1"],
  a: 0, e: "Pendiente $=(1{,}2-3)/(3-1)=-0{,}9$, y $\\alpha$ es la pendiente cambiada de signo: 0,9.", r: "apuntes/lab-1.html#l1-zipf" },

{ id: "l1t-13", t: "L1", p: null, k: "teoria", s: "Ley de Zipf",
  q: "Comparando las curvas rango-frecuencia de unigramas, bigramas y trigramas de palabras de un mismo texto, ¿qué se observa?",
  o: ["Las tres siguen aproximadamente una ley de potencias, pero el exponente es menor (pendiente más suave) para bigramas y aún menor para trigramas",
      "Solo los unigramas siguen una ley de potencias",
      "Los trigramas tienen el exponente más alto",
      "Las tres curvas son idénticas"],
  a: 0, e: "En el lab: α ≈ 1,04 (unigramas), 0,65 (bigramas) y 0,38 (trigramas) en <em>The Time Machine</em>.", r: "apuntes/lab-1.html#l1-ngramas" },

{ id: "l1t-14", t: "L1", p: null, k: "teoria", s: "Ley de Zipf",
  q: "¿Por qué la ley de Zipf y la abundancia de n-gramas raros motivan el uso de modelos de aprendizaje profundo en lugar de modelos basados en contar frecuencias?",
  o: ["Porque la mayoría de palabras y casi todos los n-gramas aparecen muy pocas veces, así que un modelo que solo cuenta no puede estimar bien sus probabilidades; las redes generalizan entre contextos parecidos",
      "Porque contar es más lento que entrenar una red",
      "Porque las frecuencias de las palabras son todas iguales",
      "Porque los modelos de conteo no pueden usar el vocabulario"],
  a: 0, e: "En <em>The Time Machine</em>, el 52 % de las palabras y el 95 % de los trigramas aparecen una sola vez.", r: "apuntes/lab-1.html#l1-zipf" },

{ id: "l1t-15", t: "L1", p: null, k: "teoria", s: "Ley de Zipf",
  q: "¿Qué son las <em>stop words</em> y qué se hace con ellas en los modelos neuronales modernos?",
  o: ["Palabras muy frecuentes y poco descriptivas (artículos, pronombres, preposiciones); los clasificadores antiguos de bolsa de palabras las eliminaban, pero las RNN y Transformers no necesitan quitarlas porque también aportan significado",
      "Palabras que indican el final de una frase; siempre se eliminan",
      "Palabras que el vocabulario no conoce; se sustituyen por <code>&lt;unk&gt;</code>",
      "Palabras raras que aparecen una sola vez; se eliminan con <code>min_freq</code>"],
  a: 0, e: "Ejemplos en el lab: the, i, and, of, a… y en español de, la, que, el, y…", r: "apuntes/lab-1.html#l1-zipf" },

/* ---------------------------------------------------------------- teoría: perplejidad */
{ id: "l1t-16", t: "L1", p: null, k: "teoria", s: "Perplejidad",
  q: "¿Qué mide la perplejidad de un modelo de lenguaje y entre qué valores se mueve?",
  o: ["La incertidumbre del modelo al predecir el siguiente token; vale 1 para un modelo que acierta siempre con probabilidad 1 y el tamaño del vocabulario para un modelo que reparte la probabilidad uniformemente",
      "El porcentaje de palabras acertadas; entre 0 y 100",
      "La longitud media de las frases; entre 1 e infinito",
      "El número de parámetros del modelo"],
  a: 0, e: "Menor es mejor. Se interpreta como el número efectivo de opciones igual de probables entre las que duda el modelo.", r: "apuntes/lab-1.html#l1-pp" },

{ id: "l1t-17", t: "L1", p: null, k: "calculo", s: "Perplejidad",
  q: "Un modelo de lenguaje asigna estas probabilidades a la frase «a red fox.»: $P(\\text{a})=0{,}4$, $P(\\text{red}\\mid\\text{a})=0{,}27$, $P(\\text{fox}\\mid\\text{a red})=0{,}55$ y $P(\\text{.}\\mid\\text{a red fox})=0{,}79$. ¿Cuál es su perplejidad?",
  o: ["≈ 2,15", "≈ 0,047", "≈ 0,465", "≈ 21,3"],
  a: 0, e: "$P=0{,}4\\cdot0{,}27\\cdot0{,}55\\cdot0{,}79=0{,}0469$; $P_{norm}=0{,}0469^{1/4}=0{,}465$; $PP=1/0{,}465\\approx2{,}15$. 0,047 es la probabilidad y 0,465 la probabilidad normalizada.", r: "apuntes/lab-1.html#l1-pp-ejemplo" },

{ id: "l1t-18", t: "L1", p: null, k: "calculo", s: "Perplejidad",
  q: "Un modelo de lenguaje con un vocabulario de 6 palabras asigna siempre la misma probabilidad a cada palabra, sea cual sea el contexto. ¿Cuál es su perplejidad sobre cualquier frase?",
  o: ["6", "1", "1/6", "Depende de la longitud de la frase"],
  a: 0, e: "$P=(1/6)^n$, $P_{norm}=1/6$, $PP=6$: un modelo uniforme tiene perplejidad igual al tamaño del vocabulario, sin importar la longitud.", r: "apuntes/lab-1.html#l1-pp-ejemplo" },

{ id: "l1t-19", t: "L1", p: null, k: "teoria", s: "Perplejidad",
  q: "¿Por qué se normaliza la probabilidad de una frase con la raíz $n$-ésima ($P(W)^{1/n}$) antes de calcular la perplejidad?",
  o: ["Porque la probabilidad de una frase es un producto de probabilidades y disminuye con su longitud; la media geométrica permite comparar frases de distinta longitud",
      "Para que la perplejidad sea siempre menor que 1",
      "Porque las probabilidades pueden ser negativas",
      "Para convertir la probabilidad en un porcentaje"],
  a: 0, e: "Sin normalizar, cualquier frase larga parecería «peor» que una corta solo por tener más factores menores que 1.", r: "apuntes/lab-1.html#l1-pp-ejemplo" },

{ id: "l1t-20", t: "L1", p: null, k: "teoria", s: "Perplejidad",
  q: "¿Qué relación hay entre la perplejidad y la entropía cruzada media $H$ (en nats) de un modelo sobre un texto?",
  o: ["$PP=e^{H}$", "$PP=\\ln H$", "$PP=1/H$", "$PP=H^2$"],
  a: 0, e: "$PP=\\exp\\big(-\\frac1n\\sum\\log P(x_t\\mid x_{<t})\\big)=\\exp(\\text{entropía cruzada})$. Si se usa $\\log_2$, $PP=2^{H}$ con $H$ en bits.", r: "apuntes/lab-1.html#l1-pp-ejemplo" },

{ id: "l1t-21", t: "L1", p: null, k: "calculo", s: "Perplejidad",
  q: "Un modelo asigna a las cuatro palabras de una frase (cada una dadas las anteriores) las probabilidades 0,5; 0,25; 0,5 y 0,125. ¿Cuál es su perplejidad?",
  o: ["$2^{7/4}\\approx3{,}36$", "$2^{7}=128$", "$7/4=1{,}75$", "$2^{-7}\\approx0{,}0078$"],
  a: 0, e: "$P=2^{-1}\\cdot2^{-2}\\cdot2^{-1}\\cdot2^{-3}=2^{-7}$ y $PP=P^{-1/4}=2^{7/4}\\approx3{,}36$.", r: "apuntes/lab-1.html#l1-pp-ej" },

{ id: "l1t-22", t: "L1", p: null, k: "teoria", s: "Perplejidad",
  q: "Según las diapositivas, ¿cómo ha cambiado el papel de la perplejidad para evaluar LLM entre 2018–2022 y 2023–2026?",
  o: ["Antes una perplejidad menor se correlacionaba fuertemente con mejores modelos; ahora sigue siendo necesaria pero insuficiente, y se usan además benchmarks de razonamiento, tareas agénticas, programación, veracidad y contextos largos",
      "Ha dejado de usarse por completo",
      "Antes no se usaba y ahora es la única métrica",
      "Ahora se prefiere una perplejidad mayor"],
  a: 0, e: "Ejemplos de benchmarks: GPQA, MATH, AIME.", r: "apuntes/lab-1.html#l1-pp" },

/* ---------------------------------------------------------------- teoría: representaciones */
{ id: "l1t-23", t: "L1", p: null, k: "calculo", s: "Representaciones",
  q: "Con el vocabulario {h: 0, e: 1, l: 2, o: 3}, ¿cuál es la codificación one-hot del carácter «l»?",
  o: ["[0, 0, 1, 0]", "[2]", "[0, 1, 0, 0]", "[0, 0, 2, 0]"],
  a: 0, e: "Un vector de longitud 4 (el tamaño del vocabulario) con un 1 en la posición del índice de «l» (2).", r: "apuntes/lab-1.html#l1-onehot" },

{ id: "l1t-24", t: "L1", p: null, k: "teoria", s: "Representaciones",
  q: "¿Por qué la bolsa de palabras (BoW) no se usa como entrada directa de una RNN para modelar secuencias?",
  o: ["Porque descarta el orden de los tokens, que es precisamente lo que la RNN está diseñada para aprovechar",
      "Porque produce vectores demasiado pequeños",
      "Porque solo funciona con caracteres",
      "Porque necesita etiquetas"],
  a: 0, e: "«cat in the hat» y «the in cat hat» dan exactamente el mismo vector BoW.", r: "apuntes/lab-1.html#l1-bow" },

{ id: "l1t-25", t: "L1", p: null, k: "calculo", s: "Representaciones",
  q: "Se codifican los caracteres de «cat in the hat» con bolsa de palabras y el vocabulario [c, a, t, ' ', i, n, h, e]. ¿Cuál es el vector?",
  o: ["[1, 2, 3, 3, 1, 1, 2, 1]", "[1, 2, 2, 3, 1, 1, 2, 1]", "[1, 1, 1, 1, 1, 1, 1, 1]", "[1, 2, 3, 2, 1, 1, 2, 1]"],
  a: 0, e: "«t» aparece 3 veces (cat, the, hat) y el espacio otras 3. Ojo: la diapositiva dice «t» = 2, que es una errata.", r: "apuntes/lab-1.html#l1-bow" },

{ id: "l1t-26", t: "L1", p: null, k: "calculo", s: "Representaciones",
  q: "Corpus de dos documentos: «The cat sat on the mat» (6 palabras) y «The dog chased the cat» (5 palabras). Con IDF = $\\log_{10}(N/df)$, ¿cuánto vale el TF-IDF de «sat» en el primer documento y el de «cat» en el segundo?",
  o: ["≈ 0,05 y 0", "≈ 0,167 y 0,2", "0 y ≈ 0,06", "≈ 0,301 y 0,301"],
  a: 0, e: "«sat»: TF = 1/6, IDF = log(2/1) = 0,301 → 0,05. «cat» aparece en los dos documentos: IDF = log(2/2) = 0 → TF-IDF = 0.", r: "apuntes/lab-1.html#l1-tfidf" },

{ id: "l1t-27", t: "L1", p: null, k: "teoria", s: "Representaciones",
  q: "¿Qué afirmaciones sobre TF-IDF son correctas? (Selecciona todas)",
  o: ["Da peso cero a las palabras que aparecen en todos los documentos de la colección", "No necesita entrenamiento ni datos etiquetados y es rápido de calcular", "Capta el significado de las palabras y sus relaciones semánticas", "En tareas sencillas o con pocos datos puede incluso superar a los embeddings"],
  a: [0, 1, 3], e: "Su principal limitación, resuelta por los embeddings, es que no entiende el significado.", r: "apuntes/lab-1.html#l1-tfidf" },

{ id: "l1t-28", t: "L1", p: null, k: "teoria", s: "Representaciones",
  q: "¿Qué diferencia a los embeddings contextuales (BERT, GPT) de los embeddings estáticos (Word2Vec, GloVe)?",
  o: ["Los estáticos asignan un único vector a cada palabra; los contextuales dan un vector distinto según el contexto en que aparece la palabra",
      "Los estáticos capturan semántica y los contextuales no",
      "Los contextuales son vectores one-hot",
      "No hay diferencia; son nombres distintos de lo mismo"],
  a: 0, e: "Por ejemplo, «banco» (asiento o entidad financiera) tiene un único vector en Word2Vec, pero distinto según la frase en BERT.", r: "apuntes/lab-1.html#l1-evolucion" },

{ id: "l1t-29", t: "L1", p: null, k: "teoria", s: "Representaciones",
  q: "En un buen espacio de embeddings de palabras, ¿qué resultado se espera de la operación vectorial king − man + woman?",
  o: ["Un vector cercano a «queen»", "Un vector cercano a «man»", "El vector nulo", "Un vector one-hot"],
  a: 0, e: "El espacio aprende a partir de los patrones de uso una dirección asociada al género.", r: "apuntes/lab-1.html#l1-emb" },

/* ================================================================ cuaderno */
{ id: "l1-01", t: "L1", p: "L1", k: "codigo", s: "Cuaderno base",
  q: "¿Qué hace esta línea del cuaderno del Lab 1 sobre el texto «It's 10:30, Dr. Who!»?",
  c: `re.sub('[^A-Za-z]+', ' ', text).lower()`,
  o: ["Devuelve «it s dr who » : cada racha de caracteres que no son letras se sustituye por un único espacio y se pasa a minúsculas",
      "Devuelve «its 1030 dr who»: elimina solo la puntuación",
      "Devuelve una lista de palabras",
      "Elimina las letras y deja los números"],
  a: 0, e: "El <code>+</code> agrupa rachas como «'», « 10:30, » o «! » en un único espacio. Se pierden números, puntuación y mayúsculas.", r: "apuntes/lab-1.html#l1-base" },

{ id: "l1-02", t: "L1", p: "L1", k: "codigo", s: "Cuaderno base",
  q: "En la clase <code>Vocab</code> del Lab 1, ¿en qué orden se asignan los índices a los tokens?",
  c: `self.idx_to_token = list(sorted(set(['<unk>'] + reserved_tokens + [
    token for token, freq in self.token_freqs if freq >= min_freq])))
self.token_to_idx = {token: idx for idx, token in enumerate(self.idx_to_token)}`,
  o: ["En orden alfabético (por el <code>sorted</code>): el espacio recibe el índice 0 y <code>&lt;unk&gt;</code> el 1",
      "En orden de frecuencia decreciente: el token más frecuente recibe el 0",
      "En el orden en que aparecen en el texto",
      "Al azar"],
  a: 0, e: "Por eso «t» tiene índice 21 en el lab. Lo que sí está ordenado por frecuencia es <code>token_freqs</code>.", r: "apuntes/lab-1.html#l1-vocab" },

{ id: "l1-03", t: "L1", p: "L1", k: "codigo", s: "Cuaderno base",
  q: "¿Qué tokens produce este código con <code>words = ['the', 'time', 'machine', 'by']</code>?",
  c: `bigram_tokens = ['--'.join(pair) for pair in zip(words[:-1], words[1:])]`,
  o: ["['the--time', 'time--machine', 'machine--by']", "['the--time', 'machine--by']", "['the--the', 'time--time', 'machine--machine']", "['the time machine by']"],
  a: 0, e: "<code>zip</code> empareja cada palabra con la siguiente: con $N$ palabras hay $N-1$ bigramas, que se solapan.", r: "apuntes/lab-1.html#l1-base" },

{ id: "l1-04", t: "L1", p: "L1", k: "practica", s: "Ejercicio 2 · Zipf",
  q: "En el Lab 1, el ajuste lineal de la ley de Zipf para las palabras (unigramas) de <em>The Time Machine</em>, quitando los 10 primeros rangos y las palabras de frecuencia 1, da…",
  o: ["α ≈ 1,04 con $R^2$ ≈ 0,99", "α ≈ 0,38 con $R^2$ ≈ 0,89", "α ≈ 2,0 con $R^2$ ≈ 0,5", "α ≈ 0,65 con $R^2$ ≈ 0,97"],
  a: 0, e: "Muy cerca del valor clásico α = 1. 0,65 y 0,38 son los exponentes de bigramas y trigramas.", r: "apuntes/lab-1.html#l1-ej2" },

{ id: "l1-05", t: "L1", p: "L1", k: "practica", s: "Ejercicio 2 · Zipf",
  q: "¿Por qué en el ajuste de Zipf del Lab 1 se eliminan los n-gramas de frecuencia 1?",
  o: ["Porque son muchísimos (52 % de las palabras, 95 % de los trigramas) y forman una meseta horizontal que no sigue la recta: incluirlos aplana la pendiente y subestima α",
      "Porque son errores de tokenización",
      "Porque el logaritmo de 1 no está definido",
      "Porque el enunciado prohíbe usar números impares"],
  a: 0, e: "Con <code>min_freq = 1</code>, α cae a 0,46 en bigramas y 0,16 en trigramas. log(1) = 0 sí está definido.", r: "apuntes/lab-1.html#l1-herr" },

{ id: "l1-06", t: "L1", p: "L1", k: "codigo", s: "Ejercicio 2 · Zipf",
  q: "¿Qué devuelve como exponente de Zipf esta función y por qué?",
  c: `x, y = np.log10(rango[usar]), np.log10(f[usar])
pendiente, c = np.polyfit(x, y, 1)
alpha = -pendiente`,
  o: ["La pendiente cambiada de signo, porque $\\log n_i=-\\alpha\\log i+c$: la recta tiene pendiente negativa $-\\alpha$",
      "La ordenada en el origen, porque α es una constante",
      "La pendiente sin cambiar de signo, porque α siempre es negativo",
      "El coeficiente de correlación"],
  a: 0, e: "<code>polyfit(x, y, 1)</code> devuelve [pendiente, ordenada]. El exponente no depende de la base del logaritmo.", r: "apuntes/lab-1.html#l1-herr" },

{ id: "l1-07", t: "L1", p: "L1", k: "practica", s: "Ejercicio 2 · Zipf",
  q: "En el Lab 1, el $R^2$ del ajuste de Zipf baja de 0,99 (unigramas) a 0,97 (bigramas) y 0,89 (trigramas). ¿Por qué empeora con $n$?",
  o: ["Porque con trigramas casi todos aparecen una sola vez: tras quitar la cola quedan pocos puntos y la curva es escalonada (frecuencias 2, 3, 4… repetidas en muchos rangos)",
      "Porque los trigramas no siguen ninguna ley",
      "Porque el ajuste usa menos decimales",
      "Porque los trigramas tienen frecuencias más altas"],
  a: 0, e: "El 95 % de los 29 882 trigramas distintos tiene frecuencia 1; solo se ajustan 1 621 puntos.", r: "apuntes/lab-1.html#l1-ej2" },

{ id: "l1-08", t: "L1", p: "L1", k: "codigo", s: "Ejercicio 3 · Español",
  q: "Para analizar <em>Juvenilia</em> se reutiliza sin cambios el preprocesado del inglés. ¿Qué problema aparece?",
  c: `text_es = re.sub('[^A-Za-z]+', ' ', raw_es).lower()`,
  o: ["Las letras con tilde y la ñ se tratan como no-letras: «música» → «m sica» y «niño» → «ni o», lo que inventa palabras y altera todas las estadísticas",
      "Ninguno, el español usa el mismo alfabeto",
      "Se eliminan todas las vocales",
      "Se convierten todas las letras a mayúsculas"],
  a: 0, e: "Soluciones: incluir las letras del español en el regex (<code>[^a-záéíóúüñ]+</code>) o quitar antes las tildes con <code>unidecode</code>.", r: "apuntes/lab-1.html#l1-ej3" },

{ id: "l1-09", t: "L1", p: "L1", k: "practica", s: "Ejercicio 3 · Español",
  q: "En el Lab 1, al tokenizar <em>Juvenilia</em> en caracteres conservando tildes, diéresis y ñ, ¿cuántos elementos tiene el vocabulario?",
  o: ["35: 26 letras + á é í ó ú ü ñ + espacio + <code>&lt;unk&gt;</code>", "28, igual que en inglés", "33", "27"],
  a: 0, e: "26 + 7 = 33 letras, más el espacio (34 símbolos en el texto) y <code>&lt;unk&gt;</code>. Con Unidecode serían 28, como en inglés.", r: "apuntes/lab-1.html#l1-ej3" },

{ id: "l1-10", t: "L1", p: "L1", k: "practica", s: "Ejercicio 3 · Español",
  q: "En el Lab 1, ¿cómo cambian los exponentes de Zipf de <em>Juvenilia</em> al quitar las tildes con Unidecode en lugar de conservarlas?",
  o: ["Apenas cambian (diferencias en la tercera cifra decimal), aunque se fusionan 165 formas distintas como «él»/«el» o «qué»/«que»",
      "Se duplican",
      "Pasan a ser iguales que los del inglés",
      "Se vuelven negativos"],
  a: 0, e: "Unigramas 0,932 en ambos casos; bigramas 0,636 frente a 0,638.", r: "apuntes/lab-1.html#l1-ej3" },

{ id: "l1-11", t: "L1", p: "L1", k: "practica", s: "Ejercicio 4 · Comparación",
  q: "En el Lab 1 se obtiene α ≈ 1,04 para las palabras de <em>The Time Machine</em> y α ≈ 0,93 para <em>Juvenilia</em>. ¿Qué conclusión es la más correcta?",
  o: ["Ambos cumplen Zipf con α cerca de 1; el español tiene una cola algo más plana (más formas distintas por su morfología), pero la magnitud de la diferencia depende del tamaño del corpus y del método de ajuste",
      "El español no cumple la ley de Zipf",
      "El inglés es un idioma más rico porque su α es mayor",
      "La diferencia demuestra un error en el código"],
  a: 0, e: "Con el mismo tamaño y MCO la diferencia crece (1,04 frente a 0,86–0,90); con el ajuste por intervalos casi desaparece (1,01 frente a 0,96–0,97).", r: "apuntes/lab-1.html#l1-ej4" },

{ id: "l1-12", t: "L1", p: "L1", k: "practica", s: "Ejercicio 4 · Comparación",
  q: "¿Por qué en el Lab 1 se ajusta también la ley de Zipf en fragmentos de <em>Juvenilia</em> de 32 775 palabras?",
  o: ["Porque los corpus tienen tamaños distintos (84 269 frente a 32 775 palabras) y el exponente estimado depende del tamaño: para comparar idiomas hay que igualarlo",
      "Porque el archivo completo no cabe en memoria",
      "Porque el enunciado pide usar solo la mitad del libro",
      "Para acelerar el ajuste"],
  a: 0, e: "Con más texto aparecen más palabras raras y cambia la cola de la distribución.", r: "apuntes/lab-1.html#l1-ej4" },

{ id: "l1-13", t: "L1", p: "L1", k: "practica", s: "Ejercicio 4 · Comparación",
  q: "¿Qué diferencias entre las frecuencias de letras del inglés y del español se observan en el Lab 1? (Selecciona todas)",
  o: ["En ambos idiomas la letra más frecuente es la «e» (≈ 12,7 % de las letras)", "El inglés usa mucho más la «t» y la «h» (the, that…)", "El español usa más la «a», la «o» y la «s» (género y plurales)", "En español la letra más frecuente es la «ñ»"],
  a: [0, 1, 2], e: "Los órdenes obtenidos coinciden casi exactamente con los de corpus grandes: e t a o i n… en inglés y e a o s r n… en español.", r: "apuntes/lab-1.html#l1-ej4" },

{ id: "l1-14", t: "L1", p: "L1", k: "practica", s: "Ejercicio 4 · Comparación",
  q: "En <em>The Time Machine</em>, «i» es la segunda palabra más frecuente y «my» la décima, algo que no ocurre en los grandes corpus del inglés. ¿Por qué?",
  o: ["Porque la novela está narrada en primera persona: un solo libro refleja el estilo de su autor", "Porque el preprocesado convierte «I» en «i»", "Por un error en el contador", "Porque «i» es un número romano"],
  a: 0, e: "Es una de las limitaciones de un corpus pequeño y de un solo autor.", r: "apuntes/lab-1.html#l1-ej4" },

{ id: "l1-15", t: "L1", p: "L1", k: "practica", s: "Ejercicio 5 · Perplejidad",
  q: "En el Lab 1 se mide la perplejidad en test de modelos de n-gramas de caracteres con suavizado de Laplace. Baja de ≈ 17 (n = 1) a ≈ 5,4 (n = 4), pero vuelve a subir con n = 6. ¿Por qué?",
  o: ["Porque con contextos largos la mayoría de combinaciones se han visto pocas veces o nunca en el entrenamiento (la cola de Zipf), así que el modelo de conteo no generaliza",
      "Porque con más contexto hay menos información",
      "Porque el suavizado de Laplace solo funciona con n = 4",
      "Porque el test es más corto"],
  a: 0, e: "Es la motivación de las redes neuronales (RNN en el Lab 2), que comparten parámetros entre contextos parecidos.", r: "apuntes/lab-1.html#l1-ej5" },

{ id: "l1-16", t: "L1", p: "L1", k: "practica", s: "Ejercicio 5 · Perplejidad",
  q: "En el Lab 1, el modelo de unigramas de caracteres (sin contexto) de <em>The Time Machine</em> tiene perplejidad ≈ 17, menor que 27, el número de símbolos distintos. ¿Por qué?",
  o: ["Porque las letras no son equiprobables (el espacio y la «e» son mucho más frecuentes), así que incluso sin contexto el modelo hace mejor que el azar",
      "Porque el modelo usa el carácter anterior",
      "Porque se han eliminado letras del vocabulario",
      "Porque la perplejidad no puede superar 20"],
  a: 0, e: "Un modelo uniforme tendría exactamente PP = 27.", r: "apuntes/lab-1.html#l1-ej5" },

{ id: "l1-17", t: "L1", p: "L1", k: "codigo", s: "Ejercicio 5 · Perplejidad",
  q: "En este cálculo de la probabilidad de un modelo de n-gramas de caracteres, ¿para qué se suma 1 al numerador y el tamaño del alfabeto al denominador?",
  c: `p = (cuentas_ngrama[test[i - n + 1:i + 1]] + 1) / (cuentas_contexto[test[i - n + 1:i]] + len(alfabeto))`,
  o: ["Es el suavizado de Laplace: evita probabilidades 0 para combinaciones no vistas en el entrenamiento (que harían infinita la perplejidad) y mantiene que las probabilidades sumen 1",
      "Para normalizar por la longitud de la frase",
      "Para que la perplejidad sea siempre 1",
      "Para evitar dividir por un número negativo"],
  a: 0, e: "Con una sola probabilidad 0 en el test, log(0) = −∞ y la perplejidad sería infinita.", r: "apuntes/lab-1.html#l1-ej5" }

]).map(function (q, i) {
  /* reparte la respuesta correcta entre A–D (las preguntas se escriben con la correcta donde convenga) */
  if (Array.isArray(q.a)) return q;
  const n = q.o.length, shift = (i % n - q.a + n) % n;
  const o = q.o.map(function (_, j) { return q.o[(j - shift + n) % n]; });
  return Object.assign({}, q, { o: o, a: i % n });
}));
