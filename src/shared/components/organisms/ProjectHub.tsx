'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import FadingFooterCarousel from '@shared/components/molecules/FadingFooterCarousel';

// Project card interface definition
interface ProjectCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
  status?: 'stable' | 'beta' | 'experimental' | 'coming-soon';
  stages?: Array<'Map' | 'Encode' | 'Navigate' | 'Test' | 'Amplify' | 'Learn'>;
}

// Research Tools Projects
const researchTools: ProjectCard[] = [
  {
    id: 'prompt-explorer',
    title: 'Prompt Explorer',
    description: 'Explore prompt mutations and task phrasing from dataset seeds',
    icon: '🧾',
    color: 'from-blue-600 to-blue-400',
    href: '/tools/prompt-explorer',
    status: 'stable',
    stages: ['Map', 'Encode']
  },
  {
    id: 'dataset-converter',
    title: 'Dataset Converter',
    description: 'One-click convert PDFs or tables into structured JSON for reasoning',
    icon: '📚',
    color: 'from-sky-600 to-sky-400',
    href: '/tools/dataset-converter',
    status: 'beta',
    stages: ['Map', 'Encode']
  },
  {
    id: 'mental-visualizer',
    title: 'MENTAL Visualizer',
    description: 'Interactive diagram viewer to explain MENTAL loops per project',
    icon: '🧠',
    color: 'from-indigo-600 to-indigo-400',
    href: '/tools/mental-visualizer',
    status: 'beta',
    stages: ['Map', 'Encode']
  }
];

// Agent Builder Projects
const agentBuilders: ProjectCard[] = [
  {
    id: 'mcp-playground',
    title: 'MCP Playground',
    description: 'Drag-and-drop cognition builder, spawn agents from presets',
    icon: '🧱',
    color: 'from-purple-600 to-purple-400',
    href: '/tools/mcp-playground',
    status: 'stable',
    stages: ['Navigate', 'Test']
  },
  {
    id: 'runcfai-trainer',
    title: 'RunCFAI Trainer',
    description: 'Trigger model fine-tuning workflows (e.g., QLoRA, LoftQ)',
    icon: '⚡',
    color: 'from-fuchsia-600 to-fuchsia-400',
    href: '/tools/runcfai-trainer',
    status: 'experimental',
    stages: ['Navigate', 'Test']
  },
  {
    id: 'tracecfai-evaluator',
    title: 'TraceCFAI Evaluator',
    description: 'See reasoning diffs and detect cognition plateaus',
    icon: '🔍',
    color: 'from-violet-600 to-violet-400',
    href: '/tools/tracecfai-evaluator',
    status: 'beta',
    stages: ['Navigate', 'Test']
  }
];

// Deployment Tools Projects
const deploymentTools: ProjectCard[] = [
  {
    id: 'deploy-agent-api',
    title: 'Deploy Agent to API',
    description: 'Expose CoT-backed agent logic as inference endpoint',
    icon: '🌐',
    color: 'from-emerald-600 to-emerald-400',
    href: '/tools/deploy-agent-api',
    status: 'beta',
    stages: ['Amplify', 'Learn']
  },
  {
    id: 'embed-anywhere',
    title: 'Embed Anywhere',
    description: 'Generate browser plugins, widgets, or iframe embeds for your agents',
    icon: '🧩',
    color: 'from-green-600 to-green-400',
    href: '/tools/embed-anywhere',
    status: 'experimental',
    stages: ['Amplify', 'Learn']
  },
  {
    id: 'results-page',
    title: 'Coreframe Results Page',
    description: 'View past training logs, model checkpoints, reasoning evaluations',
    icon: '📈',
    color: 'from-teal-600 to-teal-400',
    href: '/tools/results-page',
    status: 'coming-soon',
    stages: ['Amplify', 'Learn']
  }
];

