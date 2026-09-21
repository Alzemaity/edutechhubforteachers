import React from "react";
import { ExternalLink, Bot, Zap, Brain, Search } from "lucide-react";

const AI_AGENTS = [
  {
    id: "chatgpt-agent",
    name: "ChatGPT",
    url: "https://chat.openai.com/",
    description: "Most versatile AI agent for text, code, analysis, and lesson creation.",
    descriptionAr: "أكثر وكلاء الذكاء الاصطناعي تنوعًا للنصوص والكود والتحليل وإنشاء الدروس.",
    icon: <Bot className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "gemini-agent",
    name: "Google Gemini",
    url: "https://gemini.google.com/",
    description: "Google's multimodal AI agent for research, images, and documents.",
    descriptionAr: "وكيل جوجل متعدد الوسائط للبحث والصور والمستندات.",
    icon: <Brain className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "perplexity-agent",
    name: "Perplexity",
    url: "https://www.perplexity.ai/",
    description: "AI-powered search agent with real-time cited answers for research.",
    descriptionAr: "وكيل بحث ذكي مع إجابات موثقة في الوقت الفعلي للبحث.",
    icon: <Search className="w-6 h-6" />,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: "manus-agent",
    name: "Manus AI",
    url: "https://manus.im/",
    description: "Autonomous AI agent that completes complex multi-step tasks independently.",
    descriptionAr: "وكيل ذكاء اصطناعي مستقل يكمل المهام متعددة الخطوات المعقدة باستقلالية.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "notebooklm-agent",
    name: "NotebookLM",
    url: "https://notebooklm.google/",
    description: "Google's document AI agent — upload files and get intelligent answers.",
    descriptionAr: "وكيل مستندات جوجل الذكي — ارفع الملفات واحصل على إجابات ذكية.",
    icon: <Brain className="w-6 h-6" />,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "claude-agent",
    name: "Claude",
    url: "https://claude.com/",
    description: "Anthropic's AI agent known for long-form reasoning and document analysis.",
    descriptionAr: "وكيل Anthropic الذكي المعروف بالتفكير الطويل وتحليل المستندات.",
    icon: <Bot className="w-6 h-6" />,
    gradient: "from-amber-500 to-orange-600",
  },
];

const AIAgentsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          🤖 AI Agents
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powerful AI agents to supercharge your teaching
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {AI_AGENTS.map((agent) => (
          <a
            key={agent.id}
            href={agent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}
            >
              {agent.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {agent.name}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 transition-colors shrink-0" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {agent.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AIAgentsSection;
