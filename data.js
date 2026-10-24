// Single source of content. Plain JS (not JSON) so the page also works when opened via file://.
window.SITE = { resumeVersion: "2026-01-01", lastUpdated: "2026-10-25" };
window.PROJECTS = [
  {
    slug: "dqn-minesweeper-solver",
    title: "DQN Minesweeper Solver",
    metric: { value: "0.47", label: "turns from exact solver" },
    outcome: "Double DQN written from scratch in PyTorch, within 0.47 turns of an exact solver on two-player Minesweeper. Runs in the browser via ONNX.",
    tags: ["Python", "PyTorch", "ONNX", "Reinforcement learning"],
    url: "https://t6523.github.io/dqn-minesweeper-solver/",
    image: "thumb-dqn-minesweeper-solver.webp"
  },
  {
    slug: "ab-test-toolkit",
    title: "A/B Test Toolkit",
    metric: { value: "19.2%", label: "false positives from peeking, cut to 5% by sequential tests" },
    outcome: "In-browser A/B test planner and analyzer. Simulation: peeking raises false positives from 5% to 19.2%; sequential boundaries hold them near 5%.",
    tags: ["Python", "NumPy", "SciPy", "Pyodide"],
    url: "https://t6523.github.io/ab-test-toolkit/",
    image: "thumb-ab-test-toolkit.webp"
  },
  {
    slug: "bangkok-airbnb-pricing",
    title: "Bangkok Airbnb Pricing",
    metric: { value: "666 THB", label: "MAE vs 804 linear baseline" },
    outcome: "Bangkok Airbnb price model: 666 THB MAE vs 804 for linear regression on unseen hosts, with DuckDB features and an in-browser estimator.",
    tags: ["Python", "DuckDB", "Gradient boosting", "Docker"],
    url: "https://t6523.github.io/bangkok-airbnb-pricing/",
    image: "thumb-bangkok-airbnb-pricing.webp"
  },
  {
    slug: "predictive_keyboard",
    title: "Predictive Keyboard",
    metric: { value: "78.6%", label: "next-word accuracy" },
    outcome: "Next-word prediction from context and first letter: 78.6% accuracy from a LoRA-tuned Qwen2.5-3B, Mistral-7B and KenLM blend.",
    tags: ["Python", "LoRA", "KenLM", "NLP"],
    url: "https://t6523.github.io/predictive_keyboard/",
    image: "thumb-predictive_keyboard.webp"
  }
];
