'use client';

import { Brain, Wrench, Rocket } from 'lucide-react';

const features = [
    {
        icon: <Brain size={32} />,
        title: 'Research',
        desc: 'Map reasoning, generate prompts, extract logic',
    },
    {
        icon: <Wrench size={32} />,
        title: 'Prototype',
        desc: 'Drag, test, and train CoT-based workflows visually',
    },
    {
        icon: <Rocket size={32} />,
        title: 'Deploy',
        desc: 'Turn agents into live cognitive apps fast',
    },
];

export default function FeatureColumns() {
    return (

        <section className="bg-[#0f172a] border-t border-zinc-800 text-white py-16 px-4">

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                {features.map(({ icon, title, desc }) => (
                    <div
                        key={title}
                        className="flex flex-col items-center justify-center space-y-4 p-6 border border-zinc-800 rounded-lg hover:border-cyan-400 transition-all"
                    >
                        <div className="text-cyan-400">{icon}</div>
                        <h3 className="text-xl font-semibold font-mono">{title}</h3>
                        <p className="text-zinc-400 text-sm max-w-xs">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
