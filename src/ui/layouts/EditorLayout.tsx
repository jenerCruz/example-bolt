import React, { useState } from "react";
import { Menu, X } from "lucide-react";

type EditorLayoutProps = {
  sidebar: React.ReactNode;
  inspector?: React.ReactNode;
  children: React.ReactNode;
};

export function EditorLayout({ sidebar, inspector, children }: EditorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 flex items-center justify-center rounded-lg bg-white p-2 shadow-lg md:hidden border border-neutral-200"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {sidebar}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>

      {inspector && (
        <>
          <aside
            className={`fixed inset-y-0 right-0 z-40 w-72 transform border-l bg-white transition-transform duration-300 md:static md:translate-x-0 ${
              inspectorOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col overflow-y-auto">
              {inspector}
            </div>
          </aside>

          {inspectorOpen && (
            <div
              className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
              onClick={() => setInspectorOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
