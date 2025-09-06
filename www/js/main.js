const carousel = document.getElementById("carousel");

async function fetchPolls() {
  try {
    const res = await fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0");
    const data = await res.json();
    const hits = data.hits.slice(0, 5); // show top 5 for demo

   hits.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 0.15}s`; // ✨ staggered delay
  card.innerHTML = `
    <h3>${item.title || "Untitled Poll"}</h3>
    <p>Author: ${item.author}</p>
  `;
  card.addEventListener("click", () => {
    modalTitle.textContent = item.title || "Untitled Poll";
    modalAuthor.textContent = `Author: ${item.author}`;
    modalDate.textContent = `Created: ${new Date(item.created_at).toLocaleString()}`;
    modal.style.display = "flex";
  });

  carousel.appendChild(card);
});

  } catch (err) {
    console.error("Failed to fetch polls", err);
  }
}

fetchPolls();
