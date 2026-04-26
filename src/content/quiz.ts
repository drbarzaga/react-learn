export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type QuizDifficulty = "basic" | "intermediate" | "advanced"

export interface Quiz {
  id: string
  label: string
  description: string
  difficulty: QuizDifficulty
  questions: QuizQuestion[]
}

const fundamentosQuestions: QuizQuestion[] = [
  {
    id: "fund-1",
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
    id: "fund-2",
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
    id: "fund-3",
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
    id: "fund-4",
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
    id: "fund-5",
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
  {
    id: "fund-6",
    question: "¿Qué es JSX y cómo lo transforma el compilador?",
    options: [
      "Un lenguaje de programación nuevo creado por Meta",
      "Una extensión de sintaxis de JavaScript que Babel transforma en llamadas React.createElement()",
      "Un motor de plantillas como Handlebars o Pug",
      "Un preprocesador de CSS para componentes React",
    ],
    correctIndex: 1,
    explanation:
      "JSX no es HTML ni JavaScript puro. Babel transforma <div className='x'>Hola</div> en React.createElement('div', { className: 'x' }, 'Hola'). Es azúcar sintáctico — React puede usarse sin JSX, pero el código sería mucho menos legible.",
  },
  {
    id: "fund-7",
    question: "¿Qué son los Fragments en React y cuándo usarlos?",
    options: [
      "Componentes que no tienen estado ni props",
      "Una forma de agrupar múltiples elementos sin añadir un nodo extra al DOM",
      "Partes de código que React reutiliza entre renders automáticamente",
      "Una API para dividir la UI en partes independientes con Suspense",
    ],
    correctIndex: 1,
    explanation:
      "<></> o <React.Fragment> permite retornar múltiples elementos sin agregar un div innecesario al DOM. Es importante cuando el nodo extra rompería la semántica HTML, como en tablas (<tr> solo puede tener <td> como hijos directos) o listas Flexbox.",
  },
  {
    id: "fund-8",
    question: "¿Qué diferencia hay entre un elemento de React y un componente de React?",
    options: [
      "Son lo mismo, React los trata de forma idéntica internamente",
      "Un elemento es un objeto plano que describe la UI; un componente es la función o clase que produce esos objetos",
      "Un componente es inmutable; un elemento puede cambiar con setState",
      "Los elementos son para JSX, los componentes para React.createElement",
    ],
    correctIndex: 1,
    explanation:
      "Un elemento ({ type: 'div', props: { children: 'Hola' } }) es la descripción mínima de un nodo — un objeto plano e inmutable. Un componente es la 'fábrica' que produce elementos. React llama al componente y obtiene el árbol de elementos a renderizar.",
  },
  {
    id: "fund-9",
    question: "¿Qué son los eventos sintéticos (SyntheticEvent) en React?",
    options: [
      "Eventos creados manualmente con new CustomEvent()",
      "Una capa de abstracción sobre los eventos nativos del navegador que normaliza su comportamiento entre navegadores",
      "Eventos que solo funcionan en componentes de servidor",
      "Una forma de simular eventos en tests sin necesidad de jsdom",
    ],
    correctIndex: 1,
    explanation:
      "React envuelve los eventos nativos en SyntheticEvent para dar una API consistente entre navegadores. En React 17+ los eventos se delegan al root element en lugar del document. El sistema normaliza diferencias entre Chrome, Firefox, Safari y otros.",
  },
  {
    id: "fund-10",
    question: "¿Qué hace React.StrictMode y en qué entorno tiene efecto?",
    options: [
      "Deshabilita las advertencias en producción para mejorar el rendimiento",
      "Solo tiene efecto en desarrollo: ejecuta renders y efectos dos veces para detectar efectos secundarios inesperados",
      "Hace que el código sea tipado estáticamente como TypeScript",
      "Deshabilita el modo concurrente y usa rendering síncrono",
    ],
    correctIndex: 1,
    explanation:
      "StrictMode no afecta producción. En desarrollo, ejecuta renders y efectos dos veces intencionalmente para detectar efectos secundarios que no deberían existir, APIs deprecadas y problemas que podrían aparecer con Concurrent React. Es la primera defensa contra bugs sutiles.",
  },
]

const hooksQuestions: QuizQuestion[] = [
  {
    id: "hook-1",
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
    id: "hook-2",
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
    id: "hook-3",
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
    id: "hook-4",
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
    id: "hook-5",
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
  {
    id: "hook-6",
    question: "¿Cómo se consume un Context con hooks?",
    options: [
      "const value = useContext(MyContext)",
      "const [value] = useState(MyContext)",
      "const value = MyContext.use()",
      "useContext solo funciona dentro de un Provider directo",
    ],
    correctIndex: 0,
    explanation:
      "useContext(MyContext) devuelve el value del Provider más cercano en el árbol. Cuando ese value cambia, el componente se re-renderiza automáticamente. Es una alternativa limpia al patrón Consumer render-prop de la API antigua.",
  },
  {
    id: "hook-7",
    question: "¿Cuándo tiene sentido extraer lógica a un hook personalizado?",
    options: [
      "Siempre que un componente supere las 100 líneas de código",
      "Cuando quieres reutilizar lógica con estado entre múltiples componentes sin duplicar código",
      "Solo cuando la lógica involucra llamadas a APIs externas",
      "Cuando necesitas acceder al DOM directamente desde varios componentes",
    ],
    correctIndex: 1,
    explanation:
      "Un hook personalizado es una función que empieza con 'use' y puede llamar otros hooks. Extraes lógica stateful (useWindowSize, useFetch, useLocalStorage) para reutilizarla sin cambiar la jerarquía de componentes — algo que HOC y render props no logran con la misma limpieza.",
  },
  {
    id: "hook-8",
    question: "¿Qué hace useDeferredValue?",
    options: [
      "Devuelve una versión diferida de un valor que se actualiza con menor prioridad para mantener la UI responsiva",
      "Cancela el setState si el componente se desmonta antes de recibir la respuesta",
      "Memoriza un valor calculado hasta que cambien sus dependencias",
      "Sincroniza un valor entre el servidor y el cliente durante la hidratación",
    ],
    correctIndex: 0,
    explanation:
      "useDeferredValue(value) devuelve una versión del valor que se actualiza con menor prioridad. Útil para inputs donde el campo debe responder inmediatamente pero la lista filtrada puede mostrar el valor anterior mientras recalcula — sin debounce manual.",
  },
  {
    id: "hook-9",
    question: "¿Qué resuelve useImperativeHandle?",
    options: [
      "Permite al padre invocar métodos específicos expuestos por un componente hijo a través de una ref",
      "Maneja errores de hooks de forma imperativa en lugar de declarativa",
      "Reemplaza a useEffect para manipulaciones directas del DOM",
      "Hace que un componente hijo controle el estado del padre",
    ],
    correctIndex: 0,
    explanation:
      "useImperativeHandle(ref, () => ({ focus, reset }), deps) define qué métodos expone el hijo a la ref del padre. Se usa junto con forwardRef. Permite APIs imperativas (.focus(), .scroll(), .reset()) sin exponer todo el nodo DOM ni el estado interno del hijo.",
  },
  {
    id: "hook-10",
    question: "¿Qué problema resuelve useTransition?",
    options: [
      "Gestiona animaciones CSS dentro de componentes React",
      "Marca actualizaciones de estado como no urgentes para que React priorice inputs y clicks sobre ellas",
      "Administra transiciones de rutas en React Router",
      "Retrasa efectos hasta después del primer render visible",
    ],
    correctIndex: 1,
    explanation:
      "const [isPending, startTransition] = useTransition(). Al envolver un setState en startTransition, React lo marca como no urgente. Si llega una actualización urgente (un keystroke), React la procesa primero. isPending indica que la transición está pendiente para mostrar feedback visual.",
  },
]

const patronesQuestions: QuizQuestion[] = [
  {
    id: "pat-1",
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
    id: "pat-2",
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
    id: "pat-3",
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
    id: "pat-4",
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
    id: "pat-5",
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
  {
    id: "pat-6",
    question: "¿Qué es el patrón Compound Components?",
    options: [
      "Combinar múltiples APIs externas en un único componente facade",
      "Un patrón donde componentes hijos colaboran con el padre compartiendo estado implícito vía Context",
      "Anidar más de tres niveles de componentes para dividir responsabilidades",
      "Crear componentes que mezclan lógica de negocio y UI en el mismo archivo",
    ],
    correctIndex: 1,
    explanation:
      "Compound Components (ej: <Select><Select.Option/></Select>) exponen un conjunto de sub-componentes que se comunican implícitamente con el padre a través de Context. El padre controla el estado compartido; los hijos lo consumen. Da flexibilidad al usuario de la API sin prop drilling.",
  },
  {
    id: "pat-7",
    question: "¿Qué significa 'levantar el estado' (Lifting State Up)?",
    options: [
      "Mover la declaración de useState al inicio del archivo para mayor claridad",
      "Mover el estado al ancestro común más cercano cuando dos componentes necesitan compartirlo",
      "Convertir estado local en global usando un store centralizado",
      "Usar useReducer en lugar de useState para mayor jerarquía de acciones",
    ],
    correctIndex: 1,
    explanation:
      "Si dos componentes hermanos necesitan el mismo dato, lo subes al padre común y lo pasas como props. Es la solución de React antes de Context. La decisión entre 'levantar' vs Context depende de cuántos niveles de la jerarquía necesitas atravesar.",
  },
  {
    id: "pat-8",
    question: "¿Qué son los Portals en React?",
    options: [
      "Una API para precargar rutas y componentes en Next.js",
      "Una forma de renderizar hijos en un nodo del DOM fuera de la jerarquía del componente padre",
      "Componentes que se renderizan en un iframe aislado del resto de la app",
      "Puntos de entrada alternativos para Server Components en arquitecturas multi-zona",
    ],
    correctIndex: 1,
    explanation:
      "ReactDOM.createPortal(child, container) renderiza en el nodo DOM indicado, pero el componente sigue siendo parte del árbol de React — Context, eventos y demás funcionan con normalidad. Ideal para modales, tooltips y overlays que deben vivir en document.body pero pertenecer lógicamente al componente.",
  },
  {
    id: "pat-9",
    question: "¿Cuál es la ventaja de la composición sobre la herencia en React?",
    options: [
      "La composición es más rápida que la herencia en el motor de JavaScript V8",
      "React no soporta herencia de clases en componentes funcionales",
      "La composición con children y props es más flexible y evita el acoplamiento rígido de las jerarquías de clases",
      "La herencia genera re-renders adicionales que la composición evita",
    ],
    correctIndex: 2,
    explanation:
      "El equipo de React recomienda composición sobre herencia. En lugar de MyComponent extends BaseComponent, usas <Container><Child/></Container> o props render. Obtienes reúso sin acoplamiento fuerte, colisiones de métodos ni la rigidez de las jerarquías de clases.",
  },
  {
    id: "pat-10",
    question: "¿Qué es un componente no controlado (uncontrolled) y cuándo usarlo?",
    options: [
      "Un componente que no recibe ninguna prop del padre",
      "Un componente donde el DOM gestiona su propio estado, accedido mediante refs cuando se necesita",
      "Un componente que no tiene validación de tipos en sus props",
      "Un componente que puede recibir eventos del sistema operativo directamente",
    ],
    correctIndex: 1,
    explanation:
      "En un componente no controlado el estado del input vive en el DOM. Usas ref para leer el valor solo cuando lo necesitas (ej: al hacer submit). Es más simple para integraciones con código no-React y casos donde no necesitas validación en tiempo real.",
  },
]

const avanzadoQuestions: QuizQuestion[] = [
  {
    id: "adv-1",
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
    id: "adv-2",
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
    id: "adv-3",
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
    id: "adv-4",
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
    id: "adv-5",
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
    id: "adv-6",
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
    id: "adv-7",
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
    id: "adv-8",
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
    id: "adv-9",
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
    id: "adv-10",
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

const rendimientoQuestions: QuizQuestion[] = [
  {
    id: "perf-1",
    question: "¿Cuándo React evita re-renderizar un componente automáticamente?",
    options: [
      "Nunca: React siempre re-renderiza todos los hijos cuando el padre cambia",
      "Cuando el componente está envuelto en React.memo y sus props no cambiaron por referencia",
      "Cuando el componente no tiene ningún estado propio",
      "Cuando el componente está fuera del viewport actual",
    ],
    correctIndex: 1,
    explanation:
      "Por defecto, cuando un padre se re-renderiza, todos sus hijos lo hacen también. React.memo añade una comparación shallow de props: si las referencias son iguales, React reutiliza el resultado anterior y salta el render del hijo.",
  },
  {
    id: "perf-2",
    question: "¿Qué es el code splitting y cómo se implementa en React?",
    options: [
      "Dividir el CSS en múltiples archivos para descarga paralela",
      "Dividir el bundle de JavaScript en chunks que se cargan bajo demanda con React.lazy() + Suspense",
      "Separar la lógica de negocio de la UI en archivos distintos",
      "Una técnica de compilación para dividir un componente grande en varios más pequeños",
    ],
    correctIndex: 1,
    explanation:
      "React.lazy(() => import('./Component')) crea un componente que carga su bundle solo cuando se necesita. Envuelto en <Suspense fallback={...}>, React muestra el fallback mientras descarga el chunk. Reduce el bundle inicial y mejora el Time to Interactive.",
  },
  {
    id: "perf-3",
    question: "¿Para qué sirve el React Profiler?",
    options: [
      "Analiza el código en busca de vulnerabilidades de seguridad en tiempo de compilación",
      "Mide la frecuencia y el costo de renders de componentes para identificar cuellos de botella",
      "Monitorea el uso de memoria heap en producción",
      "Genera reportes de cobertura de tests de los componentes",
    ],
    correctIndex: 1,
    explanation:
      "El Profiler (DevTools y la API <Profiler onRender={...}>) mide cuánto tardó cada componente, cuántas veces se renderizó y por qué cambió. Es el primer paso de cualquier optimización — nunca optimices sin medir primero.",
  },
  {
    id: "perf-4",
    question: "¿Cuándo NO deberías usar useMemo?",
    options: [
      "Cuando el cálculo tarda más de 1ms en ejecutarse",
      "Para todos los objetos y arrays que se crean en el render",
      "Cuando el cálculo es trivial o las dependencias cambian en prácticamente todos los renders",
      "useMemo siempre mejora el rendimiento, no hay casos donde no usarlo",
    ],
    correctIndex: 2,
    explanation:
      "useMemo tiene un costo: React ejecuta comparaciones de dependencias en cada render y guarda el valor en memoria. Si el cálculo es barato (sumar dos números) o las dependencias cambian constantemente, useMemo añade overhead sin beneficio real.",
  },
  {
    id: "perf-5",
    question: "¿Cómo funciona el automatic batching de React 18?",
    options: [
      "React 18 ejecuta los renders en un Web Worker para no bloquear el hilo principal",
      "React agrupa múltiples setState en un solo re-render, incluso dentro de fetch, setTimeout y eventos nativos",
      "React aplaza todos los setState hasta el próximo frame de animación con requestAnimationFrame",
      "React cancela renders intermedios si llega un setState más reciente antes de que el render termine",
    ],
    correctIndex: 1,
    explanation:
      "Antes de React 18, el batching solo ocurría en event handlers de React. React 18 introduce automatic batching: múltiples setState dentro de promises, setTimeout o cualquier código asíncrono se agrupan en un solo re-render. Menos renders = mejor rendimiento.",
  },
  {
    id: "perf-6",
    question: "¿Qué es la virtualización (windowing) y cuándo es necesaria?",
    options: [
      "Usar iframes para aislar secciones de la UI y mejorar el rendimiento de renderizado",
      "Renderizar solo los elementos visibles de una lista larga, no todos al mismo tiempo",
      "Una técnica de CSS para acelerar animaciones delegándolas a la GPU",
      "Ejecutar componentes React en un contexto virtual aislado del DOM real",
    ],
    correctIndex: 1,
    explanation:
      "Con miles de items, renderizar todos crea miles de nodos DOM — lento e ineficiente. Windowing (react-window, TanStack Virtual) renderiza solo las filas visibles más un buffer. El DOM tiene pocas decenas de nodos y el scroll es fluido sin importar cuántos datos haya.",
  },
  {
    id: "perf-7",
    question: "¿Qué impacto tiene crear funciones inline en JSX de un componente memoizado?",
    options: [
      "Ninguno, React detecta funciones funcionalmente equivalentes y las trata como iguales",
      "Rompe la memoización porque cada render del padre crea una nueva referencia de función",
      "Solo es problemático en componentes de clase, no en funcionales",
      "Las funciones inline son más rápidas que las definidas fuera del render",
    ],
    correctIndex: 1,
    explanation:
      "<Button onClick={() => doSomething()} /> crea una función nueva en cada render del padre. Si Button usa React.memo, la prop onClick siempre tiene referencia diferente → React.memo no puede evitar el re-render. Solución: useCallback para estabilizar la referencia.",
  },
  {
    id: "perf-8",
    question: "¿Qué efecto tiene cambiar la prop key de un componente intencionalmente?",
    options: [
      "Solo actualiza el atributo HTML key del nodo DOM subyacente",
      "Fuerza a React a desmontar el componente y montar uno nuevo, reseteando completamente su estado",
      "Mejora el rendimiento del reconciliador al dar una pista de identidad estable",
      "Hace que el componente ignore las props del render anterior",
    ],
    correctIndex: 1,
    explanation:
      "Cambiar la key (ej: <Form key={userId} />) le dice a React que es un componente diferente al anterior. Desmonta el viejo (ejecutando cleanup de efectos) y monta uno nuevo con estado desde cero. Es la forma idiomática de resetear un componente sin lógica manual.",
  },
]

export const allQuizzes: Quiz[] = [
  {
    id: "fundamentos",
    label: "Fundamentos",
    description: "State, props, Virtual DOM y las bases de React",
    difficulty: "basic",
    questions: fundamentosQuestions,
  },
  {
    id: "hooks",
    label: "Hooks",
    description: "useEffect, useMemo, useCallback y el modelo mental correcto",
    difficulty: "intermediate",
    questions: hooksQuestions,
  },
  {
    id: "patrones",
    label: "Patrones",
    description: "HOC, Render Props, Controlled components y composición",
    difficulty: "intermediate",
    questions: patronesQuestions,
  },
  {
    id: "rendimiento",
    label: "Rendimiento",
    description: "Memoización, code splitting, batching y optimización de renders",
    difficulty: "intermediate",
    questions: rendimientoQuestions,
  },
  {
    id: "avanzado",
    label: "Avanzado",
    description: "Concurrent React, Server Components, React 19 y arquitectura profunda",
    difficulty: "advanced",
    questions: avanzadoQuestions,
  },
]

export const quizIndex: Record<string, Quiz> = Object.fromEntries(allQuizzes.map((q) => [q.id, q]))
