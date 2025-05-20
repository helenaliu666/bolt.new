import { useState } from 'react';
import { scaffoldTemplate, templates } from '~/lib/templates';

export function StarterKitSelector() {
  const [loading, setLoading] = useState<string | null>(null);

  const templateNames = Object.keys(templates) as Array<keyof typeof templates>;

  return (
    <div className="flex flex-col space-y-2">
      {templateNames.map((name) => (
        <button
          key={name}
          disabled={!!loading}
          className="group flex items-center w-full gap-2 justify-center bg-transparent text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary transition-theme"
          onClick={async () => {
            setLoading(name);
            try {
              await scaffoldTemplate(name);
            } finally {
              setLoading(null);
            }
          }}
        >
          <div className={`i-logos:${name} text-xl`} />
          {loading === name ? 'Scaffolding...' : `Start ${name}`}
        </button>
      ))}
    </div>
  );
}
