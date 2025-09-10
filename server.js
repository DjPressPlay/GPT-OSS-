const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const MODEL_PATH = "./models/mistral-7b-instruct.Q4_K_M.gguf";
const LLM_COMMAND = (prompt) => `llama-cpp-cli --model ${MODEL_PATH} --prompt "${prompt}"`;

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });
  console.log("[LLM] Prompt received:", prompt);
  exec(LLM_COMMAND(prompt), (err, stdout, stderr) => {
    if (err) {
      console.error("[LLM ERROR]", err);
      return res.status(500).json({ error: "Model error" });
    }
    res.json({ reply: stdout.trim() });
  });
});

app.get("/ping", (_, res) => res.json({ status: "OK" }));

app.listen(PORT, () => console.log(`GPT API running on http://localhost:${PORT}`));
