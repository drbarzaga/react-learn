import type { Quiz, QuizQuestion } from "@/content/quiz"

const fundamentalsQuestions: QuizQuestion[] = [
  {
    id: "fund-1",
    question: "What is the Virtual DOM?",
    options: [
      "A copy of the real DOM stored on the server",
      "An in-memory representation of the UI tree that React uses to compute minimal changes",
      "An alternative DOM created by the browser for better performance",
      "A separate library that replaces the DOM",
    ],
    correctIndex: 1,
    explanation:
      "The Virtual DOM is a tree of JavaScript objects that React keeps in memory. Before touching the real DOM, it compares the new tree against the previous one (diffing) and only applies the necessary changes — a process called reconciliation.",
  },
  {
    id: "fund-2",
    question: "What is the fundamental difference between state and props?",
    options: [
      "There is no difference, they are synonyms",
      "Props are immutable from within the component; state is mutable and local",
      "State is passed from parent to child; props are internal to the component",
      "Props only work in class components",
    ],
    correctIndex: 1,
    explanation:
      "Props come from the parent and the component cannot change them — they are read-only. State is private to the component and can change with setState/useState, which triggers a re-render.",
  },
  {
    id: "fund-3",
    question: "What happens when you call useState with an expensive initial value to compute?",
    options: [
      "Nothing special, React optimizes it automatically",
      "You must use useMemo to wrap it",
      "You can pass an initializer function so it only runs once",
      "You must compute it outside the component",
    ],
    correctIndex: 2,
    explanation:
      "useState accepts an initializer function: useState(() => computeExpensive()). React calls it only on the first render. If you pass the value directly (useState(compute())), it recalculates on every render even though it's discarded.",
  },
  {
    id: "fund-4",
    question: "What is the most important rule of Hooks?",
    options: [
      "They can only be used in class components",
      "They can only be called at the top level of the component, never inside conditionals or loops",
      "They must start with 'use' in lowercase",
      "You cannot combine more than 5 hooks in one component",
    ],
    correctIndex: 1,
    explanation:
      "React identifies each Hook's state by its call order. If you call them inside conditionals or loops, that order can change between renders and React will lose track of which state belongs to which Hook.",
  },
  {
    id: "fund-5",
    question: "What does useRef return?",
    options: [
      "The current DOM value directly",
      "A { current } object that persists between renders without causing re-renders when current is mutated",
      "A function to update the value and trigger a re-render",
      "An observable that emits when the value changes",
    ],
    correctIndex: 1,
    explanation:
      "useRef returns { current: initialValue }. Mutating .current does not trigger a re-render. It is useful for DOM references, timers, or storing previous values without needing the component to update.",
  },
  {
    id: "fund-6",
    question: "What is JSX and how does the compiler transform it?",
    options: [
      "A new programming language created by Meta",
      "A JavaScript syntax extension that Babel transforms into React.createElement() calls",
      "A templating engine like Handlebars or Pug",
      "A CSS preprocessor for React components",
    ],
    correctIndex: 1,
    explanation:
      "JSX is neither HTML nor pure JavaScript. Babel transforms <div className='x'>Hello</div> into React.createElement('div', { className: 'x' }, 'Hello'). It's syntactic sugar — React can be used without JSX, but the code would be much less readable.",
  },
  {
    id: "fund-7",
    question: "What are Fragments in React and when should you use them?",
    options: [
      "Components that have no state or props",
      "A way to group multiple elements without adding an extra node to the DOM",
      "Parts of code that React automatically reuses between renders",
      "An API to split the UI into independent parts with Suspense",
    ],
    correctIndex: 1,
    explanation:
      "<></> or <React.Fragment> allows returning multiple elements without adding an unnecessary div to the DOM. It matters when the extra node would break HTML semantics, such as in tables (<tr> can only have <td> as direct children) or Flexbox lists.",
  },
  {
    id: "fund-8",
    question: "What is the difference between a React element and a React component?",
    options: [
      "They are the same thing; React treats them identically internally",
      "An element is a plain object describing the UI; a component is the function or class that produces those objects",
      "A component is immutable; an element can change with setState",
      "Elements are for JSX, components for React.createElement",
    ],
    correctIndex: 1,
    explanation:
      "An element ({ type: 'div', props: { children: 'Hello' } }) is the minimal description of a node — a plain, immutable object. A component is the 'factory' that produces elements. React calls the component and gets the element tree to render.",
  },
  {
    id: "fund-9",
    question: "What are synthetic events (SyntheticEvent) in React?",
    options: [
      "Events created manually with new CustomEvent()",
      "An abstraction layer over native browser events that normalizes their behavior across browsers",
      "Events that only work in server components",
      "A way to simulate events in tests without needing jsdom",
    ],
    correctIndex: 1,
    explanation:
      "React wraps native events in SyntheticEvent to provide a consistent API across browsers. In React 17+ events are delegated to the root element instead of the document. The system normalizes differences between Chrome, Firefox, Safari, and others.",
  },
  {
    id: "fund-10",
    question: "What does React.StrictMode do and in which environment does it take effect?",
    options: [
      "It disables warnings in production to improve performance",
      "It only takes effect in development: it runs renders and effects twice to detect unexpected side effects",
      "It makes code statically typed like TypeScript",
      "It disables Concurrent Mode and uses synchronous rendering",
    ],
    correctIndex: 1,
    explanation:
      "StrictMode does not affect production. In development, it intentionally runs renders and effects twice to detect side effects that shouldn't exist, deprecated APIs, and issues that might appear with Concurrent React. It's the first line of defense against subtle bugs.",
  },
]

