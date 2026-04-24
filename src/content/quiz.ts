export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  label: string
  description: string
  questions: QuizQuestion[]
}

const fundamentosQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "¿Qué es el Virtual DOM?",
    options: [
      "Una copia del DOM real guardada en el servidor",
      "Una representación en memoria del árbol de UI que React usa para calcular los cambios mínimos",
      "Un DOM alternativo creado por el navegador para mejor rendimiento",
      "Una librería separada que reemplaza al DOM",
    ],
    correctIndex: 1,
    explanation:
      "El Virtual DOM es un árbol de objetos JavaScript que React mantiene en memoria. Antes de tocar el DOM real, compara el nuevo árbol contra el anterior (diffing) y solo aplica los cambios necesarios — proceso llamado reconciliación.",
  },
  {
    id: "q2",
    question: "¿Cuál es la diferencia fundamental entre state y props?",
    options: [
      "No hay diferencia, son sinónimos",
      "Props son inmutables desde dentro del componente; state es mutable y local",
      "State se pasa de padre a hijo; props son internas al componente",
      "Props solo funcionan en componentes de clase",
    ],
    correctIndex: 1,
    explanation:
      "Las props vienen del padre y el componente no las puede cambiar — son de solo lectura. El state es privado al componente y puede cambiar con setState/useState, lo que dispara un re-render.",
  },
  {
    id: "q3",
    question: "¿Qué pasa cuando llamas a useState con un valor inicial costoso de calcular?",
    options: [
      "Nada especial, React lo optimiza automáticamente",
      "Debes usar useMemo para envolverlo",
      "Puedes pasar una función inicializadora para que solo se ejecute una vez",
      "Debes calcularlo fuera del componente",
    ],
    correctIndex: 2,
    explanation:
      "useState acepta una función inicializadora: useState(() => computeExpensive()). React la llama solo en el primer render. Si pasas el valor directamente (useState(compute())), se recalcula en cada render aunque se descarte.",
  },
  {
    id: "q4",
    question: "¿Cuál es la regla más importante de los Hooks?",
    options: [
      "Solo se pueden usar en componentes de clase",
      "Solo se pueden llamar en el nivel superior del componente, nunca dentro de condicionales o loops",
      "Deben empezar con 'use' en minúsculas",
      "No se pueden combinar más de 5 hooks en un componente",
    ],
    correctIndex: 1,
    explanation:
      "React identifica el estado de cada Hook por su orden de llamada. Si los llamas dentro de condicionales o loops, ese orden puede cambiar entre renders y React perderá qué estado corresponde a qué Hook.",
  },
  {
    id: "q5",
    question: "¿Qué retorna useRef?",
    options: [
      "El valor actual del DOM directamente",
      "Un objeto { current } que persiste entre renders sin causar re-renders al mutar current",
      "Una función para actualizar el valor y disparar un re-render",
      "Un observable que emite cuando el valor cambia",
    ],
    correctIndex: 1,
    explanation:
      "useRef devuelve { current: initialValue }. Mutar .current no dispara re-render. Es útil para referencias al DOM, timers, o guardar valores previos sin necesidad de que el componente se actualice.",
  },
]

