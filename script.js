const modes = {
  "prompt-image": "Prompt Gambar",
  "prompt-video": "Prompt Video Scene",
  "prompt-narasi": "Prompt Narasi"
};

let currentMode = "prompt-image";

document.addEventListener("DOMContentLoaded", () => {
  const modeButtons = document.querySelectorAll(".mode-button");
  const promptInput = document.getElementById("prompt");
  const outputDiv = document.getElementById("output");

  modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.mode;
      document.querySelector(".mode-button.active")?.classList.remove("active");
      button.classList.add("active");
    });
  });

  document.getElementById("generate").addEventListener("click", async () => {
    const rawPrompt = promptInput.value.trim();
    if (!rawPrompt) return alert("Tolong masukkan prompt.");

    outputDiv.innerHTML = "<em>Enhancing prompt with DeepSeek...</em>";

    try {
      const response = await fetch("https://deepseek-proxy.glitch.me/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rawPrompt })
      });

      const data = await response.json();

      if (data.enhanced_prompt) {
        outputDiv.textContent = data.enhanced_prompt;
      } else {
        outputDiv.innerHTML = `<span style="color:red">Gagal meng-enhance prompt.</span>`;
        console.error("Respon error:", data);
      }
    } catch (error) {
      outputDiv.innerHTML = `<span style="color:red">Error saat menghubungi server.</span>`;
      console.error(error);
    }
  });
});
