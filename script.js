const button = document.getElementById("openButton");
const title = document.getElementById("title");
const fortuneDisplay = document.getElementById("fortuneDisplay");
const cookieImage = document.getElementById("cookieImage");
const crackedCookie = document.getElementById("crackedCookie");

// Sheet published as JSON
const sheetURL = 'https://docs.google.com/spreadsheets/d/1Ul0eT6byM0szFn2ToW2453vVUcdb6px0TY0Gmai7IKY/gviz/tq?tqx=out:json';

button.addEventListener("click", async () => {
  // Hide intro elements
  button.classList.add("hidden");
  title.classList.add("hidden");
  cookieImage.classList.add("hidden");

  // Show loading message
  fortuneDisplay.classList.remove("hidden");
  fortuneDisplay.textContent = "a partir a bolacha da sorte... 🥠";

  try {
    const response = await fetch(sheetURL);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;
    const fortunes = rows.map(r => r.c[1]?.v).filter(Boolean);

    if (!fortunes.length) {
      fortuneDisplay.textContent = "sem sorte desta vez";
      return;
    }

    const random = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[random];

    // Show cracked cookie
    crackedCookie.classList.remove("hidden");

    // Show fortune
    fortuneDisplay.textContent = fortune;
    fortuneDisplay.classList.add("revealed");


  } catch (error) {
    console.error("Error fetching fortune:", error);
    fortuneDisplay.textContent = "mmm... estava vazia... tenta novamente mais tarde";
  }
});
