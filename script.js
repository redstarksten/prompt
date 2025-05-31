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

  // Switch mode
  modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.mode;
      document.querySelector(".mode-button.active")?.classList.remove("active");
      button.classList.add("active");

      // Optional: Clear output & prompt on mode switch
      outputDiv.textContent = "";
      // promptInput.value = ""; // uncomment kalau mau kosongkan prompt saat ganti mode
    });
  });

  // Generate button clicked
  document.getElementById("generate").addEventListener("click", async () => {
    const rawPrompt = promptInput.value.trim();
    if (!rawPrompt) {
      alert("Tolong masukkan prompt.");
      return;
    }

    outputDiv.textContent = "Enhancing prompt with DeepSeek...";

    try {
      const response = await fetch("https://deepseek-proxy.vercel.app/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rawPrompt })
      });

      const data = await response.json();

      if (data.enhanced_prompt) {
        outputDiv.textContent = data.enhanced_prompt;
      } else {
        outputDiv.innerHTML = `<span style="color:red">Gagal meng-enhance prompt.</span>`;
        console.error("Response error:", data);
      }
    } catch (error) {
      outputDiv.innerHTML = `<span style="color:red">Error saat menghubungi server.</span>`;
      console.error(error);
    }
  });
});