const hooksQuestions: QuizQuestion[] = [
  {
    id: "hook-1",
    question: "useEffect with an empty dependency array [] runs...",
    options: [
      "On every render",
      "Only when a prop changes",
      "Once after the first render (mount)",
      "It never runs automatically",
    ],
    correctIndex: 2,
    explanation:
      "[] tells React: 'there are no external dependencies'. The effect runs once on mount and the cleanup runs on unmount — equivalent to componentDidMount + componentWillUnmount.",
  },
  {
    id: "hook-2",
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "There is no difference, they are aliases",
      "useMemo memoizes the result of a function; useCallback memoizes the function itself",
      "useCallback is faster than useMemo",
      "useMemo only works with objects, useCallback with primitives",
    ],
    correctIndex: 1,
    explanation:
      "useMemo(() => compute(a, b), [a, b]) returns the computed value. useCallback(() => fn(a), [a]) returns the function. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).",
  },
  {
    id: "hook-3",
    question: "When does it make sense to use useReducer instead of useState?",
    options: [
      "Whenever the state is a number",
      "When the state has multiple related sub-values or the update logic is complex",
      "Only when you need Redux",
      "When the component has more than 3 state variables",
    ],
    correctIndex: 1,
    explanation:
      "useReducer shines when state updates depend on the previous state in a complex way, or when several fields change together. It centralizes logic in a pure reducer and makes the flow more predictable.",
  },
  {
    id: "hook-4",
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useLayoutEffect does not accept a cleanup function",
      "useLayoutEffect runs synchronously after the DOM update but before the browser paints",
      "useEffect is for synchronous effects and useLayoutEffect for asynchronous",
      "There is no difference in modern React",
    ],
    correctIndex: 1,
    explanation:
      "useLayoutEffect runs after React updates the DOM but before the browser paints — ideal for reading layout or avoiding visual flickers. useEffect runs after the paint, is asynchronous and less blocking.",
  },
  {
    id: "hook-5",
    question: "What does React.memo do?",
    options: [
      "Memoizes the result of a hook",
      "Prevents a component from re-rendering if its props have not changed (shallow comparison)",
      "Caches the component in the browser cache",
      "Freezes the component's props so they cannot change",
    ],
    correctIndex: 1,
    explanation:
      "React.memo wraps a component and performs a shallow comparison of previous vs. new props. If they are equal, React reuses the previous result. It does not help if props are objects/functions created on every render.",
  },
  {
    id: "hook-6",
    question: "How do you consume a Context with hooks?",
    options: [
      "const value = useContext(MyContext)",
      "const [value] = useState(MyContext)",
      "const value = MyContext.use()",
      "useContext only works inside a direct Provider",
    ],
    correctIndex: 0,
    explanation:
      "useContext(MyContext) returns the value of the nearest Provider in the tree. When that value changes, the component re-renders automatically. It is a clean alternative to the old Consumer render-prop pattern.",
  },
  {
    id: "hook-7",
    question: "When does it make sense to extract logic into a custom hook?",
    options: [
      "Whenever a component exceeds 100 lines of code",
      "When you want to reuse stateful logic between multiple components without duplicating code",
      "Only when the logic involves calls to external APIs",
      "When you need to access the DOM directly from several components",
    ],
    correctIndex: 1,
    explanation:
      "A custom hook is a function that starts with 'use' and can call other hooks. You extract stateful logic (useWindowSize, useFetch, useLocalStorage) to reuse it without changing the component hierarchy — something HOCs and render props cannot achieve as cleanly.",
  },
  {
    id: "hook-8",
    question: "What does useDeferredValue do?",
    options: [
      "Returns a deferred version of a value that updates with lower priority to keep the UI responsive",
      "Cancels setState if the component unmounts before receiving the response",
      "Memoizes a computed value until its dependencies change",
      "Synchronizes a value between server and client during hydration",
    ],
    correctIndex: 0,
    explanation:
      "useDeferredValue(value) returns a version of the value that updates with lower priority. Useful for inputs where the field must respond immediately but the filtered list can show the old value while recalculating — without a manual debounce.",
  },
  {
    id: "hook-9",
    question: "What does useImperativeHandle solve?",
    options: [
      "Allows the parent to invoke specific methods exposed by a child component through a ref",
      "Handles hook errors imperatively instead of declaratively",
      "Replaces useEffect for direct DOM manipulations",
      "Makes a child component control the parent's state",
    ],
    correctIndex: 0,
    explanation:
      "useImperativeHandle(ref, () => ({ focus, reset }), deps) defines what methods the child exposes to the parent's ref. Used together with forwardRef. It enables imperative APIs (.focus(), .scroll(), .reset()) without exposing the entire DOM node or the child's internal state.",
  },
  {
    id: "hook-10",
    question: "What problem does useTransition solve?",
    options: [
      "It manages CSS animations inside React components",
      "It marks state updates as non-urgent so React prioritizes inputs and clicks over them",
      "It manages route transitions in React Router",
      "It defers effects until after the first visible render",
    ],
    correctIndex: 1,
    explanation:
      "const [isPending, startTransition] = useTransition(). By wrapping a setState in startTransition, React marks it as non-urgent. If an urgent update arrives (a keystroke), React processes it first. isPending indicates the transition is pending for visual feedback.",
  },
]

const patternsQuestions: QuizQuestion[] = [
  {
    id: "pat-1",
    question: "What main problem does the Render Props pattern solve?",
    options: [
      "It improves performance by preventing re-renders",
      "It shares stateful logic between components without inheritance",
      "It completely replaces hooks",
      "It allows direct DOM access",
    ],
    correctIndex: 1,
    explanation:
      "Render Props lets a component delegate what to render by passing a function as a prop. This shares stateful logic (e.g., mouse position) between different components. Today, hooks are usually the cleaner alternative.",
  },
  {
    id: "pat-2",
    question: "What is a Higher-Order Component (HOC)?",
    options: [
      "A component with more than 100 lines",
      "A function that receives a component and returns a new one with extended functionality",
      "A parent component that controls all state",
      "A component that uses all available hooks",
    ],
    correctIndex: 1,
    explanation:
      "A HOC is a pure function: it takes a component, wraps it with additional logic, and returns the enhanced component. Example: withAuth(Component). They are a composition pattern, not part of the React API.",
  },
  {
    id: "pat-3",
    question: "What is prop drilling?",
    options: [
      "Passing props using the spread operator in each component",
      "Passing props through intermediate components that don't need them just so they reach a deep component",
      "Using too many props in the same component",
      "Passing functions as props between sibling components",
    ],
    correctIndex: 1,
    explanation:
      "Prop drilling is when you pass data through intermediate components only so it can reach a deep component. The problem: intermediate components have unnecessary coupling. Solutions: Context, composition (children), or state managers.",
  },
  {
    id: "pat-4",
    question: "Why is the key prop important in lists?",
    options: [
      "It is only required by TypeScript for type safety",
      "It improves SEO of the list",
      "It allows React to identify which element changed, was added, or was removed during reconciliation",
      "It is just a convention; React works the same without it",
    ],
    correctIndex: 2,
    explanation:
      "Without a stable key, React uses the element's position to reconcile — and can reuse the wrong node when reordering. With a unique and stable key, React can move, add, and remove elements efficiently.",
  },
  {
    id: "pat-5",
    question: "What is a controlled component in forms?",
    options: [
      "A component that does not allow the user to edit it",
      "A component whose value is controlled by React through state, not by the DOM",
      "A component that validates its own input automatically",
      "A component that is always controlled from a parent component",
    ],
    correctIndex: 1,
    explanation:
      "In a controlled component, React state is the 'source of truth'. The input receives value={state} and onChange updates the state. The DOM reflects React, not the other way around. The opposite is uncontrolled, where the DOM manages its own state.",
  },
  {
    id: "pat-6",
    question: "What is the Compound Components pattern?",
    options: [
      "Combining multiple external APIs into a single facade component",
      "A pattern where child components collaborate with the parent by sharing implicit state via Context",
      "Nesting more than three levels of components to divide responsibilities",
      "Creating components that mix business logic and UI in the same file",
    ],
    correctIndex: 1,
    explanation:
      "Compound Components (e.g., <Select><Select.Option/></Select>) expose a set of sub-components that communicate implicitly with the parent via Context. The parent controls the shared state; the children consume it. This gives API flexibility without prop drilling.",
  },
  {
    id: "pat-7",
    question: "What does 'lifting state up' mean?",
    options: [
      "Moving useState declaration to the top of the file for clarity",
      "Moving state to the nearest common ancestor when two components need to share it",
      "Converting local state to global state using a centralized store",
      "Using useReducer instead of useState for a higher hierarchy of actions",
    ],
    correctIndex: 1,
    explanation:
      "If two sibling components need the same data, you move it to the common parent and pass it down as props. This is React's solution before Context. The choice between 'lifting' vs Context depends on how many levels of the hierarchy you need to cross.",
  },
  {
    id: "pat-8",
    question: "What are Portals in React?",
    options: [
      "An API for prefetching routes and components in Next.js",
      "A way to render children into a DOM node outside the parent component's hierarchy",
      "Components that render in an isolated iframe from the rest of the app",
      "Alternative entry points for Server Components in multi-zone architectures",
    ],
    correctIndex: 1,
    explanation:
      "ReactDOM.createPortal(child, container) renders into the indicated DOM node, but the component remains part of the React tree — Context, events, and everything else work normally. Ideal for modals, tooltips, and overlays that must live in document.body but logically belong to the component.",
  },
  {
    id: "pat-9",
    question: "What is the advantage of composition over inheritance in React?",
    options: [
      "Composition is faster than inheritance in the V8 JavaScript engine",
      "React does not support class inheritance in functional components",
      "Composition with children and props is more flexible and avoids the rigid coupling of class hierarchies",
      "Inheritance generates additional re-renders that composition avoids",
    ],
    correctIndex: 2,
    explanation:
      "The React team recommends composition over inheritance. Instead of MyComponent extends BaseComponent, you use <Container><Child/></Container> or render props. You get reuse without tight coupling, method collisions, or the rigidity of class hierarchies.",
  },
  {
    id: "pat-10",
    question: "What is an uncontrolled component and when should you use one?",
    options: [
      "A component that receives no props from the parent",
      "A component where the DOM manages its own state, accessed via refs when needed",
      "A component with no type validation on its props",
      "A component that can receive events from the operating system directly",
    ],
    correctIndex: 1,
    explanation:
      "In an uncontrolled component the input state lives in the DOM. You use a ref to read the value only when needed (e.g., on submit). It's simpler for integrations with non-React code and cases where you don't need real-time validation.",
  },
]

