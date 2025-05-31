document.addEventListener("DOMContentLoaded", () => {
  const promptInputs = document.getElementById("promptInputs");
  const generateBtn = document.getElementById("generateBtn");
  const enhanceBtn = document.getElementById("enhanceBtn");
  const resultContainer = document.getElementById("resultContainer");
  const result = document.getElementById("result");
  const modeButtons = document.querySelectorAll(".mode-btn");

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

    // Show Enhance button only in narrative mode
    enhanceBtn.style.display = mode === "narrative" ? "inline-block" : "none";
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

  generateBtn.addEventListener("click", () => {
    const inputs = promptInputs.querySelectorAll("input");
    const promptParts = Array.from(inputs)
      .map(i => i.value.trim())
      .filter(Boolean);
    const promptText = promptParts.join(", ");

    result.textContent = promptText;
    resultContainer.classList.remove("hidden");
  });

  enhanceBtn.addEventListener("click", async () => {
    const inputs = promptInputs.querySelectorAll("input");
    const promptParts = Array.from(inputs)
      .map(i => i.value.trim())
      .filter(Boolean);
    const promptText = promptParts.join(", ");

    if (!promptText) {
      alert("Isi semua field dulu ya!");
      return;
    }

    result.textContent = "Menghubungi DeepSeek...";
    resultContainer.classList.remove("hidden");

    try {
      const response = await fetch("https://api.deepseek.live/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-854cdf1e9eff4de59471892e07f581e0" // 🔁 Ganti dengan API Key kamu
        },
        body: JSON.stringify({ prompt: promptText })
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
      }

      const data = await response.json();
      result.textContent = data.enhanced_prompt || "Gagal memproses prompt dari DeepSeek.";
    } catch (error) {
      result.textContent = "Error: " + error.message;
    }
  });

  renderFields("image");
});
