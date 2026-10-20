// Single source of content. Plain JS (not JSON) so the page also works when opened via file://.
window.SITE = { resumeVersion: "2026-01-01", lastUpdated: "2026-10-21" };
window.PROJECTS = [
  {
    slug: "dqn-minesweeper-solver",
    title: "DQN Minesweeper Solver",
    metric: { value: "0.47", label: "turns from exact solver" },
    outcome: "Double DQN within 0.47 turns of an exact solver on two-player Minesweeper.",
    snippet: "Double DQN written from scratch in PyTorch, exported to ONNX and run in the browser.",
    tags: ["Python", "PyTorch", "ONNX", "Reinforcement learning"],
    url: "https://t6523.github.io/dqn-minesweeper-solver/",
    image: ""
  },
  {
    slug: "ab-test-toolkit",
    title: "A/B Test Toolkit",
    metric: { value: "256", label: "tests, verified by simulation" },
    outcome: "Plan, analyze and decide A/B tests; false positive rate measured at 5.1% and CI coverage at 95.0%.",
    snippet: "Sample size, confidence intervals and launch verdicts, checked by Monte Carlo simulation. Runs in the browser via Pyodide.",
    tags: ["Python", "NumPy", "SciPy", "Pyodide"],
    url: "https://t6523.github.io/ab-test-toolkit/",
    image: ""
  },
  {
    slug: "bangkok-airbnb-pricing",
    title: "Bangkok Airbnb Pricing",
    metric: { value: "666 THB", label: "MAE vs 804 linear baseline" },
    outcome: "666 THB MAE vs 804 for linear regression on unseen hosts.",
    snippet: "DuckDB SQL feature engineering and a tuned boosted-tree ensemble in a Docker pipeline, with an in-browser price estimator.",
    tags: ["Python", "DuckDB", "Gradient boosting", "Docker"],
    url: "https://t6523.github.io/bangkok-airbnb-pricing/",
    image: ""
  },
  {
    slug: "predictive_keyboard",
    title: "Predictive Keyboard",
    metric: { value: "78.6%", label: "next-word accuracy" },
    outcome: "78.6% next-word accuracy from a LoRA-tuned Qwen2.5-3B, Mistral-7B and KenLM blend.",
    snippet: "Predicts the next word from context plus the first letter typed. Includes an in-browser n-gram demo.",
    tags: ["Python", "LoRA", "KenLM", "NLP"],
    url: "https://t6523.github.io/predictive_keyboard/",
    image: ""
  }
];