const advancedQuestions: QuizQuestion[] = [
  {
    id: "adv-1",
    question: "What does React guarantee when using startTransition?",
    options: [
      "That the update runs in a Web Worker so it doesn't block the main thread",
      "That the update is urgent and processed before any other",
      "That the update can be interrupted if a more urgent update arrives",
      "That the component doesn't re-render until the transition completes",
    ],
    correctIndex: 2,
    explanation:
      "startTransition marks an update as non-urgent. React can interrupt it if something urgent appears (like a keystroke). This prevents heavy updates from blocking the UI — the main thread is still just one.",
  },
  {
    id: "adv-2",
    question: "What is the difference between a React Server Component and a Client Component?",
    options: [
      "Server Components run on the server and never send JavaScript to the client; Client Components do",
      "Server Components are faster because they use WebSockets instead of HTTP",
      "Client Components only work in the browser; Server Components work on both sides",
      "There is no real difference, it is just a naming convention",
    ],
    correctIndex: 0,
    explanation:
      "RSCs run exclusively on the server — their code never reaches the client bundle. They can access databases and files directly. Client Components ('use client') are hydrated in the browser and can use state, effects, and events.",
  },
  {
    id: "adv-3",
    question: "What problem does useOptimistic solve in React 19?",
    options: [
      "It allows canceling state updates that haven't been confirmed yet",
      "It shows a provisional state immediately while an async action is in progress, then replaces it with the real result",
      "It optimizes re-renders of long lists using automatic virtualization",
      "It prefetches data for the next route before the user navigates",
    ],
    correctIndex: 1,
    explanation:
      "useOptimistic allows applying a UI change immediately (optimistically) without waiting for the server response. If the operation fails, React reverts to the real state. It's ideal for likes, inline edits, and any action you want to feel instantaneous.",
  },
  {
    id: "adv-4",
    question: "Why is passing a new object as a Context value on every render problematic?",
    options: [
      "It violates the Rules of Hooks",
      "It makes all Context consumers re-render even though the data has not changed",
      "It breaks React.memo's identity comparison",
      "It's only a problem if the object has more than 10 properties",
    ],
    correctIndex: 1,
    explanation:
      "React compares the Context value by reference. If the parent does <Ctx.Provider value={{ a, b }}>, it creates a new object on every render — a different reference — and all consumers re-render. The solution is to memoize the value with useMemo.",
  },
  {
    id: "adv-5",
    question: "What is the React Compiler (formerly React Forget)?",
    options: [
      "A transpiler that converts JSX to plain JavaScript without needing Babel",
      "A tool that compiles React components to WebAssembly for better performance",
      "A compiler that automatically inserts useMemo and useCallback where needed, eliminating unnecessary re-renders",
      "A TypeScript plugin that validates correct hook usage at compile time",
    ],
    correctIndex: 2,
    explanation:
      "React Compiler analyzes code at build time and adds automatic memoization where it detects a value doesn't change. The goal is that developers don't have to think about useMemo/useCallback manually. Available in React 19 as opt-in.",
  },
  {
    id: "adv-6",
    question: "When does an Error Boundary NOT catch an error?",
    options: [
      "When the error occurs in the render of a child component",
      "When the error occurs inside an event handler, async code, or the Error Boundary itself",
      "When the component uses hooks instead of being a class",
      "When the error comes from an external library",
    ],
    correctIndex: 1,
    explanation:
      "Error Boundaries only catch errors in the render, lifecycle methods, and constructors of child components. They do not catch errors in event handlers (use try/catch there), async code (setTimeout, fetch), or in the boundary itself.",
  },
  {
    id: "adv-7",
    question: "What does Suspense do in combination with lazy()?",
    options: [
      "It freezes the entire tree render until the lazy component loads",
      "It shows the fallback while the lazy component's bundle is downloading, then replaces it",
      "It preloads all lazy components when the app starts",
      "It always loads lazy components in parallel",
    ],
    correctIndex: 1,
    explanation:
      "lazy() loads the component lazily (code splitting). When React tries to render it and the bundle hasn't arrived yet, it 'suspends' that subtree and shows the nearest Suspense fallback. When it loads, React renders the real component.",
  },
  {
    id: "adv-8",
    question: "What happens to a component's state when React unmounts and remounts it?",
    options: [
      "The state is preserved because React saves it in the Virtual DOM",
      "The state is completely reset — React destroys and recreates the instance",
      "The state is preserved only if you use useRef instead of useState",
      "React shows a warning but preserves the state by default",
    ],
    correctIndex: 1,
    explanation:
      "React ties state to the component tree, not to the component as an entity. When a component unmounts, its state disappears. When mounted again, it starts from scratch. Changing a component's key forces this cycle intentionally.",
  },
  {
    id: "adv-9",
    question: "What is the purpose of useId in React 18+?",
    options: [
      "Generate stable unique IDs between server and client to avoid hydration errors",
      "Create unique identifiers for dynamic list keys",
      "Replace crypto.randomUUID() in environments without Web API access",
      "Assign a unique ID to each custom hook instance",
    ],
    correctIndex: 0,
    explanation:
      "useId generates a stable unique ID that matches between server render and client hydration. It's ideal for attributes like htmlFor/id in forms. It should not be used as a list key — for that you need IDs from your data.",
  },
  {
    id: "adv-10",
    question: "What are Actions in React 19?",
    options: [
      "A Redux replacement for managing global state without external libraries",
      "Functions passed to form elements to handle submissions asynchronously, with built-in pending and error states",
      "Custom events that replace React event handlers",
      "An API for dispatching state updates from outside components",
    ],
    correctIndex: 1,
    explanation:
      "Actions are functions (sync or async) that you can pass to the action attribute of a <form>. React automatically manages the pending state with useFormStatus and errors. They eliminate the manual isLoading/error pattern in forms.",
  },
]

