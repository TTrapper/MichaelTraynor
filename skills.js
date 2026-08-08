// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Navbar Shadow on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
}, { passive: true });

// Copy Raw Markdown Logic
document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copy-markdown-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyToast = document.getElementById('copy-toast');

  let cachedMarkdown = null;

  async function getSkillsMarkdown() {
    if (cachedMarkdown) return cachedMarkdown;
    try {
      const response = await fetch('skills.md');
      if (response.ok) {
        cachedMarkdown = await response.text();
        return cachedMarkdown;
      }
    } catch (e) {
      console.warn('Could not fetch skills.md via HTTP, using fallback content:', e);
    }
    // Fallback markdown string if fetch fails
    return `# Technical Skills & Capabilities

> **Michael Traynor — AI Researcher & Software Engineer**
> Specialized expertise across machine learning research, custom neural architectures, graph systems, specialized algorithms, and full-stack engineering.

---

## AI, Machine Learning & NLP

- **LLMs & Agentic Workflows**
  Designing Graph RAG systems and developing autonomous agentic flows for discovering hidden relationships across datasets and generating detailed reports.

- **Custom Tooling & DSLs**
  Developing Domain Specific Languages to replace standard LLM tool use for complex, safety-critical hardware control (e.g., vehicle systems).

- **Deep Learning Architecture & Novel Attention**
  Building custom DNN libraries, sequence modeling (RNNs), and inventing novel attention architectures (e.g., inventing the *Self-Attentive-Recurrent-Array*, combining transformer-like full-history attention with recurrent processing). Proficient in TensorFlow, Keras, PyTorch.

- **Applied & On-Device ML**
  Deploying small, custom transformers for on-device natural language understanding (NLU). Multilingual data augmentation techniques for low-resource domains.

- **Classical NLP & Requirements Engineering**
  Applying pre-LLM heuristics and NLP techniques to draft, score, audit, and sanitize highly technical engineering requirements.

- **UI Automation & Computer Use**
  Fine-tuning multimodal "Computer Use" models for automating Android application usage and UI workflow interaction.

---

## Data Engineering & Graph Architecture

- **Neo4j & Knowledge Graphs**
  Parsing complex XML datasets (e.g., legislation and parliamentary bills) into hierarchical, queryable knowledge graphs.

- **Hybrid Data & Entity Resolution**
  Combining deterministic data mapping with LLM-assisted resolution to bridge plain-language references across disparate structured documents.

---

## Specialized Algorithms & Formal Verification

- **Formal Verification (Aerospace & Hardware)**
  Utilizing Z3, Mathematica, and other backend SMT solvers to mathematically prove the absolute correctness of hardware circuit designs (Java and JavaScript).

- **High-Performance Computing (CUDA)**
  Writing direct CUDA C/C++ code for low-level GPU acceleration, including the design and implementation of a parallelized evolutionary SAT solver.

- **Algorithmic Trading & Systematic Models**
  Developing automated, systematic quantitative trading scripts and financial data pipelines.

- **Simulation & Generative Algorithms**
  Simulating artificial life, evolutionary genetic algorithms, and neural cellular automata (NCA) systems.

---

## Data Visualization

- **Plotly & Neural State Visualization**
  Creating complex interactive graphs and heatmaps, including visualizing neural network attention mechanisms, latent spaces, and internal model states.

- **D3.js & Network Graph Visualization**
  Building custom, interactive web-based data visualizations, including dynamic network diagrams and live graph node layouts.

---

## Full-Stack & Systems Engineering

- **Backend Architecture & Cloud Infrastructure**
  Architecting robust backends and managing production infrastructure via GCP, Firebase, and serverless architectures.

- **Mobile App Development**
  Building high-performance cross-platform mobile apps for iOS and Android using Flutter and Dart.

- **Frontend Engineering**
  Crafting performant web applications using Vue.js, Nuxt, and modern responsive CSS architectures.`;
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const text = await getSkillsMarkdown();
      try {
        await navigator.clipboard.writeText(text);
        showToast('Raw markdown copied to clipboard!');
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy Raw Markdown';
        }, 2500);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        fallbackCopyTextToClipboard(text);
      }
    });
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Raw markdown copied to clipboard!');
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    if (!copyToast) return;
    const span = copyToast.querySelector('span');
    if (span) span.textContent = message;
    copyToast.style.display = 'flex';
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
      setTimeout(() => {
        copyToast.style.display = 'none';
      }, 300);
    }, 3000);
  }
});
