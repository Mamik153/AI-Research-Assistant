/**
 * KiboUIExamples Component
 * Demonstrates the usage of kibo-ui components (Table, Tags, CodeBlock, Tree)
 */

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Example imports for kibo-ui components
// Uncomment these when you're ready to use them:
// import { CodeBlock } from '@/components/kibo-ui/code-block';
// import { Tags } from '@/components/kibo-ui/tags';
// import { Table, type ColumnDef } from '@/components/kibo-ui/table';
// import { Tree } from '@/components/kibo-ui/tree';

export const KiboUIExamples = () => {
    // Example state for tags - can be used when implementing Tags component
    // const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <div className="space-y-8 p-6">
            <h1 className="text-3xl font-bold text-gray-100">Kibo-UI Components Examples</h1>

            {/* Tags Example */}
            <Card className="bg-gray-900/40 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100">Tags Component</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-400 mb-4">
                        Tag input for categorizing research topics.
                    </p>
                    {/* Example Tags usage:
                    <Tags
                        value={selectedTags}
                        onValueChange={setSelectedTags}
                        placeholder="Add tags..."
                    >
                        <TagsList>
                            <TagsItem value="machine-learning">Machine Learning</TagsItem>
                            <TagsItem value="ai">AI</TagsItem>
                            <TagsItem value="deep-learning">Deep Learning</TagsItem>
                            <TagsItem value="nlp">NLP</TagsItem>
                        </TagsList>
                    </Tags>
                    */}
                    <div className="text-sm text-gray-500">
                        Component available at: @/components/kibo-ui/tags
                    </div>
                </CardContent>
            </Card>

            <Separator className="bg-gray-700" />

            {/* CodeBlock Example */}
            <Card className="bg-gray-900/40 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100">Code Block Component</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-400 mb-4">
                        Syntax-highlighted code examples with copy functionality.
                    </p>
                    {/* Example CodeBlock usage:
                    <CodeBlock
                        language="typescript"
                        filename="example.ts"
                        code={`
function fetchData(endpoint: string) {
  return fetch(endpoint)
    .then(response => response.json())
    .catch(error => console.error(error));
}
                        `}
                    />
                    */}
                </CardContent>
            </Card>

            <Separator className="bg-gray-700" />

            {/* Table Example */}
            <Card className="bg-gray-900/40 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100">Table Component</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-400 mb-4">
                        Sortable data table for displaying research papers or structured data.
                    </p>
                    {/* Example Table usage:
                    const columns: ColumnDef<ResearchPaper>[] = [
                        {
                            accessorKey: 'title',
                            header: 'Title',
                        },
                        {
                            accessorKey: 'authors',
                            header: 'Authors',
                            cell: ({ row }) => row.original.authors.join(', '),
                        },
                        {
                            accessorKey: 'published',
                            header: 'Published',
                        },
                    ];

                    <Table data={papers} columns={columns} />
                    */}
                </CardContent>
            </Card>

            <Separator className="bg-gray-700" />

            {/* Tree Example */}
            <Card className="bg-gray-900/40 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100">Tree Component</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-400 mb-4">
                        Hierarchical tree view for concept relationships.
                    </p>
                    {/* Example Tree usage:
                    const treeData = [
                        {
                            id: '1',
                            label: 'Machine Learning',
                            children: [
                                {
                                    id: '1-1',
                                    label: 'Supervised Learning',
                                    children: [
                                        { id: '1-1-1', label: 'Classification' },
                                        { id: '1-1-2', label: 'Regression' },
                                    ],
                                },
                                {
                                    id: '1-2',
                                    label: 'Unsupervised Learning',
                                    children: [
                                        { id: '1-2-1', label: 'Clustering' },
                                        { id: '1-2-2', label: 'Dimensionality Reduction' },
                                    ],
                                },
                            ],
                        },
                    ];

                    <Tree data={treeData} />
                    */}
                </CardContent>
            </Card>
        </div>
    );
};