const performanceQuestions: QuizQuestion[] = [
  {
    id: "perf-1",
    question: "When does React automatically avoid re-rendering a component?",
    options: [
      "Never: React always re-renders all children when the parent changes",
      "When the component is wrapped in React.memo and its props have not changed by reference",
      "When the component has no state of its own",
      "When the component is outside the current viewport",
    ],
    correctIndex: 1,
    explanation:
      "By default, when a parent re-renders, all its children do too. React.memo adds a shallow props comparison: if the references are equal, React reuses the previous result and skips the child render.",
  },
  {
    id: "perf-2",
    question: "What is code splitting and how is it implemented in React?",
    options: [
      "Splitting CSS into multiple files for parallel download",
      "Splitting the JavaScript bundle into chunks loaded on demand with React.lazy() + Suspense",
      "Separating business logic from UI into different files",
      "A compilation technique to split a large component into several smaller ones",
    ],
    correctIndex: 1,
    explanation:
      "React.lazy(() => import('./Component')) creates a component that loads its bundle only when needed. Wrapped in <Suspense fallback={...}>, React shows the fallback while downloading the chunk. It reduces the initial bundle and improves Time to Interactive.",
  },
  {
    id: "perf-3",
    question: "What is the React Profiler for?",
    options: [
      "It analyzes code for security vulnerabilities at compile time",
      "It measures the frequency and cost of component renders to identify bottlenecks",
      "It monitors heap memory usage in production",
      "It generates test coverage reports for components",
    ],
    correctIndex: 1,
    explanation:
      "The Profiler (DevTools and the <Profiler onRender={...}> API) measures how long each component took, how many times it rendered, and why it changed. It's the first step of any optimization — never optimize without measuring first.",
  },
  {
    id: "perf-4",
    question: "When should you NOT use useMemo?",
    options: [
      "When the computation takes more than 1ms to execute",
      "For all objects and arrays created in the render",
      "When the computation is trivial or the dependencies change on practically every render",
      "useMemo always improves performance; there are no cases not to use it",
    ],
    correctIndex: 2,
    explanation:
      "useMemo has a cost: React runs dependency comparisons on every render and stores the value in memory. If the computation is cheap (adding two numbers) or the dependencies change constantly, useMemo adds overhead with no real benefit.",
  },
  {
    id: "perf-5",
    question: "How does automatic batching work in React 18?",
    options: [
      "React 18 runs renders in a Web Worker so they don't block the main thread",
      "React groups multiple setState calls into a single re-render, even inside fetch, setTimeout, and native events",
      "React defers all setState calls until the next animation frame with requestAnimationFrame",
      "React cancels intermediate renders if a more recent setState arrives before the render completes",
    ],
    correctIndex: 1,
    explanation:
      "Before React 18, batching only happened in React event handlers. React 18 introduces automatic batching: multiple setState calls inside promises, setTimeout, or any async code are grouped into a single re-render. Fewer renders = better performance.",
  },
  {
    id: "perf-6",
    question: "What is virtualization (windowing) and when is it necessary?",
    options: [
      "Using iframes to isolate UI sections and improve rendering performance",
      "Rendering only the visible elements of a long list, not all at once",
      "A CSS technique to speed up animations by delegating them to the GPU",
      "Running React components in a virtual context isolated from the real DOM",
    ],
    correctIndex: 1,
    explanation:
      "With thousands of items, rendering all of them creates thousands of DOM nodes — slow and inefficient. Windowing (react-window, TanStack Virtual) renders only the visible rows plus a buffer. The DOM has only a few dozen nodes and scrolling is smooth regardless of how much data there is.",
  },
  {
    id: "perf-7",
    question: "What impact does creating inline functions in JSX have on a memoized component?",
    options: [
      "None; React detects functionally equivalent functions and treats them as equal",
      "It breaks memoization because each parent render creates a new function reference",
      "It's only a problem in class components, not functional ones",
      "Inline functions are faster than ones defined outside the render",
    ],
    correctIndex: 1,
    explanation:
      "<Button onClick={() => doSomething()} /> creates a new function on every parent render. If Button uses React.memo, the onClick prop always has a different reference → React.memo cannot prevent the re-render. Solution: useCallback to stabilize the reference.",
  },
  {
    id: "perf-8",
    question: "What effect does intentionally changing the key prop of a component have?",
    options: [
      "It only updates the HTML key attribute of the underlying DOM node",
      "It forces React to unmount the component and mount a new one, completely resetting its state",
      "It improves reconciler performance by giving a stable identity hint",
      "It makes the component ignore props from the previous render",
    ],
    correctIndex: 1,
    explanation:
      "Changing the key (e.g., <Form key={userId} />) tells React it's a different component from the previous one. It unmounts the old one (running effect cleanups) and mounts a new one with state from scratch. It's the idiomatic way to reset a component without manual logic.",
  },
]

