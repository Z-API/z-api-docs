import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DiagramToggle.module.css';

interface DiagramToggleProps {
  mermaidContent: React.ReactNode;
  interactiveContent: React.ReactNode;
  defaultTab?: 'mermaid' | 'interactive';
}

export function DiagramToggle({
  mermaidContent,
  interactiveContent,
  defaultTab = 'mermaid',
}: DiagramToggleProps) {
  const [activeTab, setActiveTab] = useState<'mermaid' | 'interactive'>(defaultTab);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tab: 'mermaid' | 'interactive') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveTab(activeTab === 'mermaid' ? 'interactive' : 'mermaid');
    }
  };

  return (
    <div className={styles.container} role="tablist" aria-label="Seletor de tipo de diagrama">
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'mermaid' ? styles.active : ''}`}
          onClick={() => setActiveTab('mermaid')}
          onKeyDown={(e) => handleKeyDown(e, 'mermaid')}
          role="tab"
          aria-selected={activeTab === 'mermaid'}
          aria-controls="diagram-content"
          id="tab-mermaid"
          tabIndex={activeTab === 'mermaid' ? 0 : -1}
        >
          <span>Diagrama Estático</span>
          <small>Visualização tradicional</small>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'interactive' ? styles.active : ''}`}
          onClick={() => setActiveTab('interactive')}
          onKeyDown={(e) => handleKeyDown(e, 'interactive')}
          role="tab"
          aria-selected={activeTab === 'interactive'}
          aria-controls="diagram-content"
          id="tab-interactive"
          tabIndex={activeTab === 'interactive' ? 0 : -1}
        >
          <span>Diagrama Interativo</span>
          <small>Zoom, pan e drag</small>
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={styles.content}
          role="tabpanel"
          id="diagram-content"
          aria-labelledby={activeTab === 'mermaid' ? 'tab-mermaid' : 'tab-interactive'}
        >
          {activeTab === 'mermaid' ? mermaidContent : interactiveContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

