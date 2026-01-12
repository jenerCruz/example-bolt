import React from "react";

type Item = {
  label: string;
  icon?: React.ReactNode;
  children?: Item[];
  onClick?: () => void;
};

type Props = {
  items: Item[];
};

export function NodeContextMenu({ items }: Props) {
  return (
    <div className="w-56 rounded-lg border bg-white shadow-xl">
      {items.map((item, i) => (
        <MenuItem key={i} item={item} />
      ))}
    </div>
  );
}

function MenuItem({ item }: { item: Item }) {
  return (
    <div className="group relative">
      <button
        onClick={item.onClick}
        className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-neutral-100"
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
        {item.children && <span>›</span>}
      </button>

      {/* SUBMENU */}
      {item.children && (
        <div className="absolute left-full top-0 hidden group-hover:block">
          <NodeContextMenu items={item.children} />
        </div>
      )}
    </div>
  );
}