const listsAndKeysQuestions: QuizQuestion[] = [
  {
    id: "lyk-1",
    question: "Why is it dangerous to use the array index as a key when the list can be reordered?",
    options: [
      "Because React forbids using the index as a key",
      "Because the index changes when reordering, making React reuse the wrong element's DOM",
      "Because indexes are not unique among siblings",
      "Because the index is a number and the key must be a string",
    ],
    correctIndex: 1,
    explanation:
      "The key tells React which DOM element corresponds to which data. If you use the index and reorder the list, element 0 now represents different data but React reuses the previous DOM node — causing bugs in inputs, animations, and component state.",
  },
  {
    id: "lyk-2",
    question: "What is the correct way to render a list of names in JSX?",
    options: [
      "names.forEach(n => <li>{n}</li>)",
      "names.map(n => <li key={n}>{n}</li>)",
      "<for name in names><li>{name}</li></for>",
      "names.filter(n => <li>{n}</li>)",
    ],
    correctIndex: 1,
    explanation:
      "JSX accepts arrays of elements. map returns a new array, making it the natural tool for lists. Each array element must have a unique key. forEach returns nothing — it doesn't work in JSX. There is no <for> in JSX.",
  },
  {
    id: "lyk-3",
    question:
      "What concrete problem occurs when rendering {count && <span>text</span>} when count is 0?",
    options: [
      "Nothing, the component doesn't render",
      "React throws an error because 0 is not a boolean",
      "The number 0 is rendered on screen because 0 is falsy but React still displays it",
      "The span appears anyway because 0 is truthy in JSX",
    ],
    correctIndex: 2,
    explanation:
      "The && operator returns the left operand if it is falsy. React renders 0 (a number) but doesn't render false or null. The fix: use count > 0 && <span/> or a ternary. This is one of the most common bugs in conditional rendering.",
  },
  {
    id: "lyk-4",
    question: "Where should the key prop be placed when using map?",
    options: [
      "On the first child element of the component being mapped",
      "On the root element returned by the map, not on an internal child",
      "On the outermost HTML element in the entire tree",
      "It can be placed at any level; React finds it automatically",
    ],
    correctIndex: 1,
    explanation:
      "The key must be on the root element of the map. If the map returns <li><span key={id}>...</span></li>, the key is in the wrong place. It should be <li key={id}>...</li>. React uses the key to reconcile the map's level, not internal children.",
  },
  {
    id: "lyk-5",
    question: "What is the practical difference between returning null and false in JSX?",
    options: [
      "No difference; both hide the component without leaving a trace in the DOM",
      "null hides without rendering anything; false also does, but some linters prefer null for clarity",
      "false renders an empty DOM node; null renders nothing",
      "null closes the nearest Portal; false cancels the entire render",
    ],
    correctIndex: 1,
    explanation:
      "Both null and false make React render nothing to the DOM. The difference is semantic: null communicates 'nothing intentionally here', false communicates an unmet condition. undefined also works. The convention is to use null for optional elements.",
  },
  {
    id: "lyk-6",
    question: "When should you use the ternary operator instead of && for conditional rendering?",
    options: [
      "Always; the ternary is safer than &&",
      "When you want to show an alternative element if the condition is false",
      "Only when the condition is a strict boolean",
      "When the component has more than one level of nesting",
    ],
    correctIndex: 1,
    explanation:
      "If you only need to show something or nothing, && is enough (watch out for falsy values). If you need A or B based on the condition, the ternary condition ? <A/> : <B/> is the right tool. Both are equally valid in their use cases.",
  },
  {
    id: "lyk-7",
    question:
      "Does the key need to be unique across the entire React tree or only among siblings at the same level?",
    options: [
      "Unique across the entire tree — two components with the same key cause conflicts",
      "Unique only among direct siblings of the same map or list",
      "Unique within the same parent component",
      "Unique globally in the application to avoid collisions",
    ],
    correctIndex: 1,
    explanation:
      "The key only needs to be unique among direct siblings in the same set. Two different lists can perfectly use the same key values without conflicts. React compares keys only within the same reconciliation context.",
  },
  {
    id: "lyk-8",
    question: "How do you show a 'No results' message when a filtered list is empty?",
    options: [
      "items.length === 0 ? <p>No results</p> : items.map(...)",
      "items.map(...) || <p>No results</p>",
      "!items && <p>No results</p>",
      "items.length < 1 ?? <p>No results</p>",
    ],
    correctIndex: 0,
    explanation:
      "The ternary is the most direct approach: if the length is 0, show the fallback message; otherwise, render the list. items.map(...) || ... doesn't work because map returns an empty array [] which is truthy. The ?? operator is for null/undefined, not arrays.",
  },
  {
    id: "lyk-9",
    question: "Can a component return an array of elements directly (without a Fragment)?",
    options: [
      "No, a component must always return a single root element",
      "Yes, returning an array of JSX elements is valid, but each element must have a key",
      "Only if TypeScript is used with the correct type",
      "Only since React 18 with the new multiple-return API",
    ],
    correctIndex: 1,
    explanation:
      "A component can return an array: return [<A key='a'/>, <B key='b'/>]. It's valid, though less common than Fragments because Fragments are more readable. If you return an array, each element needs a key just like in a map.",
  },
  {
    id: "lyk-10",
    question: "What does React do when the same key appears twice at the same level?",
    options: [
      "It throws an error in production and stops the render",
      "It shows only the first element with that key",
      "It emits a warning in development and may show unexpected behavior in the DOM",
      "It merges them into a single DOM node for efficiency",
    ],
    correctIndex: 2,
    explanation:
      "React emits a console warning but does not throw an error. However, the behavior is undefined: it may render only one of the duplicates or behave unpredictably during reconciliation. Duplicate keys break the stable identity guarantee.",
  },
]

const formsQuestions: QuizQuestion[] = [
  {
    id: "frm-1",
    question: "What does e.preventDefault() do in a form's onSubmit handler?",
    options: [
      "Stops the event from bubbling up to parent components",
      "Prevents the browser's default behavior of reloading the page when the form is submitted",
      "Cancels the submit event and automatically clears the inputs",
      "Prevents the form from validating its native browser fields",
    ],
    correctIndex: 1,
    explanation:
      "Without preventDefault(), submitting the form causes the browser to reload the page — the default HTTP behavior of forms. In React we handle submit with JavaScript, so we need to prevent that native behavior to process data without a reload.",
  },
  {
    id: "frm-2",
    question: "Why is an input with value={text} but no onChange problematic?",
    options: [
      "It causes a TypeScript error because value requires onChange",
      "The input becomes read-only: the user cannot type even if they try",
      "The value doesn't update in state, but the input works normally",
      "React ignores the value if there is no onChange defined",
    ],
    correctIndex: 1,
    explanation:
      "React controls the input value through state. If there's a value but no onChange, React overwrites the input with the state value on every render — preventing the user from typing. React will show a warning. The fix: add onChange, or use defaultValue for uncontrolled mode.",
  },
  {
    id: "frm-3",
    question: "What is the difference between value and defaultValue on an input?",
    options: [
      "value controls state in real time (controlled); defaultValue sets the initial value without React control (uncontrolled)",
      "defaultValue is for text inputs; value is for checkboxes",
      "value is for login forms; defaultValue for registration forms",
      "There is no practical difference between the two",
    ],
    correctIndex: 0,
    explanation:
      "value makes the input controlled: React is the source of truth and updates the DOM on every render. defaultValue only sets the initial value and then the DOM manages its own state — it's for uncontrolled components. They are not mixed on the same input.",
  },
  {
    id: "frm-4",
    question: "How is a controlled checkbox correctly handled in React?",
    options: [
      "Use value={checked} and onChange to update the state",
      "Use checked={boolean} and onChange that updates the boolean with e.target.checked",
      "Checkboxes cannot be controlled in React, only uncontrolled",
      "Use onClick instead of onChange to detect changes",
    ],
    correctIndex: 1,
    explanation:
      "Checkboxes use checked (not value) for controlled mode. The handler must read e.target.checked — a boolean — not e.target.value. Example: <input type='checkbox' checked={active} onChange={e => setActive(e.target.checked)} />",
  },
  {
    id: "frm-5",
    question: "How do you read all values from an uncontrolled form on submit?",
    options: [
      "Access e.target.children and iterate over the inputs",
      "Use new FormData(e.target) and call .get('fieldName')",
      "Read document.getElementById for each field",
      "Uncontrolled forms cannot be read on submit",
    ],
    correctIndex: 1,
    explanation:
      "new FormData(event.target) collects all fields with a name attribute from the form. formData.get('email') returns the current value. It's the idiomatic way to handle uncontrolled forms in React — avoiding the need to manage each field's state with useState.",
  },
  {
    id: "frm-6",
    question: "When does it make sense to use an uncontrolled form over a controlled one?",
    options: [
      "Whenever the form has more than 3 fields",
      "When you don't need real-time validation or to read the value before submit",
      "Only for search forms, never for important data forms",
      "When the form uses custom CSS styles",
    ],
    correctIndex: 1,
    explanation:
      "Uncontrolled forms are simpler when you only need the value on submit. If you need to validate as the user types, show remaining character counts, or enable/disable the submit button in real time, a controlled form with useState is the better choice.",
  },
  {
    id: "frm-7",
    question: "How do you reset a controlled form to its initial values?",
    options: [
      "Call e.target.reset() inside the form handler",
      "Update each field's state to its initial value (e.g., setEmail(''))",
      "Change the form's key to force React to unmount and remount it",
      "Both B and C are valid depending on the case",
    ],
    correctIndex: 3,
    explanation:
      "In a controlled form, the React state IS the form. To reset: update all states to their initial values (option B). Option C (changing the key) forces a full remount and also resets — useful when the form has many fields or complex internal state.",
  },
  {
    id: "frm-8",
    question: "How do you handle multiple controlled inputs without one useState per field?",
    options: [
      "It's not possible — each field needs its own useState",
      "Use an object in state and update with spread in onChange using e.target.name",
      "Use useReducer only when there are more than 5 fields",
      "Leave the inputs uncontrolled and read with refs on submit",
    ],
    correctIndex: 1,
    explanation:
      "An object in state is the most common solution: const [form, setForm] = useState({ email: '', password: '' }). In onChange: setForm(f => ({ ...f, [e.target.name]: e.target.value })). With the name attribute on each input, a single handler works for all fields.",
  },
  {
    id: "frm-9",
    question: "What event is used to detect changes in a controlled <select>?",
    options: [
      "onInput — onChange only works with text inputs",
      "onChange — same as text inputs; React normalizes the behavior",
      "onSelect — a specific event for <select> elements",
      "onClick — because the user clicks on the option",
    ],
    correctIndex: 1,
    explanation:
      "React normalizes onChange for all form elements: text input, checkbox, radio, select, and textarea. The value is in e.target.value just like a text input. React maps this to the corresponding native events for each element.",
  },
  {
    id: "frm-10",
    question: "How do you disable the submit button while the form has validation errors?",
    options: [
      "Use CSS pointer-events: none on the button",
      "Compute hasErrors from state and pass disabled={hasErrors} to the button",
      "Add required to inputs so the browser manages it",
      "Intercept the button's onClick and don't call submit if there are errors",
    ],
    correctIndex: 1,
    explanation:
      "The idiomatic React way: derive the form's validity from the current state (without storing isValid in state) and pass disabled={hasErrors} to the button. This is a controlled component extended to the submit button. The browser's required attribute has limited behavior and is hard to customize.",
  },
]