const hooksQuestions: QuizQuestion[] = [
  {
    id: "q6",
    question: "useEffect con array de dependencias vacío [] se ejecuta...",
    options: [
      "En cada render",
      "Solo cuando alguna prop cambia",
      "Una sola vez después del primer render (mount)",
      "Nunca se ejecuta automáticamente",
    ],
    correctIndex: 2,
    explanation:
      "[] le dice a React: 'no hay dependencias externas'. El efecto corre una vez al montar y el cleanup corre al desmontar — equivalente a componentDidMount + componentWillUnmount.",
  },
  {
    id: "q7",
    question: "¿Cuál es la diferencia entre useMemo y useCallback?",
    options: [
      "No hay diferencia, son alias",
      "useMemo memoiza el resultado de una función; useCallback memoiza la función misma",
      "useCallback es más rápido que useMemo",
      "useMemo solo funciona con objetos, useCallback con primitivos",
    ],
    correctIndex: 1,
    explanation:
      "useMemo(() => compute(a, b), [a, b]) devuelve el valor calculado. useCallback(() => fn(a), [a]) devuelve la función. useCallback(fn, deps) equivale a useMemo(() => fn, deps).",
  },
  {
    id: "q8",
    question: "¿Cuándo tiene sentido usar useReducer en lugar de useState?",
    options: [
      "Siempre que el estado sea un número",
      "Cuando el estado tiene múltiples sub-valores relacionados o la lógica de actualización es compleja",
      "Solo cuando necesitas Redux",
      "Cuando el componente tiene más de 3 estados",
    ],
    correctIndex: 1,
    explanation:
      "useReducer brilla cuando las actualizaciones de estado dependen del estado previo de manera compleja, o cuando varios campos cambian juntos. Centraliza la lógica en un reducer puro y hace el flujo más predecible.",
  },
  {
    id: "q9",
    question: "¿Qué diferencia hay entre useEffect y useLayoutEffect?",
    options: [
      "useLayoutEffect no acepta cleanup",
      "useLayoutEffect se ejecuta síncronamente después del DOM pero antes de que el navegador pinte",
      "useEffect es para efectos síncronos y useLayoutEffect para asíncronos",
      "No hay diferencia en React moderno",
    ],
    correctIndex: 1,
    explanation:
      "useLayoutEffect corre después de que React actualiza el DOM pero antes del paint del navegador — ideal para leer layout o evitar flickers visuales. useEffect corre después del paint, es asíncrono y menos bloqueante.",
  },
  {
    id: "q10",
    question: "¿Qué hace React.memo?",
    options: [
      "Memoiza el resultado de un hook",
      "Evita re-renders de un componente si sus props no cambiaron (comparación superficial)",
      "Guarda el componente en caché del navegador",
      "Congela las props del componente para que no cambien",
    ],
    correctIndex: 1,
    explanation:
      "React.memo envuelve un componente y hace una comparación shallow de las props anteriores vs nuevas. Si son iguales, React reutiliza el resultado anterior. No ayuda si las props son objetos/funciones creados en cada render.",
  },
]

const patronesQuestions: QuizQuestion[] = [
  {
    id: "q11",
    question: "¿Qué problema principal resuelve el patrón Render Props?",
    options: [
      "Mejora el rendimiento evitando re-renders",
      "Comparte lógica con estado entre componentes sin herencia",
      "Reemplaza completamente a los hooks",
      "Permite acceder al DOM directamente",
    ],
    correctIndex: 1,
    explanation:
      "Render Props permite que un componente delegue qué renderizar pasando una función como prop. Esto comparte lógica con estado (ej: posición del mouse) entre componentes distintos. Hoy los hooks suelen ser la alternativa más limpia.",
  },
  {
    id: "q12",
    question: "¿Qué es un Higher-Order Component (HOC)?",
    options: [
      "Un componente que tiene más de 100 líneas",
      "Una función que recibe un componente y retorna uno nuevo con funcionalidad extendida",
      "Un componente padre que controla todos los estados",
      "Un componente que usa todos los hooks disponibles",
    ],
    correctIndex: 1,
    explanation:
      "Un HOC es una función pura: toma un componente, lo envuelve con lógica adicional y retorna el componente mejorado. Ejemplo: withAuth(Component). Son un patrón de composición, no de la API de React.",
  },
  {
    id: "q13",
    question: "¿Qué es prop drilling?",
    options: [
      "Pasar props usando el operador spread en cada componente",
      "Pasar props por componentes intermedios que no las necesitan solo para que lleguen a un componente profundo",
      "Usar demasiadas props en un mismo componente",
      "Pasar funciones como props entre componentes hermanos",
    ],
    correctIndex: 1,
    explanation:
      "Prop drilling es cuando pasas datos por componentes intermedios solo para que lleguen a un componente profundo. El problema: los componentes intermedios tienen acoplamiento innecesario. Soluciones: Context, composición (children), o state managers.",
  },
  {
    id: "q14",
    question: "¿Por qué es importante la prop key en listas?",
    options: [
      "Solo es requerida por TypeScript para tipado seguro",
      "Mejora el SEO de la lista",
      "Permite a React identificar qué elemento cambió, se agregó o se eliminó durante la reconciliación",
      "Es solo una convención, React funciona igual sin ella",
    ],
    correctIndex: 2,
    explanation:
      "Sin key estable, React usa la posición del elemento para reconciliar — y puede reutilizar el nodo equivocado al reordenar. Con key única y estable, React puede mover, agregar y eliminar elementos eficientemente.",
  },
  {
    id: "q15",
    question: "¿Qué es un componente controlado en formularios?",
    options: [
      "Un componente que no permite al usuario editarlo",
      "Un componente cuyo valor es controlado por React a través del state, no por el DOM",
      "Un componente que valida su propio input automáticamente",
      "Un componente que se controla desde un componente padre siempre",
    ],
    correctIndex: 1,
    explanation:
      "En un componente controlado, el state de React es la 'fuente de verdad'. El input recibe value={state} y onChange actualiza el state. El DOM refleja React, no al revés. Lo opuesto es no controlado, donde el DOM maneja su propio estado.",
  },
]