// Additional Experimental Projects
const experimentalProjects: ProjectCard[] = [
  {
    id: 'loop-replay-viewer',
    title: 'Loop Replay Viewer',
    description: 'Watch reasoning sessions unfold in loop order',
    icon: '🔄',
    color: 'from-amber-600 to-amber-400',
    href: '/tools/loop-replay',
    status: 'experimental',
    stages: ['Map', 'Encode', 'Navigate', 'Test', 'Amplify', 'Learn']
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Track performance metrics for all your cognitive workflows',
    icon: '📊',
    color: 'from-orange-600 to-orange-400',
    href: '/tools/analytics',
    status: 'coming-soon',
    stages: ['Amplify', 'Learn']
  },
  {
    id: 'preset-loader',
    title: 'Preset Loader',
    description: 'Quick access to saved playground configurations',
    icon: '📥',
    color: 'from-rose-600 to-rose-400',
    href: '/tools/presets',
    status: 'coming-soon',
    stages: ['Map', 'Encode', 'Navigate', 'Test']
  }
];

// Project card component with HF-style hover effects
const ProjectCard: React.FC<{ project: ProjectCard }> = ({ project }) => {
  return (
    <Link href={project.href}>
      <motion.div
        whileHover={{ 
          scale: 1.03, 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-500 transition-all duration-200`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className={`text-2xl ${project.color.includes('from-') ? 'bg-gradient-to-r ' + project.color : ''} text-transparent bg-clip-text`}>
            {project.icon}
          </div>
          {project.status && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              project.status === 'stable' ? 'bg-green-900 text-green-200' :
              project.status === 'beta' ? 'bg-blue-900 text-blue-200' :
              project.status === 'experimental' ? 'bg-amber-900 text-amber-200' :
              'bg-gray-700 text-gray-300'
            }`}>
              {project.status}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-gray-300 mb-3">{project.description}</p>
        
        {project.stages && project.stages.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.stages.map(stage => (
              <span 
                key={stage} 
                className={`text-xs px-1.5 py-0.5 rounded ${
                  stage === 'Map' ? 'bg-blue-900/50 text-blue-200' :
                  stage === 'Encode' ? 'bg-indigo-900/50 text-indigo-200' :
                  stage === 'Navigate' ? 'bg-purple-900/50 text-purple-200' :
                  stage === 'Test' ? 'bg-violet-900/50 text-violet-200' :
                  stage === 'Amplify' ? 'bg-emerald-900/50 text-emerald-200' :
                  'bg-teal-900/50 text-teal-200' // Learn
                }`}
              >
                {stage}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default function ProjectHub() {
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');
  return (
    <section id="project-hub" className="min-h-screen py-24 bg-[#0c101a] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold font-mono">Coreframe Projects Hub</h2>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'cards' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setViewMode('cards')}
            >
              <span className="mr-1">📇</span> Cards
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'timeline' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setViewMode('timeline')}
            >
              <span className="mr-1">⏱️</span> Timeline
            </button>
          </div>
        </div>

        {/* Research Tools Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
              🔬
            </div>
            <h3 className="text-2xl font-bold text-blue-400">Research Tools</h3>
            <div className="ml-4 text-sm bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-300 px-2 py-1 rounded-md">
              Map + Encode
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchTools.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Agent Builders Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-3">
              🛠️
            </div>
            <h3 className="text-2xl font-bold text-purple-400">Agent Builders</h3>
            <div className="ml-4 text-sm bg-gradient-to-r from-purple-900 to-violet-900 text-purple-300 px-2 py-1 rounded-md">
              Navigate + Test
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agentBuilders.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Deployment Tools Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white mr-3">
              🚀
            </div>
            <h3 className="text-2xl font-bold text-emerald-400">Deployment Tools</h3>
            <div className="ml-4 text-sm bg-gradient-to-r from-emerald-900 to-teal-900 text-emerald-300 px-2 py-1 rounded-md">
              Amplify + Learn
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentTools.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Experimental Projects Section */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white mr-3">
              🧪
            </div>
            <h3 className="text-2xl font-bold text-amber-400">Experimental Projects</h3>
            <div className="ml-4 text-sm bg-red-900/50 text-yellow-300 px-2 py-1 rounded-md">
              UNSTABLE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experimentalProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Carousel */}
      <FadingFooterCarousel 
        id="project-hub-footer" 
        fadeDirection="down" 
        startFade={20} 
        endFade={0} 
      />
    </section>
  );
}