const basicEffectsQuestions: QuizQuestion[] = [
  {
    id: "efb-1",
    question: "When does useEffect without a dependency array (no second argument) run?",
    options: [
      "Only on the first render",
      "After every render of the component",
      "Only when props change",
      "Only when state changes",
    ],
    correctIndex: 1,
    explanation:
      "Without a dependency array, useEffect runs after every render. This includes the first render and all subsequent re-renders. It is equivalent to having no optimization — use it only if you truly need the effect to run every time.",
  },
  {
    id: "efb-2",
    question: "What is the function returned by useEffect (the cleanup function) for?",
    options: [
      "To tell React when the effect has finished executing",
      "To clean up subscriptions, timers, or listeners before the effect runs again or the component unmounts",
      "To catch errors that occur inside the effect",
      "To reset the component's state to its initial value",
    ],
    correctIndex: 1,
    explanation:
      "React calls the cleanup before running the effect again (if dependencies changed) and when the component unmounts. It is essential for clearInterval, clearTimeout, removeEventListener, and canceling subscriptions. Without cleanup, you accumulate resources that are never released.",
  },
  {
    id: "efb-3",
    question: "Why can't you mark the useEffect function directly as async?",
    options: [
      "React doesn't support async/await inside effects",
      "An async function returns a Promise, but useEffect expects a cleanup function or undefined — not a Promise",
      "async inside useEffect causes infinite loops",
      "It's a temporary limitation that will be resolved in React 20",
    ],
    correctIndex: 1,
    explanation:
      "If the useEffect function is async, it returns a Promise. React expects void or a cleanup function. The fix: define an async function inside and call it immediately: useEffect(() => { async function load() { ... } load(); }, []).",
  },
  {
    id: "efb-4",
    question: "What happens if you update state inside useEffect with [] as dependencies?",
    options: [
      "React throws a missing dependency error",
      "The state updates once on mount — no loop because the dependencies are empty",
      "It causes an infinite loop because setState triggers a re-render that runs the effect again",
      "The state change is ignored inside useEffect with []",
    ],
    correctIndex: 1,
    explanation:
      "With [], the effect only runs on mount. Updating state inside doesn't cause a loop because React doesn't re-execute the effect (empty dependencies don't change). The re-render happens, but the effect doesn't re-run. An infinite loop would occur without [] or with the updated state as a dependency.",
  },
  {
    id: "efb-5",
    question: "How many times does useEffect with [] run in React.StrictMode in development?",
    options: [
      "Once; StrictMode doesn't affect effects",
      "Twice — React intentionally mounts, unmounts, and remounts to detect non-idempotent effects",
      "Three times for greater statistical certainty",
      "Depends on the browser and concurrent mode",
    ],
    correctIndex: 1,
    explanation:
      "StrictMode runs the mount → unmount → mount cycle in development to verify that your cleanup works correctly. If your effect has non-revertible side effects (analytics, DB mutations), they are caught here. In production it only runs once.",
  },
  {
    id: "efb-6",
    question: "What is a 'stale closure' in the context of useEffect?",
    options: [
      "An effect that has no cleanup and leaves resources unreleased",
      "When the effect captures the value of a variable at creation time and doesn't see later updates",
      "An effect that takes too long and blocks the render",
      "When useEffect is used outside a React component",
    ],
    correctIndex: 1,
    explanation:
      "Closures capture values at the time they are created. If you have useEffect with [] and read count inside, you'll always see 0 (the initial value). The fix: include count in the dependencies, or use functional updates (setCount(c => c + 1)) which don't need the captured value.",
  },
  {
    id: "efb-7",
    question: "When does the cleanup of a useEffect with [userId] dependencies run?",
    options: [
      "Only when the component unmounts",
      "Before each re-execution of the effect (when userId changes) and also when the component unmounts",
      "After each execution of the effect",
      "Only if the effect threw an error",
    ],
    correctIndex: 1,
    explanation:
      "The cleanup runs at two moments: (1) when the component unmounts, and (2) just before the effect re-executes due to a dependency change. This ensures that when userId changes, we cancel the previous request before launching the new one.",
  },
  {
    id: "efb-8",
    question: "Is it correct to have multiple useEffect calls in the same component?",
    options: [
      "No, there can only be one per component — put all logic in a single useEffect",
      "Yes, and it's good practice to separate effects by responsibility",
      "Yes, but only if they have different dependency arrays",
      "Only in class components, not functional ones",
    ],
    correctIndex: 1,
    explanation:
      "Having multiple useEffect calls is the recommended practice. Each effect should have a single responsibility. Separating a fetch effect from an event listener effect makes the code more readable, testable, and gives each its own independent cleanup. React runs them in declaration order.",
  },
  {
    id: "efb-9",
    question:
      "What problem arises from including an object created in the render as a useEffect dependency?",
    options: [
      "None; React compares objects by deep value",
      "The object has a new reference every render, causing the effect to run on every render even if the data is the same",
      "TypeScript throws a type error because dependencies must be primitives",
      "React automatically serializes the object and compares it as JSON",
    ],
    correctIndex: 1,
    explanation:
      "React compares dependencies by reference (Object.is). An object literal { id: 1 } creates a new reference on every render, even if the content is the same. The effect runs on every render as if there were no dependencies. Fix: use primitives as dependencies (the id, not the object), or memoize with useMemo.",
  },
  {
    id: "efb-10",
    question: "What is the correct way to fetch data inside useEffect?",
    options: [
      "useEffect(async () => { const data = await fetch(...) }, [])",
      "useEffect(() => { fetch(...).then(r => r.json()).then(setData) }, [])",
      "useEffect(() => { async function load() { const r = await fetch(...); setData(await r.json()); } load(); }, [])",
      "Both B and C are valid",
    ],
    correctIndex: 3,
    explanation:
      "Both B (.then() chaining) and C (an async function called immediately) are valid. Option A doesn't work because the async function returns a Promise instead of undefined or a cleanup. C is preferred when there are multiple awaits because it's more readable.",
  },
]

