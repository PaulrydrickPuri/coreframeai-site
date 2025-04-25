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
  // Additional fields for Timeline view
  dateCreated?: string;
  loopNumber?: number;
  summary?: string;
  actions?: Array<'view' | 'replay' | 'deploy'>;
  deltaChange?: string;
}

// Helper function to get all stages between two stages in the MENTAL loop
const getStagesBetween = (start: string, end: string): Array<'Map' | 'Encode' | 'Navigate' | 'Test' | 'Amplify' | 'Learn'> => {
  const allStages: Array<'Map' | 'Encode' | 'Navigate' | 'Test' | 'Amplify' | 'Learn'> = [
    'Map', 'Encode', 'Navigate', 'Test', 'Amplify', 'Learn'
  ];
  
  const startIndex = allStages.indexOf(start as any);
  const endIndex = allStages.indexOf(end as any);
  
  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    return [];
  }
  
  return allStages.slice(startIndex, endIndex + 1) as Array<'Map' | 'Encode' | 'Navigate' | 'Test' | 'Amplify' | 'Learn'>;
};

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
    stages: ['Map', 'Encode'],
    dateCreated: 'March 15, 2025',
    loopNumber: 4,
    summary: 'Created prompt templates for tax relief classification. Added 3 mutation patterns.',
    actions: ['view', 'replay'],
    deltaChange: '2.7 → 1.9'
  },
  {
    id: 'dataset-converter',
    title: 'Dataset Converter',
    description: 'One-click convert PDFs or tables into structured JSON for reasoning',
    icon: '📚',
    color: 'from-sky-600 to-sky-400',
    href: '/tools/dataset-converter',
    status: 'beta',
    stages: ['Map', 'Encode'],
    dateCreated: 'March 23, 2025',
    loopNumber: 8,
    summary: 'Converted Malaysian tax receipt dataset to JSONL. Generated schema with automatic field detection.',
    actions: ['view', 'replay'],
    deltaChange: '3.9 → 2.1'
  },
  {
    id: 'mental-visualizer',
    title: 'MENTAL Visualizer',
    description: 'Interactive diagram viewer to explain MENTAL loops per project',
    icon: '🧠',
    color: 'from-indigo-600 to-indigo-400',
    href: '/tools/mental-visualizer',
    status: 'beta',
    stages: ['Map', 'Encode'],
    dateCreated: 'April 2, 2025',
    loopNumber: 11,
    summary: 'Created diagram for TaxSnapAI cognitive flow. Added stage dependency visualization.',
    actions: ['view'],
    deltaChange: undefined
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
    stages: ['Navigate', 'Test'],
    dateCreated: 'April 8, 2025',
    loopNumber: 13,
    summary: 'Built tax relief agent flow with MapBlock → PromptBlock → DatasetBlock chain.',
    actions: ['view', 'replay'],
    deltaChange: '3.2 → 2.5'
  },
  {
    id: 'runcfai-trainer',
    title: 'RunCFAI Trainer',
    description: 'Trigger model fine-tuning workflows (e.g., QLoRA, LoftQ)',
    icon: '⚡',
    color: 'from-fuchsia-600 to-fuchsia-400',
    href: '/tools/runcfai-trainer',
    status: 'experimental',
    stages: ['Navigate', 'Test'],
    dateCreated: 'April 12, 2025',
    loopNumber: 15,
    summary: 'Ran QLoRA fine-tuning on Mistral-7B with tax classification dataset. 3 epochs, 128 sequence length.',
    actions: ['view', 'replay'],
    deltaChange: '2.5 → 1.8'
  },
  {
    id: 'tracecfai-evaluator',
    title: 'TraceCFAI Evaluator',
    description: 'See reasoning diffs and detect cognition plateaus',
    icon: '🔍',
    color: 'from-violet-600 to-violet-400',
    href: '/tools/tracecfai-evaluator',
    status: 'beta',
    stages: ['Navigate', 'Test'],
    dateCreated: 'April 15, 2025',
    loopNumber: 16,
    summary: 'Analyzed tax model performance. Found 3 reasoning plateaus in education-based reliefs.',
    actions: ['view', 'replay'],
    deltaChange: '1.8 → 1.5'
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
    stages: ['Amplify', 'Learn'],
    dateCreated: 'April 20, 2025',
    loopNumber: 17,
    summary: 'Deployed TaxSnapAI to CoreframeAPI endpoint. Added rate limiting and telemetry.',
    actions: ['view', 'deploy'],
    deltaChange: '1.5 → 1.3'
  },
  {
    id: 'embed-anywhere',
    title: 'Embed Anywhere',
    description: 'Generate browser plugins, widgets, or iframe embeds for your agents',
    icon: '🧩',
    color: 'from-green-600 to-green-400',
    href: '/tools/embed-anywhere',
    status: 'experimental',
    stages: ['Amplify', 'Learn'],
    dateCreated: 'April 22, 2025',
    loopNumber: 18,
    summary: 'Created Chrome extension for TaxSnapAI. Added receipt scanning webhook.',
    actions: ['view', 'deploy'],
    deltaChange: '1.3 → 1.1'
  },
  {
    id: 'results-page',
    title: 'Coreframe Results Page',
    description: 'View past training logs, model checkpoints, reasoning evaluations',
    icon: '📈',
    color: 'from-teal-600 to-teal-400',
    href: '/tools/results-page',
    status: 'coming-soon',
    stages: ['Amplify', 'Learn'],
    dateCreated: 'April 24, 2025',
    loopNumber: 19,
    summary: 'Setup aggregate dashboard of all TaxSnapAI training runs and performance.',
    actions: ['view'],
    deltaChange: undefined
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
    stages: ['Map', 'Encode', 'Navigate', 'Test', 'Amplify', 'Learn'],
    dateCreated: 'April 18, 2025',
    loopNumber: 16,
    summary: 'Created step-by-step replay of full TaxSnapAI cognition process, from mapping to deployment.',
    actions: ['view', 'replay'],
    deltaChange: undefined
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

// Timeline entry component for Timeline view mode
const TimelineEntry: React.FC<{ project: ProjectCard, index: number }> = ({ project, index }) => {
  // Determine the loop progression color based on stages
  const getLoopColor = (stage: string) => {
    switch (stage) {
      case 'Map': return 'bg-blue-600';
      case 'Encode': return 'bg-indigo-600';
      case 'Navigate': return 'bg-purple-600';
      case 'Test': return 'bg-violet-600';
      case 'Amplify': return 'bg-emerald-600';
      case 'Learn': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  // Determine button style based on action type
  const getActionButtonStyle = (action: string) => {
    switch (action) {
      case 'view': return 'bg-gray-700 hover:bg-gray-600';
      case 'replay': return 'bg-blue-700 hover:bg-blue-600';
      case 'deploy': return 'bg-emerald-700 hover:bg-emerald-600';
      default: return 'bg-gray-700 hover:bg-gray-600';
    }
  };

  // Determine button icon based on action type
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return '🔗';
      case 'replay': return '🧪';
      case 'deploy': return '📤';
      default: return '⚙️';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative bg-gray-800 rounded-lg p-6 border-l-4 border-l-blue-500 mb-6 hover:bg-gray-750 transition-colors"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-1 -ml-[2px] bg-gradient-to-b from-blue-500 to-emerald-500"></div>
      
      {/* Date and Loop Number */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">📅</span>
          <span className="text-lg font-medium text-gray-300">{project.dateCreated}</span>
          <span className="ml-3 px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300">Loop #{project.loopNumber}</span>
        </div>
        <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 px-3 py-1 rounded-full">
          <span className="text-gray-300 text-sm font-medium">{project.title}</span>
        </div>
      </div>
      
      {/* Loop Stage Visualization */}
      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-2">🔁 Loop Progression:</div>
        <div className="flex items-center space-x-1">
          {['Map', 'Encode', 'Navigate', 'Test', 'Amplify', 'Learn'].map((stage, i) => {
            const isActive = project.stages?.includes(stage as any);
            return (
              <div key={stage} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? getLoopColor(stage) : 'bg-gray-700'} text-xs`}>
                  {stage.charAt(0)}
                </div>
                {i < 5 && (
                  <div className={`w-3 h-0.5 ${isActive && project.stages?.includes(['Map', 'Encode', 'Navigate', 'Test', 'Amplify', 'Learn'][i+1] as any) ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-1">📝 Summary:</div>
        <p className="text-gray-300">{project.summary}</p>
      </div>
      
      {/* Delta Change and Actions */}
      <div className="flex items-center justify-between">
        {project.deltaChange ? (
          <div className="bg-gray-900 rounded-md px-3 py-1.5">
            <span className="text-sm text-gray-400 mr-2">Δ Delta:</span>
            <span className="text-green-400 font-mono">{project.deltaChange}</span>
          </div>
        ) : (
          <div></div>
        )}
        
        <div className="flex space-x-2">
          {project.actions?.map(action => (
            <Link href={project.href} key={action}>
              <button className={`${getActionButtonStyle(action)} text-white px-3 py-1.5 rounded text-sm flex items-center`}>
                <span className="mr-1.5">{getActionIcon(action)}</span>
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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

// Get all projects in a flat array, sorted by loopNumber for timeline view
const getAllProjectsChronological = (): ProjectCard[] => {
  // Combine all projects and sort by loop number
  return [...researchTools, ...agentBuilders, ...deploymentTools, ...experimentalProjects]
    .sort((a, b) => (a.loopNumber || 0) - (b.loopNumber || 0));
};

export default function ProjectHub() {
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');
  
  // Get all projects for timeline view
  const timelineProjects = getAllProjectsChronological();
  
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
        
        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center text-white mr-3">
                🧠
              </div>
              <h3 className="text-2xl font-bold">Cognitive Evolution Timeline</h3>
              <div className="ml-4 text-sm bg-gradient-to-r from-blue-900 to-emerald-900 text-gray-300 px-2 py-1 rounded-md">
                Map → Encode → Navigate → Test → Amplify → Learn
              </div>
            </div>
            
            {/* Timeline entries */}
            <div className="pl-4 border-l border-blue-900 ml-4">
              {timelineProjects.map((project, index) => (
                <TimelineEntry key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Cards View - Research Tools Section */}
        {viewMode === 'cards' && <div className="mb-16">
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
        </div>}

        {/* Agent Builders Section */}
        {viewMode === 'cards' && <div className="mb-16">
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
        </div>}

        {/* Deployment Tools Section */}
        {viewMode === 'cards' && <div className="mb-16">
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
        </div>}

        {/* Experimental Projects Section */}
        {viewMode === 'cards' && <div>
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
        </div>}
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
