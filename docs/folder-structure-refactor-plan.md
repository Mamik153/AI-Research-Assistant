# Feature-Based Folder Structure Refactor

## Current Issues

The current structure mixes all components in a flat `/components` folder with 30+ files, making it hard to understand domains and causing tight coupling between unrelated features.

## Proposed Architecture

### Feature Domains Identified

Based on codebase analysis, the app has these distinct features:

1. **Research** - Core research submission and job management
2. **Chat** - Chat interface for research interaction
3. **Results** - Research result display with multiple visualization types
4. **Papers** - Academic paper display and management
5. **Diagrams** - Mermaid diagram visualization
6. **PDF Export** - PDF generation functionality

### New Folder Structure

```
src/
├── features/
│   ├── research/
│   │   ├── components/
│   │   │   ├── ResearchForm.tsx
│   │   │   ├── ResearchForm.css
│   │   │   ├── AIInputComponent.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useResearchJob.ts
│   │   │   ├── useResearch.ts
│   │   │   └── useSearchSuggestions.ts
│   │   ├── services/
│   │   │   └── researchApi.ts
│   │   ├── types/
│   │   │   └── research.types.ts
│   │   └── index.ts
│   │
│   ├── chat/
│   │   ├── components/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── chat.types.ts
│   │   └── index.ts
│   │
│   ├── results/
│   │   ├── components/
│   │   │   ├── DynamicResearchResult.tsx
│   │   │   ├── MarkdownResearchResult.tsx
│   │   │   ├── ResearchResult.tsx
│   │   │   ├── ResearchResult.css
│   │   │   ├── ResearchHero.tsx
│   │   │   ├── ResearchSummary.tsx
│   │   │   ├── KeyInsights.tsx
│   │   │   ├── StructuredSectionsGrid.tsx
│   │   │   ├── OverviewCard.tsx
│   │   │   ├── StatisticsCards.tsx
│   │   │   ├── ApplicationsSection.tsx
│   │   │   ├── BenefitsRisksDisplay.tsx
│   │   │   ├── FutureDirectionsSection.tsx
│   │   │   ├── MethodologiesSection.tsx
│   │   │   ├── TimelineVertical.tsx
│   │   │   ├── ComparisonRadarChart.tsx
│   │   │   ├── KeyConceptsNetwork.tsx
│   │   │   ├── FlashCards.tsx
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── parseSummary.ts
│   │   ├── types/
│   │   │   └── result.types.ts
│   │   └── index.ts
│   │
│   ├── papers/
│   │   ├── components/
│   │   │   ├── PapersGrid.tsx
│   │   │   ├── PaperCard.tsx
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── paper.types.ts
│   │   └── index.ts
│   │
│   ├── diagrams/
│   │   ├── components/
│   │   │   ├── DiagramViewer.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── export/
│       ├── components/
│       │   ├── PDFReport.tsx
│       │   └── index.ts
│       ├── utils/
│       │   └── generatePDF.ts
│       └── index.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── index.ts
│   │   ├── icons/
│   │   │   ├── ArrowUpIcon.tsx
│   │   │   ├── MicrophoneIcon.tsx
│   │   │   └── index.ts
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorBoundary.css
│   │   ├── LoadingAnimation.tsx
│   │   ├── AbstractModal.tsx
│   │   ├── ResearchResponseData.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── types/
│   │   ├── common.types.ts
│   │   └── index.ts
│   └── services/
│       ├── geminiService.ts
│       └── index.ts
│
├── core/
│   ├── config/
│   │   ├── api.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── theme.ts
│   │   └── index.ts
│   └── lib/
│       ├── utils.ts
│       └── index.ts
│
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

## Key Architectural Principles

### 1. Feature Slicing
- Each feature contains its own components, hooks, services, types, and utils
- Features are self-contained and loosely coupled
- Easy to understand what belongs to each domain

### 2. Shared vs Feature Code
- **Shared**: Truly reusable components (UI library, icons, error boundaries)
- **Feature**: Domain-specific code stays within feature boundaries
- Prevents feature logic leaking into global scope

### 3. Type Organization
- Types split by feature domain to reduce coupling
- Common types (LayoutMode, AppView) in `shared/types/common.types.ts`
- Feature-specific types in feature folders

### 4. Clean Exports
- Each folder has an `index.ts` for clean public API
- Import from feature root: `import { ResearchForm } from '@/features/research'`
- Prevents deep import paths

### 5. Colocation
- Related CSS files stay next to components
- Utils stay close to features that use them
- Reduces cognitive load when navigating

## Migration Strategy

### Phase 1: Create New Structure
1. Create `features/` and `shared/` directories
2. Create all feature subdirectories with `index.ts` files

### Phase 2: Move Research Feature
1. Move research-related components, hooks, services
2. Update imports within research feature
3. Export from `features/research/index.ts`

### Phase 3: Move Chat Feature
1. Move chat components
2. Extract chat-specific types
3. Update imports

### Phase 4: Move Results Feature
1. Move all result display components (largest migration)
2. Move `parseSummary` utility
3. Update imports

### Phase 5: Move Remaining Features
1. Papers feature
2. Diagrams feature
3. Export/PDF feature

### Phase 6: Organize Shared Code
1. Move UI components to `shared/components/ui/`
2. Move icons to `shared/components/icons/`
3. Move cross-cutting components (ErrorBoundary, LoadingAnimation)
4. Move geminiService to `shared/services/`

### Phase 7: Update Root Files
1. Update all imports in `App.tsx`
2. Update imports in `main.tsx`
3. Remove old `/components`, `/hooks`, `/services`, `/utils` folders
4. Verify no broken imports

### Phase 8: Path Aliases (Optional Enhancement)
Configure TypeScript path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"],
      "@/core/*": ["src/core/*"]
    }
  }
}
```

## Benefits

1. **Scalability**: Easy to add new features without polluting existing code
2. **Maintainability**: Clear boundaries make changes safer
3. **Discoverability**: New developers can understand domains quickly
4. **Testing**: Feature isolation makes unit testing easier
5. **Code Splitting**: Future code-splitting by feature becomes trivial
6. **Reduced Coupling**: Features don't accidentally depend on each other

## File Movement Summary

- **30+ components** reorganized into 6 features + shared
- **3 hooks** moved to research feature
- **2 services** split between research and shared
- **1 large types file** split into feature-specific type files
- **2 utils** moved to their respective features

## Import Example Changes

**Before:**
```typescript
import { ResearchForm } from './components/ResearchForm'
import { ChatContainer } from './components/ChatContainer'
import { useResearchJob } from './hooks/useResearchJob'
```

**After:**
```typescript
import { ResearchForm, useResearchJob } from '@/features/research'
import { ChatContainer } from '@/features/chat'
```

## Implementation Checklist

- [ ] Create new feature-based folder structure with all subdirectories
- [ ] Move research feature (components, hooks, services, types)
- [ ] Move chat feature components and types
- [ ] Move results feature with all visualization components
- [ ] Move papers, diagrams, and export features
- [ ] Move shared components (UI, icons, error boundaries) and services
- [ ] Update all imports in App.tsx and other root files
- [ ] Remove old component, hooks, services folders after verification
- [ ] Add TypeScript path aliases for cleaner imports (optional)
- [ ] Test application thoroughly to ensure no broken imports
- [ ] Update documentation to reflect new structure
