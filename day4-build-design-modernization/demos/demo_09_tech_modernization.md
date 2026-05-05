# Demo 09 — Tech Modernization: Angular → React Migration

> **Duration:** ~8 min | **Slide:** 22 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1–2: analysis & strategy) → **Agent** mode (Step 3–5: execute migration) |
| **Model** | **Claude Sonnet 4** — excels at cross-framework translation and understanding architectural patterns |
| **Fallback Model** | GPT-4.1 — faster for individual component translations |

---

## Objective

Demonstrate using Copilot to migrate a real **Angular 18 application** to **React** — analyzing Angular-specific patterns, mapping them to React equivalents, and executing the migration component by component with build verification.

---

## Source Application — Product Catalog (Angular 18)

The starting point is a fully working Angular 18 product catalog app located at:

```
C:\Users\Lavanya N\product-catalog
```

### Application Structure

```
src/app/
├── app-routing.module.ts          # Root routing (4 routes)
├── app.component.ts/html/scss     # Shell — header, router-outlet, footer
├── app.module.ts                  # Root NgModule
├── home/
│   └── home.component.*           # Landing page with hero + feature cards
├── models/
│   └── product.model.ts           # Product interface (id, name, category, price, etc.)
├── products/
│   ├── products.module.ts         # Feature module (lazy-loadable)
│   └── components/
│       ├── product-card/          # Presentational — @Input/@Output, star rating
│       ├── product-list/          # Smart — search, category filter, RxJS observables
│       └── product-detail/        # Route-param driven detail view
└── services/
    └── product.service.ts         # BehaviorSubject + mock data, singleton via providedIn:'root'
```

### Angular Patterns to Migrate

| Angular Pattern | React Equivalent |
|----------------|-----------------|
| `@NgModule` (AppModule, ProductsModule) | No equivalent — React uses imports directly |
| `@Component` decorators | Function components |
| `@Input()` / `@Output()` | Props / callback props |
| `@Injectable` + constructor DI | Context API or custom hooks |
| `BehaviorSubject` + `Observable` | `useState` + `useEffect` or Zustand/Redux |
| `| async` pipe in templates | Direct state rendering in JSX |
| `[(ngModel)]` two-way binding | `value` + `onChange` controlled inputs |
| `*ngFor`, `*ngIf`, `[class.x]` | `.map()`, ternary/`&&`, `className` |
| `ActivatedRoute` + `paramMap` | `useParams()` from React Router |
| `Router.navigate()` | `useNavigate()` from React Router |
| `routerLink` / `routerLinkActive` | `<Link>` / `<NavLink>` from React Router |
| Angular Pipes (`currency`, `titlecase`, `slice`) | Template literals, `Intl.NumberFormat`, `.slice()` |

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The **product-catalog** project open (`C:\Users\Lavanya N\product-catalog`)
- Node.js 18+ installed
- Terminal accessible for the agent to run build commands

---

## Step 1 — Migration Analysis (2 min)

**Goal:** Use Plan mode to analyze the Angular codebase and create a React migration strategy.

1. Open the `product-catalog` folder in VS Code
2. Switch to **Plan mode** and type:

   ```
   Analyze this Angular app and create a migration plan to React 
   with TypeScript and Vite. Order from leaf components to root.
   ```

3. **Show the plan** — Copilot produces a bottom-up migration order

> **👀 What to watch for:** Copilot identifies the actual dependency graph — `ProductCard` (leaf/presentational) → `ProductList` (smart/container) → `ProductDetail` (route-driven) → `App` shell. It maps *specific* Angular patterns in your code to React equivalents, not generic advice.

**Talking Point:** _"Copilot analyzed the component hierarchy and Angular patterns — NgModules, DI, Observables, template directives — and produced a migration order based on actual dependencies."_

---

## Step 2 — Scaffold the React Project (1 min)

**Goal:** Agent creates the React project structure alongside the Angular code.

1. Switch to **Agent mode** and type:

   ```
   Scaffold a React + Vite + TypeScript project called 
   "product-catalog-react". Set up React Router v6, copy the 
   Product interface and mock data, and verify the build.
   ```

2. **Watch the agent** scaffold, install, and verify the build

> **👀 What to watch for:** Copilot reuses the existing TypeScript interface and mock data verbatim — the data layer transfers with zero changes. Only the framework plumbing is new.

**Talking Point:** _"TypeScript interfaces and data are framework-agnostic — they transfer directly. The migration is about translating Angular plumbing to React patterns."_

---

## Step 3 — Migrate Leaf Component: ProductCard (2 min)

**Goal:** Migrate the simplest component first — the presentational `ProductCard`.

```
Migrate ProductCardComponent to a React function component. 
Preserve the exact same visual output and behavior.
```

**Watch for these translations:**

