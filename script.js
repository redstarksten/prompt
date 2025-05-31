document.addEventListener("DOMContentLoaded", () => {
  const promptInputs = document.getElementById("promptInputs");
  const generateBtn = document.getElementById("generateBtn");
  const resultContainer = document.getElementById("resultContainer");
  const result = document.getElementById("result");

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
      const inputGroup = document.createElement("div");
      inputGroup.innerHTML = `
        <label for="${field.id}" class="block font-medium">${field.label}</label>
        <input type="text" id="${field.id}" class="w-full p-2 border rounded" />
      `;
      promptInputs.appendChild(inputGroup);
    });
  }

  // Handle mode switch buttons
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      renderFields(mode);
      resultContainer.classList.add("hidden");
      result.textContent = "";
    });
  });

  // Handle Generate Prompt button
  generateBtn.addEventListener("click", () => {
    const inputs = promptInputs.querySelectorAll("input");
    const promptParts = Array.from(inputs)
      .map(i => i.value.trim())
      .filter(Boolean);
    const promptText = promptParts.join(", ");

    // Show prompt output (DeepSeek enhancement can be added here)
    result.textContent = promptText;
    resultContainer.classList.remove("hidden");
  });

  // Default mode is 'image'
  renderFields("image");
});
