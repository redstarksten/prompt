const modeButtons = document.querySelectorAll(".mode-button");
const form = document.getElementById("promptForm");
const resultBox = document.getElementById("result");
const loading = document.getElementById("loading");

let currentMode = "image";

// Ganti URL ini dengan alamat Vercel kamu
const PROXY_URL = "https://prompt-xi-coral.vercel.app/enchance";

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentMode = button.dataset.mode;
    document.querySelector(".mode-button.active")?.classList.remove("active");
    button.classList.add("active");

    // Tampilkan input sesuai mode
    document.querySelectorAll(".mode-section").forEach((section) => {
      section.style.display = "none";
    });
    document.getElementById(`mode-${currentMode}`).style.display = "block";

    // Clear hasil sebelumnya
    resultBox.value = "";
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultBox.value = "";
  loading.style.display = "inline";

  const prompt = buildPrompt();
  if (!prompt) {
    loading.style.display = "none";
    alert("Isi semua kolom yang dibutuhkan.");
    return;
  }

  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.enhanced_prompt) {
      resultBox.value = data.enhanced_prompt;
    } else {
      resultBox.value = "Gagal meng-enhance prompt.";
      console.error(data);
    }
  } catch (err) {
    resultBox.value = "Error saat menghubungi server.";
    console.error(err);
  } finally {
    loading.style.display = "none";
  }
});

function buildPrompt() {
  if (currentMode === "image") {
    const subject = document.getElementById("image-subject").value;
    const action = document.getElementById("image-action").value;
    const style = document.getElementById("image-style").value;
    if (!subject || !action || !style) return "";

    return `Describe an image of ${subject} who is ${action}, in a ${style} style.`;
  }

  if (currentMode === "video") {
    const scene = document.getElementById("video-scene").value;
    const movement = document.getElementById("video-movement").value;
    const tone = document.getElementById("video-tone").value;
    if (!scene || !movement || !tone) return "";

    return `Describe a video scene: ${scene}, with ${movement}, in a ${tone} tone.`;
  }

  if (currentMode === "narrative") {
    const character = document.getElementById("narrative-character").value;
    const setting = document.getElementById("narrative-setting").value;
    const plot = document.getElementById("narrative-plot").value;
    if (!character || !setting || !plot) return "";

    return `Write a narrative about ${character} in ${setting}, where ${plot}.`;
  }

  return "";
}
