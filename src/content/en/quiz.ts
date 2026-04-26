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

export const allQuizzes: Quiz[] = [
  {
    id: "fundamentos",
    label: "Fundamentals",
    description: "State, props, Virtual DOM, and the basics of React",
    difficulty: "basic",
    questions: fundamentalsQuestions,
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
    id: "avanzado",
    label: "Advanced",
    description: "Concurrent React, Server Components, React 19, and deep architecture",
    difficulty: "advanced",
    questions: advancedQuestions,
  },
]

export const quizIndex: Record<string, Quiz> = Object.fromEntries(allQuizzes.map((q) => [q.id, q]))