const avanzadoQuestions: QuizQuestion[] = [
  {
    id: "qa1",
    question: "¿Qué garantiza React al usar startTransition?",
    options: [
      "Que la actualización se ejecuta en un Web Worker para no bloquear el hilo principal",
      "Que la actualización es urgente y se procesa antes que cualquier otra",
      "Que la actualización puede ser interrumpida si llega una actualización más urgente",
      "Que el componente no se re-renderiza hasta que la transición termina",
    ],
    correctIndex: 2,
    explanation:
      "startTransition marca una actualización como no urgente. React puede interrumpirla si aparece algo urgente (como un keystroke). Esto evita que actualizaciones pesadas bloqueen la UI — el hilo principal sigue siendo uno solo.",
  },
  {
    id: "qa2",
    question: "¿Cuál es la diferencia entre un React Server Component y un Client Component?",
    options: [
      "Los Server Components se renderizan en el servidor y nunca envían JavaScript al cliente; los Client Components sí",
      "Los Server Components son más rápidos porque usan WebSockets en lugar de HTTP",
      "Los Client Components solo funcionan en el navegador; los Server Components funcionan en ambos lados",
      "No hay diferencia real, es solo una convención de nombres",
    ],
    correctIndex: 0,
    explanation:
      "Los RSC se ejecutan exclusivamente en el servidor — su código nunca llega al bundle del cliente. Pueden acceder a bases de datos y archivos directamente. Los Client Components ('use client') se hidratan en el navegador y pueden usar estado, efectos y eventos.",
  },
  {
    id: "qa3",
    question: "¿Qué problema resuelve useOptimistic en React 19?",
    options: [
      "Permite cancelar actualizaciones de estado que aún no se confirmaron",
      "Muestra un estado provisional inmediatamente mientras una acción asíncrona está en curso, luego lo reemplaza con el resultado real",
      "Optimiza los re-renders de listas largas usando virtualización automática",
      "Precarga los datos de la siguiente ruta antes de que el usuario navegue",
    ],
    correctIndex: 1,
    explanation:
      "useOptimistic permite aplicar un cambio de UI de forma inmediata (optimista) sin esperar la respuesta del servidor. Si la operación falla, React revierte al estado real. Es ideal para likes, ediciones inline y cualquier acción que quieras que se sienta instantánea.",
  },
  {
    id: "qa4",
    question:
      "¿Por qué pasar un nuevo objeto como value a un Context en cada render es problemático?",
    options: [
      "Viola las reglas de los Hooks",
      "Hace que todos los consumidores del Context se re-rendericen aunque los datos no hayan cambiado",
      "Rompe la comparación de identidad de React.memo",
      "Solo es problemático si el objeto tiene más de 10 propiedades",
    ],
    correctIndex: 1,
    explanation:
      "React compara el value del Context por referencia. Si el padre hace <Ctx.Provider value={{ a, b }}>, crea un objeto nuevo en cada render — referencia distinta — y todos los consumidores se re-renderizan. La solución es memoizar el value con useMemo.",
  },
  {
    id: "qa5",
    question: "¿Qué es el React Compiler (antes React Forget)?",
    options: [
      "Un transpilador que convierte JSX a JavaScript puro sin necesidad de Babel",
      "Una herramienta que compila componentes de React a WebAssembly para mayor rendimiento",
      "Un compilador que inserta automáticamente useMemo y useCallback donde son necesarios, eliminando re-renders innecesarios",
      "Un plugin de TypeScript que valida el uso correcto de los hooks en tiempo de compilación",
    ],
    correctIndex: 2,
    explanation:
      "React Compiler analiza el código en tiempo de build y agrega memoización automática donde detecta que el valor no cambia. El objetivo es que los desarrolladores no tengan que pensar en useMemo/useCallback manualmente. Disponible en React 19 como opt-in.",
  },
  {
    id: "qa6",
    question: "¿Cuándo un Error Boundary NO captura un error?",
    options: [
      "Cuando el error ocurre en el render de un componente hijo",
      "Cuando el error ocurre dentro de un event handler, código asíncrono o el propio Error Boundary",
      "Cuando el componente usa hooks en lugar de ser una clase",
      "Cuando el error proviene de una librería externa",
    ],
    correctIndex: 1,
    explanation:
      "Los Error Boundaries solo capturan errores en el render, en métodos del ciclo de vida y en constructores de componentes hijos. No capturan errores en event handlers (usa try/catch ahí), código asíncrono (setTimeout, fetch) ni en el propio boundary.",
  },
  {
    id: "qa7",
    question: "¿Qué hace Suspense en combinación con lazy()?",
    options: [
      "Congela el render del árbol completo hasta que el componente lazy carga",
      "Muestra el fallback mientras el bundle del componente lazy se está descargando, luego lo reemplaza",
      "Precarga todos los componentes lazy al iniciar la aplicación",
      "Hace que los componentes lazy carguen en paralelo siempre",
    ],
    correctIndex: 1,
    explanation:
      "lazy() carga el componente de forma diferida (code splitting). Cuando React intenta renderizarlo y el bundle aún no llegó, 'suspende' ese subárbol y muestra el fallback del Suspense más cercano. Cuando carga, React renderiza el componente real.",
  },
  {
    id: "qa8",
    question:
      "¿Qué ocurre con el estado de un componente cuando React lo desmonta y lo vuelve a montar?",
    options: [
      "El estado se preserva porque React lo guarda en el Virtual DOM",
      "El estado se resetea completamente — React destruye y recrea la instancia",
      "El estado se preserva solo si usas useRef en lugar de useState",
      "React muestra un warning pero preserva el estado por defecto",
    ],
    correctIndex: 1,
    explanation:
      "React vincula el estado al árbol de componentes, no al componente como entidad. Cuando un componente se desmonta, su estado desaparece. Al montar de nuevo, empieza desde cero. Cambiar la key de un componente fuerza este ciclo intencionalmente.",
  },
  {
    id: "qa9",
    question: "¿Cuál es el propósito de useId en React 18+?",
    options: [
      "Generar IDs únicos estables entre el servidor y el cliente para evitar errores de hidratación",
      "Crear identificadores únicos para las keys de listas dinámicas",
      "Reemplazar a crypto.randomUUID() en entornos sin acceso a la API Web",
      "Asignar un ID único a cada instancia de un hook personalizado",
    ],
    correctIndex: 0,
    explanation:
      "useId genera un ID único y estable que coincide entre el render del servidor y la hidratación del cliente. Es ideal para atributos como htmlFor/id en formularios. No debe usarse como key de lista — para eso necesitas IDs de tus datos.",
  },
  {
    id: "qa10",
    question: "¿Qué son las Actions en React 19?",
    options: [
      "Un reemplazo de Redux para manejar estado global sin librerías externas",
      "Funciones que se pasan a elementos de formulario para manejar envíos de forma asíncrona, con estados de pending y error integrados",
      "Eventos personalizados que reemplazan a los event handlers de React",
      "Una API para despachar actualizaciones de estado desde fuera de los componentes",
    ],
    correctIndex: 1,
    explanation:
      "Las Actions son funciones (sync o async) que puedes pasar al atributo action de un <form>. React maneja automáticamente el estado de pending con useFormStatus y los errores. Eliminan el patrón manual de isLoading/error en formularios.",
  },
]

export const allQuizzes: Quiz[] = [
  {
    id: "fundamentos",
    label: "Fundamentos",
    description: "State, props, Virtual DOM y las bases de React",
    questions: fundamentosQuestions,
  },
  {
    id: "hooks",
    label: "Hooks",
    description: "useEffect, useMemo, useCallback y el modelo mental correcto",
    questions: hooksQuestions,
  },
  {
    id: "patrones",
    label: "Patrones",
    description: "HOC, Render Props, Controlled components y composición",
    questions: patronesQuestions,
  },
  {
    id: "avanzado",
    label: "Avanzado",
    description: "Concurrent React, Server Components, React 19 y rendimiento profundo",
    questions: avanzadoQuestions,
  },
]

export const quizIndex: Record<string, Quiz> = Object.fromEntries(allQuizzes.map((q) => [q.id, q]))
