'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

/* ================= TYPES ================= */

type TextSpan = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
};

type Block =
  | {
    id: string;
    type: 'heading';
    data: { level: 1 | 2 | 3; text: TextSpan[] };
  }
  | {
    id: string;
    type: 'paragraph';
    data: { text: TextSpan[] };
  }
  | {
    id: string;
    type: 'image';
    data: { url: string; caption?: TextSpan[] };
  };

/* ================= PAGE ================= */

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: uuid(),
      type: 'paragraph',
      data: { text: [{ text: '' }] },
    },
  ]);

  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  /* ================= HELPERS ================= */

  const updateBlock = (id: string, newBlock: Partial<Block>) => {
    setBlocks(b =>
      b.map(block => (block.id === id ? ({ ...block, ...newBlock } as Block) : block))
    );
  };

  const insertBlockAfter = (index: number, block: Block) => {
    const copy = [...blocks];
    copy.splice(index + 1, 0, block);
    setBlocks(copy);
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[820px] mx-auto px-6 py-16">
        {/* TITLE */}
        <input
          placeholder="Post title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full text-5xl font-extrabold outline-none mb-14 placeholder:text-gray-300"
        />

        {/* BLOCKS */}
        <div className="space-y-2">
          {blocks.map((block, index) => (
            <BlockRenderer
              key={block.id}
              block={block}
              index={index}
              setShowMenu={setShowMenu}
              setMenuIndex={setMenuIndex}
              updateBlock={updateBlock}
            />
          ))}
        </div>

        {/* COMMAND MENU */}
        {showMenu && menuIndex !== null && (
          <CommandMenu
            onSelect={type => {
              insertBlockAfter(menuIndex, createBlock(type));
              setShowMenu(false);
            }}
          />
        )}

        {/* DEBUG OUTPUT */}
        <pre className="mt-16 text-xs bg-gray-50 p-4 rounded-xl overflow-x-auto">
          {JSON.stringify({ title, blocks }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

/* ================= BLOCK RENDERER ================= */

function BlockRenderer({
  block,
  index,
  updateBlock,
  setShowMenu,
  setMenuIndex,
}: any) {
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: any) => {
    if (e.key === '/' && block.type === 'paragraph') {
      setShowMenu(true);
      setMenuIndex(index);
    }
  };

  if (block.type === 'heading') {
    const Tag = `h${block.data.level}` as any;
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        className="outline-none font-bold text-gray-900"
        style={{
          fontSize:
            block.data.level === 1
              ? '2.5rem'
              : block.data.level === 2
                ? '2rem'
                : '1.6rem',
        }}
        onInput={(e: React.FormEvent<HTMLElement>) =>
          updateBlock(block.id, {
            data: { ...block.data, text: [{ text: e.currentTarget.textContent || '' }] },
          })
        }
      >
        {block.data.text.map((t: any) => t.text).join('')}
      </Tag>
    );
  }

  if (block.type === 'paragraph') {
    return (
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={onKeyDown}
        className="outline-none text-lg leading-8 text-gray-800 min-h-[28px]"
        onInput={(e: React.FormEvent<HTMLDivElement>) =>
          updateBlock(block.id, {
            data: { text: [{ text: e.currentTarget.textContent || '' }] },
          })
        }
      >
        {block.data.text.map((t: any) => t.text).join('')}
      </div>
    );
  }

  if (block.type === 'image') {
    return (
      <figure className="space-y-2">
        <img
          src={block.data.url}
          className="rounded-2xl max-h-[480px] mx-auto"
        />
        <figcaption
          contentEditable
          suppressContentEditableWarning
          className="text-center text-sm text-gray-500 outline-none"
          onInput={(e: React.FormEvent<HTMLElement>) =>
            updateBlock(block.id, {
              data: {
                ...block.data,
                caption: [{ text: e.currentTarget.textContent || '' }],
              },
            })
          }
        >
          {block.data.caption?.map((c: TextSpan) => c.text).join('')}
        </figcaption>
      </figure>
    );
  }

  return null;
}

/* ================= COMMAND MENU ================= */

function CommandMenu({ onSelect }: { onSelect: (type: any) => void }) {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-xl w-64 p-2 space-y-1 z-50">
      <MenuItem label="Heading 1" onClick={() => onSelect('h1')} />
      <MenuItem label="Heading 2" onClick={() => onSelect('h2')} />
      <MenuItem label="Text" onClick={() => onSelect('p')} />
      <MenuItem label="Image" onClick={() => onSelect('image')} />
    </div>
  );
}

function MenuItem({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
    >
      {label}
    </button>
  );
}

/* ================= FACTORY ================= */

function createBlock(type: 'h1' | 'h2' | 'p' | 'image'): Block {
  if (type === 'h1')
    return {
      id: uuid(),
      type: 'heading',
      data: { level: 1, text: [{ text: 'Heading' }] },
    };

  if (type === 'h2')
    return {
      id: uuid(),
      type: 'heading',
      data: { level: 2, text: [{ text: 'Heading' }] },
    };

  if (type === 'image')
    return {
      id: uuid(),
      type: 'image',
      data: {
        url: 'https://placehold.co/800x400',
        caption: [{ text: 'Image caption' }],
      },
    };

  return {
    id: uuid(),
    type: 'paragraph',
    data: { text: [{ text: '' }] },
  };
}
