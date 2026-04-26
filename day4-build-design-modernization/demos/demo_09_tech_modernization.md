# Demo 09 — Tech Modernization (Angular → React)

> **Duration:** ~5 min | **Slide:** 22 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: dependency analysis & migration ordering) → **Agent** mode (Step 2: component-by-component translation) |
| **Model** | **Claude Sonnet 4** — excels at cross-framework translation; understands Angular DI, RxJS patterns, and their React equivalents |
| **Fallback Model** | GPT-4.1 — faster for individual component translations; slightly less nuanced on architectural decisions |

---

## Objective

Demonstrate using Copilot to plan and execute a frontend framework migration — mapping Angular concepts to React equivalents, translating components one by one, migrating tests, and verifying the build at each step.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- An **Angular project** (even a small 3–5 component app) — or any similar migration scenario
- Node.js with npm/yarn installed
- If no Angular project available, show the pattern with a simulated migration

---

## Step 1 — Migration Analysis & Strategy (1.5 min)

**Goal:** Use Plan mode to create a component-by-component migration strategy.

1. Switch to **Plan mode** and ask:
   ```
   Analyze #codebase — this is an Angular application. Create a 
   migration plan to convert it to React with TypeScript.
   
   Map each Angular concept to its React equivalent:
   - Components (templates + decorators → JSX + hooks)
   - Services (DI → Context API or Zustand)
   - Observables (RxJS → React Query or SWR)
   - NgModules (→ removed; use lazy routes)
   - Routing (Angular Router → React Router v6)
   - Forms (Reactive Forms → React Hook Form)
   - Pipes (→ utility functions)
   
   List each component in migration order (leaf components first, 
   then parent components, then routing).
   ```

2. **Show the migration plan** — ordered list with dependency analysis:
   ```
   Migration Order:
   1. Shared pipes/utilities (no Angular deps) → utility functions
   2. ProductCard component (leaf, no children)
   3. ProductList component (uses ProductCard)
   4. ProductService (API calls) → React Query hooks
   5. AppModule routing → React Router setup
   6. App component (root)
   ```

3. Point out the ordering logic: _"Copilot analyzed component dependencies and gave us a bottom-up order — leaf nodes first, so each migrated component can be tested independently."_

**Talking Point:** _"A migration plan based on actual dependency analysis, not guesswork. This prevents the 'everything breaks at once' problem."_

---

## Step 2 — Component Translation (2 min)

**Goal:** Live-translate an Angular component to React.

1. Switch to **Agent mode** and ask for a specific component:
   ```
   Migrate the ProductCard component from Angular to React:
   
   Source: #file:src/app/components/product-card/product-card.component.ts
   Template: #file:src/app/components/product-card/product-card.component.html
   Styles: #file:src/app/components/product-card/product-card.component.scss
   
   Create a React functional component with:
   - TypeScript props interface
   - CSS Modules for styles (convert SCSS to CSS Module)
   - Hooks for any lifecycle logic (@OnInit → useEffect)
   - Event handlers replacing Angular event bindings
   
   Save as src/components/ProductCard/ProductCard.tsx and ProductCard.module.css
   ```

2. **Show the side-by-side** — Angular original vs React output:

   **Angular:**
   ```typescript
   @Component({ selector: 'app-product-card', ... })
   export class ProductCardComponent implements OnInit {
     @Input() product: Product;
     @Output() addToCart = new EventEmitter<Product>();
     
     ngOnInit() { this.trackView(); }
   }
   ```

   **React:**
   ```tsx
   interface ProductCardProps {
     product: Product;
     onAddToCart: (product: Product) => void;
   }
   
   export function ProductCard({ product, onAddToCart }: ProductCardProps) {
     useEffect(() => { trackView(); }, []);
     return ( /* JSX */ );
   }
   ```

3. Point out the mapping: _"@Input → props, @Output → callback props, ngOnInit → useEffect, templates → JSX. The business logic is preserved."_

**Talking Point:** _"The component's behavior is identical — only the framework syntax changed. Copilot preserved all the business logic while converting the plumbing."_

---

## Step 3 — Test Migration (1.5 min)

**Goal:** Show migrating Angular tests to React Testing Library.

1. Ask Copilot:
   ```
   Migrate the tests from #file:src/app/components/product-card/product-card.component.spec.ts 
   to React Testing Library + Jest.
   
   Convert:
   - TestBed setup → render() from @testing-library/react
   - fixture.detectChanges → automatic re-render
   - By.css queries → screen.getByRole / getByText
   - triggerEventHandler → fireEvent / userEvent
   - Jasmine assertions → Jest expect
   
   Save as src/components/ProductCard/ProductCard.test.tsx
   ```

2. **Show the test file** — highlight the mapping:
   ```typescript
   // Angular (before)
   const fixture = TestBed.createComponent(ProductCardComponent);
   fixture.componentInstance.product = mockProduct;
   fixture.detectChanges();
   expect(fixture.nativeElement.querySelector('.name').textContent)
     .toContain('Widget');
   
   // React (after)
   render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />);
   expect(screen.getByText('Widget')).toBeInTheDocument();
   ```

3. **Run the tests** to verify they pass

**Talking Point:** _"Test migration is the most tedious part of any framework switch. Copilot handles the mechanical translation — you just verify the assertions still make sense."_

---

## Key Takeaways to Reinforce

- **Analyze dependencies first** — migration order matters (leaf → root)
- **One component at a time** — incremental migration reduces risk
- **Concept mapping** — Angular and React have clear 1:1 equivalents for most patterns
- **Test migration alongside code** — don't defer tests to "later"
- **Agent mode verifies builds** — catches translation errors immediately
- This pattern works for **any framework migration**: Vue→React, jQuery→Vue, etc.
