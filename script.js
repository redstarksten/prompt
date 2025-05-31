document.addEventListener("DOMContentLoaded", () => {
  const promptInputs = document.getElementById("promptInputs");
  const generateBtn = document.getElementById("generateBtn");
  const resultContainer = document.getElementById("resultContainer");
  const result = document.getElementById("result");
  const modeButtons = document.querySelectorAll(".mode-btn");

  let currentMode = "image";

  const modes = {
    image: [
      { label: "Subjek", id: "subject" },
      { label: "Aksi", id: "action" },
      { label: "Gaya Visual (realistik, sinematik, dll)", id: "style" }
    ],
    video: [
      { label: "Subjek", id: "subject" },
      { label: "Aksi", id: "action" },
      { label: "Emosi", id: "emotion" },
      { label: "Gerakan Kamera", id: "camera" }
    ],
    narrative: [
      { label: "Tokoh", id: "character" },
      { label: "Aktivitas", id: "activity" },
      { label: "Suasana atau Emosi", id: "mood" },
      { label: "Gaya Narasi (puitis, dokumenter, dll)", id: "tone" }
    ]
  };

  function renderFields(mode) {
    currentMode = mode;
    promptInputs.innerHTML = "";
    modes[mode].forEach(field => {
      const label = document.createElement("label");
      label.textContent = field.label;
      label.htmlFor = field.id;

      const input = document.createElement("input");
      input.id = field.id;
      input.type = "text";

      promptInputs.appendChild(label);
      promptInputs.appendChild(input);
    });

    result.textContent = "";
    resultContainer.classList.add("hidden");
  }

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const mode = btn.getAttribute("data-mode");
      renderFields(mode);
    });
  });

  generateBtn.addEventListener("click", async () => {
    const inputs = promptInputs.querySelectorAll("input");
    const promptParts = Array.from(inputs)
      .map(i => i.value.trim())
      .filter(Boolean);
    const promptText = promptParts.join(", ");

    resultContainer.classList.remove("hidden");

    if (!promptText) {
      result.textContent = "Isi semua field dulu ya!";
      return;
    }

    result.textContent = "Enhancing prompt with DeepSeek...";

    try {
      const response = await fetch("https://deepseek-proxy.glitch.me/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-854cdf1e9eff4de59471892e07f581e0" // 🔁 Ganti dengan API Key asli
        },
        body: JSON.stringify({ prompt: promptText })
      });

      const data = await response.json();
      result.textContent = data.enhanced_prompt || "Gagal enhance dengan DeepSeek.";
    } catch (error) {
      result.textContent = "Error saat menghubungi DeepSeek: " + error.message;
    }
  });

  renderFields("image");
});
