'use client';

import { useState, useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableBlock } from './SortableBlock';
import { SlashMenu } from './SlashMenu';
import { Toolbar } from './Toolbar';
import { AnimatePresence } from 'framer-motion';

export default function BlockEditor({ blocks = [], onChange }: { blocks: any[]; onChange: (blocks: any[]) => void }) {
    const [slashMenu, setSlashMenu] = useState<{ open: boolean; pos: { top: number; left: number }; blockId: string | null }>({
        open: false,
        pos: { top: 0, left: 0 },
        blockId: null
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);
            onChange(arrayMove(blocks, oldIndex, newIndex));
        }
    };

    const addBlock = useCallback((type: string, afterId?: string) => {
        const id = `b-${Math.random().toString(36).substr(2, 9)}`;
        let newBlock: any;

        if (type.startsWith('heading')) {
            newBlock = {
                id,
                type: 'heading',
                data: { text: '' },
                style: { level: type === 'heading-2' ? 2 : 1, color: '#1f2937' }
            };
        } else if (type === 'image') {
            newBlock = {
                id,
                type: 'image',
                data: { url: '', caption: '' },
                style: { width: '100%', borderRadius: '12px' }
            };
        } else if (type === 'video') {
            newBlock = {
                id,
                type: 'video',
                data: { url: '', caption: '' },
                style: { width: '100%', borderRadius: '12px' }
            };
        } else {
            newBlock = {
                id,
                type: 'paragraph',
                data: { text: [{ text: '' }] },
                style: { fontSize: '16px', lineHeight: '1.7' }
            };
        }

        if (afterId) {
            const index = blocks.findIndex(b => b.id === afterId);
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, newBlock);
            onChange(newBlocks);
        } else {
            onChange([...blocks, newBlock]);
        }

        setSlashMenu({ open: false, pos: { top: 0, left: 0 }, blockId: null });
    }, [blocks, onChange]);

    const updateBlock = (id: string, data: any, style: any) => {
        onChange(blocks.map(b => b.id === id ? { ...b, data, style } : b));
    };

    const removeBlock = (id: string) => {
        if (blocks.length <= 1) {
            // Reset last block instead of deleting if it's the only one
            updateBlock(id, { text: [{ text: '' }] }, { fontSize: '16px', lineHeight: '1.7' });
            return;
        }
        onChange(blocks.filter(b => b.id !== id));
    };

    return (
        <div className="relative min-h-[400px]">
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
                                onEnter={() => addBlock('paragraph', block.id)}
                                triggerSlash={(pos: any) => setSlashMenu({ open: true, pos, blockId: block.id })}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {blocks.length === 0 && (
                <div
                    className="py-10 text-slate-300 cursor-text"
                    onClick={() => addBlock('paragraph')}
                >
                    Click to start writing...
                </div>
            )}

            <AnimatePresence>
                {slashMenu.open && (
                    <SlashMenu
                        position={slashMenu.pos}
                        onClose={() => setSlashMenu({ ...slashMenu, open: false })}
                        onSelect={(type) => {
                            if (slashMenu.blockId) {
                                // If we trigger slash in an empty paragraph, we might want to replace it
                                // but for now let's just add after.
                                addBlock(type, slashMenu.blockId);
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