| Angular (product-card.component.ts) | React (ProductCard.tsx) |
|--------------------------------------|------------------------|
| `@Input() product!: Product;` | `interface Props { product: Product; onSelect: (p: Product) => void; }` |
| `@Output() selected = new EventEmitter<Product>();` | Callback prop: `onSelect(product)` |
| `get stars(): boolean[]` | `const stars = useMemo(...)` or inline computation |
| `(click)="selected.emit(product)"` | `onClick={() => onSelect(product)}` |
| `*ngFor="let filled of stars"` | `{stars.map((filled, i) => ...)}` |
| `{{ product.price \| currency }}` | `{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}` |

> **👀 What to watch for:** The business logic (star calculation, stock check) is identical. Only Angular decorators and template syntax became React props and JSX.

**Talking Point:** _"Same component, same behavior — the @Input became a prop, the @Output became a callback, the template became JSX. No business logic changed."_

---

## Step 4 — Migrate Smart Component: ProductList (2 min)

**Goal:** Migrate the stateful `ProductList` with search, filtering, and Observable subscription.

```
Migrate ProductListComponent to React. Wire it up with the 
ProductCard we just migrated. Run the dev server and verify 
the product listing page works.
```

**Watch for these translations:**

| Angular Pattern | React Equivalent |
|----------------|-----------------|
| `products$: Observable<Product[]>` | `const [products, setProducts] = useState<Product[]>([])` |
| `filteredProducts$ \| async` | `const filteredProducts = useMemo(...)` |
| `[(ngModel)]="searchQuery"` | `value={search} onChange={e => setSearch(e.target.value)}` |
| `[class.category-btn--active]="cat === selectedCategory"` | `className={cat === selected ? 'active' : ''}` |
| `*ngIf="(filteredProducts$ \| async) as products"` | `{filteredProducts.length > 0 ? ... : <EmptyState />}` |
| `[trackBy]="trackById"` | `key={product.id}` on the mapped element |

> **👀 What to watch for:** The RxJS Observable + async pipe pattern collapses into simple `useState` + `useMemo`. The filtering logic is identical — only the reactivity mechanism changed.

**Talking Point:** _"The BehaviorSubject + async pipe became useState + useMemo. The filtering algorithm didn't change at all — Copilot just re-wired the reactivity."_

---

## Step 5 — Migrate Routing & App Shell (1 min)

```
Migrate the routing, App shell, Home page, and ProductDetail 
component. Run the dev server and verify all routes work.
```

> **👀 What to watch for:** Angular's `routerLink` becomes React Router's `<NavLink>`, `router-outlet` becomes `<Outlet>`, and `ActivatedRoute.snapshot.paramMap.get('id')` becomes `useParams()`. The route structure is identical.

**Talking Point:** _"The route table is the same — only the syntax changed. Angular's module-based routing became React Router's component-based routing."_

---

## Step 6 (Bonus) — Side-by-Side Comparison

If time allows:

```
Run both apps side by side (Angular on 4200, React on 5173) 
and compare file count, bundle size, and lines of code.
```

> **👀 What to watch for:** Identical functionality, different framework plumbing. The React version typically has fewer files (no NgModule boilerplate) and a simpler mental model for state management.

---

## Pattern Translation Quick Reference

| Angular | React |
|---------|-------|
| `@NgModule({ declarations, imports })` | Direct imports, no registration |
| `@Component({ selector, template })` | `function MyComponent() { return <JSX> }` |
| `@Injectable({ providedIn: 'root' })` | Custom hook or Context provider |
| `@Input()` property | Props interface |
| `@Output()` EventEmitter | Callback prop |
| `constructor(private svc: Service)` | `const data = useMyHook()` |
| `ngOnInit()` | `useEffect(() => {}, [])` |
| `BehaviorSubject` + `| async` | `useState` + direct rendering |
| `[(ngModel)]` | `value` + `onChange` |
| `*ngFor="let x of items"` | `{items.map(x => <X key={x.id} />)}` |
| `*ngIf="condition"` | `{condition && <Component />}` |
| `[class.active]="isActive"` | `className={isActive ? 'active' : ''}` |
| `{{ value \| currency }}` | `{formatCurrency(value)}` |
| `routerLink="/path"` | `<Link to="/path">` |
| `routerLinkActive="active"` | `<NavLink className={({isActive}) => ...}>` |
| `ActivatedRoute` + `paramMap` | `useParams()` |
| `Router.navigate(['/path'])` | `navigate('/path')` |

---

## Key Takeaways

- **Real app, real migration** — not a toy example; a full-featured catalog with routing, state, and filtering
- **Leaf → root order** — migrate presentational components first, then smart components, then routing shell
- **Data layer transfers directly** — TypeScript interfaces and mock data are framework-agnostic
- **Business logic is unchanged** — filtering, searching, star ratings — all identical
- **Only plumbing changes** — decorators → hooks, templates → JSX, DI → imports, Observables → state
- **Agent verifies builds** — catches translation errors immediately and auto-fixes