const basicStateQuestions: QuizQuestion[] = [
  {
    id: "stb-1",
    question: "Why should you never mutate state directly (e.g., state.count = 5)?",
    options: [
      "React will throw a TypeError if it detects the mutation",
      "The mutation doesn't trigger a re-render because React doesn't detect changes on the same reference",
      "It's just a style convention; it would work the same way",
      "Mutations are slower than using setState",
    ],
    correctIndex: 1,
    explanation:
      "React detects changes by comparing references. If you mutate the object without creating a new one, the reference is the same — React assumes nothing changed and doesn't re-render. Always create a new object/array: setItems([...items, newItem]) instead of items.push(newItem).",
  },
  {
    id: "stb-2",
    question:
      "When do you need to use the functional form setCount(c => c + 1) instead of setCount(count + 1)?",
    options: [
      "Always — the functional form is always better",
      "When the new value depends on the current value and there may be multiple updates in the same cycle",
      "Only when the component uses useCallback or useMemo",
      "Only in loops or setTimeout",
    ],
    correctIndex: 1,
    explanation:
      "If you call setCount multiple times in the same handler, each call with setCount(count + 1) uses the value captured in the render — always the same. With setCount(c => c + 1), React applies each update to the most recent value. Three consecutive increments should add 3, not 1.",
  },
  {
    id: "stb-3",
    question:
      "What does React do if you call setState with exactly the same value the state already has?",
    options: [
      "Re-renders anyway because it can't tell if something changed",
      "It may skip the re-render if it determines the new value is the same (bailout)",
      "It throws a warning saying the state didn't change",
      "It updates the state but not the DOM",
    ],
    correctIndex: 1,
    explanation:
      "React uses Object.is to compare the new state with the previous one. If they are equal, React may skip the component re-render (bailout). For primitives this is very efficient. For objects, even if the content is equal, a new reference causes a re-render.",
  },
  {
    id: "stb-4",
    question: "How do you correctly update a field of an object in state?",
    options: [
      "state.email = newEmail; setState(state)",
      "setState({ email: newEmail }) — React merges the new value with the previous one",
      "setState(prev => ({ ...prev, email: newEmail })) — spread the previous object plus the updated field",
      "setState(Object.assign(state, { email: newEmail }))",
    ],
    correctIndex: 2,
    explanation:
      "useState doesn't merge objects automatically (unlike class setState). You must spread manually: { ...prev, email: newEmail }. Option A mutates state. Option B overwrites the entire state with only email. Option D mutates the object before passing it to setState.",
  },
  {
    id: "stb-5",
    question: "What is 'derived state' and when shouldn't you use useState for it?",
    options: [
      "State that comes from props — it must always be stored in useState",
      "A value computable directly from existing state or props — you don't need useState; calculate it in the render",
      "State initialized from a prop — it needs its own useState",
      "State that depends on an async HTTP request",
    ],
    correctIndex: 1,
    explanation:
      "If you can compute a value from existing state, don't store it in another useState. Example: if you have items[], you don't need const [count, setCount] = useState(items.length) — just use const count = items.length in the render. Duplicating derived state causes inconsistencies.",
  },
  {
    id: "stb-6",
    question: "What does React 18 guarantee about batching multiple setState calls?",
    options: [
      "It only batches setState inside React event handlers, never in setTimeout or fetch",
      "It batches all setState calls into a single re-render, even inside setTimeout, promises, and native events",
      "It batches setState only if you call them on the same line of code",
      "It guarantees nothing — batching is an optional optimization by the JS engine",
    ],
    correctIndex: 1,
    explanation:
      "React 18 introduced automatic batching: multiple setState calls in any async context (setTimeout, fetch, promises) are grouped into a single re-render. Before React 18, batching only happened in React event handlers. More batching = fewer re-renders = better performance.",
  },
  {
    id: "stb-7",
    question: "Do two instances of the same component share their state?",
    options: [
      "Yes, state is tied to the component type, not the instance",
      "No, each component instance has its own completely independent state",
      "Only if they are in the same parent component",
      "Only if they use the same variable name in useState",
    ],
    correctIndex: 1,
    explanation:
      "React state is tied to the position in the component tree, not to the component as a type. Two <Counter /> in the tree are independent instances with their own state. Changing the count of one doesn't affect the other. To share state, you must lift it to a common ancestor.",
  },
  {
    id: "stb-8",
    question: "What is the correct order of the values returned by useState?",
    options: [
      "[setter, value] — setter first to follow the hook convention",
      "[value, setter] — current value first, then the function to update it",
      "{ value, set } — an object with both properties",
      "Depends on whether an initial value or initializer function is passed",
    ],
    correctIndex: 1,
    explanation:
      "useState always returns a two-element array: [currentValue, setterFunction]. The destructuring convention is const [count, setCount] = useState(0). The order is fixed — value first, setter second. There is no object variant.",
  },
  {
    id: "stb-9",
    question: "How do you correctly update an array of objects in state?",
    options: [
      "items[0].done = true; setItems(items)",
      "setItems(items.map(item => item.id === id ? { ...item, done: true } : item))",
      "setItems(items.splice(0, 1, { ...items[0], done: true }))",
      "items.forEach(item => { if (item.id === id) item.done = true }); setItems(items)",
    ],
    correctIndex: 1,
    explanation:
      "You must create a new array and new objects for the modified items — never mutate. map returns a new array. For the changed item: { ...item, done: true } creates a new object. Options A and D mutate state. splice mutates the original array.",
  },
  {
    id: "stb-10",
    question: "When does a React component re-render?",
    options: [
      "Only when setState is called with a different value",
      "When its own state changes, when its props change, or when the parent re-renders (without React.memo)",
      "Only when the user interacts with the component",
      "On every browser animationFrame to keep the UI in sync",
    ],
    correctIndex: 1,
    explanation:
      "A component re-renders for three reasons: (1) its own state changed, (2) its props changed, or (3) its parent re-rendered and the component is not wrapped in React.memo. The re-render recalculates the JSX — React then compares with the previous Virtual DOM and applies only the real changes to the DOM.",
  },
]

