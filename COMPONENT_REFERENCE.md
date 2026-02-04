# Quick Reference: Using Shadcn & Kibo-UI Components

## Shadcn Components

### Button
```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// As link
<Button asChild>
  <a href="/docs">Go to docs</a>
</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button onClick={handleClose}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Badge
```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
</Tabs>
```

### ScrollArea
```tsx
import { ScrollArea } from '@/components/ui/scroll-area';

<ScrollArea className="h-[400px] w-full">
  <div className="p-4">
    {/* Scrollable content */}
  </div>
</ScrollArea>
```

### Separator
```tsx
import { Separator } from '@/components/ui/separator';

<div>
  <p>Above</p>
  <Separator className="my-4" />
  <p>Below</p>
</div>

{/* Vertical */}
<div className="flex">
  <p>Left</p>
  <Separator orientation="vertical" className="mx-4" />
  <p>Right</p>
</div>
```

### Skeleton
```tsx
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

## Kibo-UI Components

### CodeBlock
```tsx
import { CodeBlock } from '@/components/kibo-ui/code-block';

<CodeBlock
  language="typescript"
  filename="example.ts"
  code={`
function hello(name: string) {
  console.log(\`Hello, \${name}!\`);
}
  `}
/>
```

### Tags
```tsx
import { Tags, TagsList, TagsItem } from '@/components/kibo-ui/tags';

const [selectedTags, setSelectedTags] = useState<string[]>([]);

<Tags value={selectedTags} onValueChange={setSelectedTags}>
  <TagsList>
    <TagsItem value="react">React</TagsItem>
    <TagsItem value="typescript">TypeScript</TagsItem>
    <TagsItem value="vite">Vite</TagsItem>
  </TagsList>
</Tags>
```

### Table
```tsx
import { Table, type ColumnDef } from '@/components/kibo-ui/table';

interface Person {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

const data: Person[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

<Table data={data} columns={columns} />
```

### Tree
```tsx
import { Tree } from '@/components/kibo-ui/tree';

const treeData = [
  {
    id: '1',
    label: 'Root',
    children: [
      {
        id: '1-1',
        label: 'Child 1',
        children: [
          { id: '1-1-1', label: 'Grandchild 1' },
          { id: '1-1-2', label: 'Grandchild 2' },
        ],
      },
      { id: '1-2', label: 'Child 2' },
    ],
  },
];

<Tree data={treeData} />
```

## Styling Tips

### Using with Tailwind
All components accept `className` prop for custom styling:

```tsx
<Button className="bg-blue-600 hover:bg-blue-700">
  Custom Button
</Button>

<Card className="bg-gray-900 border-gray-700">
  Dark Card
</Card>
```

### Dark Mode Classes
```tsx
<div className="text-gray-900 dark:text-gray-100">
  Adapts to theme
</div>
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

## Common Patterns

### Loading State
```tsx
{isLoading ? (
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
) : (
  <div>Actual content</div>
)}
```

### Modal with Form
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Item</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      {/* Form fields */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmit}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Tabbed Content with Cards
```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        Overview content
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="details">
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        Details content
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
```

## Resources

- [Shadcn Documentation](https://ui.shadcn.com)
- [Kibo UI Documentation](https://www.kibo-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- Components are located in:
  - `src/components/ui/` (shadcn)
  - `src/components/kibo-ui/` (kibo-ui)
