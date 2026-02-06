'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableBlock } from './SortableBlock';
import { Plus, Type, Image as ImageIcon, Quote as QuoteIcon, Hash } from 'lucide-react';

export default function BlockEditor({ blocks = [], onChange }: { blocks: any[]; onChange: (blocks: any[]) => void }) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);
            onChange(arrayMove(blocks, oldIndex, newIndex));
        }
    };

    const addBlock = (type: string) => {
        const newBlock = {
            id: crypto.randomUUID(),
            type,
            props: type === 'image' ? { url: '' } : { text: '' },
        };
        onChange([...blocks, newBlock]);
    };

    const updateBlock = (id: string, newProps: any) => {
        onChange(blocks.map(b => b.id === id ? { ...b, props: newProps } : b));
    };

    const removeBlock = (id: string) => {
        onChange(blocks.filter(b => b.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex gap-2 p-2 bg-slate-100 rounded-lg justify-center sticky top-20 z-10 w-fit mx-auto shadow-sm">
                <button onClick={() => addBlock('heading')} className="p-2 hover:bg-white rounded text-slate-600 tooltip" title="Heading">
                    <Hash size={20} />
                </button>
                <button onClick={() => addBlock('paragraph')} className="p-2 hover:bg-white rounded text-slate-600" title="Paragraph">
                    <Type size={20} />
                </button>
                <button onClick={() => addBlock('quote')} className="p-2 hover:bg-white rounded text-slate-600" title="Quote">
                    <QuoteIcon size={20} />
                </button>
                <button onClick={() => addBlock('image')} className="p-2 hover:bg-white rounded text-slate-600" title="Image">
                    <ImageIcon size={20} />
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={blocks.map(b => b.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {blocks.map((block) => (
                            <SortableBlock
                                key={block.id}
                                id={block.id}
                                block={block}
                                updateBlock={updateBlock}
                                removeBlock={removeBlock}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {blocks.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-slate-400">Start by adding a block from the toolbar above.</p>
                </div>
            )}
        </div>
    );
}