const contextQuestions: QuizQuestion[] = [
  {
    id: "ctx-1",
    question: "What is the main purpose of React's Context API?",
    options: [
      "To completely replace Redux and other global state libraries",
      "To pass data directly to deep components in the tree without prop drilling",
      "To synchronize state between server and client in real time",
      "To create immutable state stores as an alternative to useReducer",
    ],
    correctIndex: 1,
    explanation:
      "Context solves prop drilling: passing data through intermediate components that don't need it. It's ideal for session-wide data like theme, locale, or authenticated user. It's not a general replacement for Redux — for complex logic with many updates, a dedicated state manager may be better.",
  },
  {
    id: "ctx-2",
    question:
      "What value does useContext(MyContext) receive when there is no Provider in the tree?",
    options: [
      "null always",
      "undefined always",
      "The defaultValue passed to createContext() when the context was created",
      "It automatically throws an error because the Provider is mandatory",
    ],
    correctIndex: 2,
    explanation:
      "createContext(defaultValue) — the defaultValue is the fallback when there is no Provider. If you don't pass anything, the default is undefined. React doesn't throw automatically; if you want to require the Provider, do it in the custom hook: if (!ctx) throw new Error('Requires Provider').",
  },
  {
    id: "ctx-3",
    question: "When does a Context consumer re-render?",
    options: [
      "Only when the parent component re-renders",
      "Every time the Provider's value changes, regardless of whether the parent re-rendered",
      "Every time any component in the tree changes its state",
      "Only if the consumer also has its own useState",
    ],
    correctIndex: 1,
    explanation:
      "All consumers of a Context re-render when the Provider's value changes — using reference comparison (Object.is). This is independent of the parent's re-render. React.memo doesn't prevent re-renders caused by Context changes.",
  },
  {
    id: "ctx-4",
    question: "Why can <MyCtx.Provider value={{ theme, setTheme }}> cause unnecessary re-renders?",
    options: [
      "Because object literals are not allowed as a Provider value",
      "Because an object literal creates a new reference on every parent render, even if theme hasn't changed",
      "Because the Provider doesn't accept setTheme in value — it must be a separate prop",
      "Because React compares objects by deep value, which is expensive",
    ],
    correctIndex: 1,
    explanation:
      "{ theme, setTheme } creates a new object on every render of the Provider's parent. New reference → all consumers re-render even if theme is the same. The fix: memoize the value with useMemo(() => ({ theme, setTheme }), [theme]).",
  },
  {
    id: "ctx-5",
    question: "Can a component consume multiple Contexts at the same time?",
    options: [
      "No, a component can only subscribe to one Context at a time",
      "Yes, using multiple useContext() calls — one per Context",
      "Only if the Contexts are related and were created together",
      "Only if wrapped in a HOC that combines the Contexts",
    ],
    correctIndex: 1,
    explanation:
      "A component can call useContext() as many times as needed: const { theme } = useContext(ThemeCtx); const { user } = useContext(AuthCtx). Each call subscribes the component to the corresponding Context independently.",
  },
  {
    id: "ctx-6",
    question:
      "What strategy prevents components that only read setTheme from re-rendering when theme changes?",
    options: [
      "It's impossible — any Context consumer re-renders when the value changes",
      "Split the Context in two: one for the value (theme) and another for the setter (setTheme)",
      "Use React.memo on the setTheme consumers",
      "Pass setTheme directly as a prop instead of through Context",
    ],
    correctIndex: 1,
    explanation:
      "If you split ThemeContext (value only) from ThemeDispatchContext (setter only), components that only read setTheme don't re-render when the theme changes because they're subscribed to the setter Context — which has a stable reference since setTheme doesn't change between renders.",
  },
  {
    id: "ctx-7",
    question: "Can multiple instances of the same Provider be nested in the tree?",
    options: [
      "No, there can only be one Provider per Context in the entire application",
      "Yes, each can have a different value — consumers use the nearest Provider",
      "Yes, but values are merged automatically with deep merge",
      "Only in development mode, not in production",
    ],
    correctIndex: 1,
    explanation:
      "You can nest multiple Providers of the same Context with different values. Each consumer uses the nearest Provider up the tree. This is useful for overriding values in UI subtrees (e.g., a dark theme within a specific section of the app).",
  },
  {
    id: "ctx-8",
    question: "What is the main limitation of Context for complex global state management?",
    options: [
      "It can only store strings and numbers, not complex objects",
      "Any change to the value re-renders ALL consumers, with no fine-grained control per field",
      "It doesn't work with class components",
      "It can only be used once in the application",
    ],
    correctIndex: 1,
    explanation:
      "Context has no selectors. If the value is { user, preferences, cart }, changing only the cart re-renders ALL consumers — even those that only read user. Libraries like Zustand or Jotai have selectors that limit re-renders to consumers of the specific data that changed.",
  },
  {
    id: "ctx-9",
    question:
      "What does useContext return when the component is inside the Provider but its value is undefined?",
    options: [
      "The createContext defaultValue, because React falls back automatically",
      "undefined — the Provider's value takes precedence over createContext's defaultValue",
      "null, because React normalizes undefined to null in Contexts",
      "It throws an error because undefined is not a valid Provider value",
    ],
    correctIndex: 1,
    explanation:
      "When there is a Provider, its value always takes precedence — even if it's undefined. The createContext defaultValue is only used when there is NO Provider in the tree at all. <MyCtx.Provider value={undefined}> → useContext returns undefined, not the defaultValue.",
  },
  {
    id: "ctx-10",
    question: "What is the recommended way to expose a Context to consumers?",
    options: [
      "Export the Context object directly and have each consumer call useContext",
      "Create a custom hook (e.g., useTheme) that calls useContext internally and validates the Provider",
      "Export the Provider and let each consumer create its own local Context",
      "Use a HOC to inject the Context as props to components that need it",
    ],
    correctIndex: 1,
    explanation:
      "The recommended pattern: export the Provider and a custom hook (useTheme, useAuth) that calls useContext internally. The hook can validate the Provider exists, hide implementation details, and add derived logic. Consumers call useTheme() instead of handling the Context directly.",
  },
]

export const allQuizzes: Quiz[] = [
  {
    id: "fundamentos",
    label: "Fundamentals",
    description: "State, props, Virtual DOM, and the basics of React",
    difficulty: "basic",
    questions: fundamentalsQuestions,
  },
  {
    id: "listas-y-keys",
    label: "Lists & keys",
    description: "Rendering lists, the key prop, conditional rendering, and Fragments",
    difficulty: "basic",
    questions: listsAndKeysQuestions,
  },
  {
    id: "formularios",
    label: "Forms",
    description: "Controlled inputs, form events, and submit handling",
    difficulty: "basic",
    questions: formsQuestions,
  },
  {
    id: "efectos-basicos",
    label: "Effects",
    description: "useEffect: when it runs, cleanup, dependencies, and common mistakes",
    difficulty: "basic",
    questions: basicEffectsQuestions,
  },
  {
    id: "estado-basico",
    label: "State",
    description: "useState: updates, immutability, batching, and derived state",
    difficulty: "basic",
    questions: basicStateQuestions,
  },
  {
    id: "hooks",
    label: "Hooks",
    description: "useEffect, useMemo, useCallback, and the correct mental model",
    difficulty: "intermediate",
    questions: hooksQuestions,
  },
  {
    id: "patrones",
    label: "Patterns",
    description: "HOC, Render Props, Controlled components, and composition",
    difficulty: "intermediate",
    questions: patternsQuestions,
  },
  {
    id: "rendimiento",
    label: "Performance",
    description: "Memoization, code splitting, batching, and render optimization",
    difficulty: "intermediate",
    questions: performanceQuestions,
  },
  {
    id: "contexto",
    label: "Context API",
    description: "createContext, Provider, useContext, and patterns to avoid re-renders",
    difficulty: "intermediate",
    questions: contextQuestions,
  },
  {
    id: "avanzado",
    label: "Advanced",
    description: "Concurrent React, Server Components, React 19, and deep architecture",
    difficulty: "advanced",
    questions: advancedQuestions,
  },
]

export const quizIndex: Record<string, Quiz> = Object.fromEntries(allQuizzes.map((q) => [q.id, q]))
