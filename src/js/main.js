// Access the carousel container (DOM node)
const carousel = document.getElementById("carousel");

// Modal elements (assumed to be in your HTML)
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalCloseBtn = document.getElementById("modalCloseBtn");

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});


// Async function to fetch poll data (async/await, Fetch API)
async function fetchPolls() {
  try {
    const res = await fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0");
    const data = await res.json();

    // Extract top 5 polls (Array)
    const hits = data.hits.slice(0, 5);

    // Clear carousel before appending
    carousel.innerHTML = "";

    hits.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.animationDelay = `${index * 0.15}s`;

      // Use template literals for HTML content
      card.innerHTML = `
        <h3>${item.title || "Untitled Poll"}</h3>
        <p>Author: ${item.author}</p>
      `;

      // Store poll data in dataset for event delegation
      card.dataset.title = item.title || "Untitled Poll";
      card.dataset.author = item.author;
      card.dataset.date = item.created_at;

      // Append the card to the carousel (DOM tree)
      carousel.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to fetch polls", err);
  }
}

// Event delegation: attach one click listener to carousel container
carousel.addEventListener("click", (event) => {
  // Find the closest card ancestor of the clicked element
  const card = event.target.closest(".card");
  if (!card) return; // Click outside card, ignore

  // Access stored poll data from dataset
  const title = card.dataset.title;
  const author = card.dataset.author;
  const date = card.dataset.date;

  // Update modal content (DOM manipulation)
  modalTitle.textContent = title;
  modalAuthor.textContent = `Author: ${author}`;
  modalDate.textContent = `Created: ${new Date(date).toLocaleString()}`;

  // Show modal (style manipulation)
  modal.style.display = "flex";

  // Store last viewed poll in localStorage (Web Storage API)
  localStorage.setItem("lastViewedPoll", title);
});

// Initialize by fetching polls
fetchPolls();

// Example: Read last viewed poll from localStorage on page load
const lastPoll = localStorage.getItem("lastViewedPoll");
if (lastPoll) {
  console.log("Last viewed poll was:", lastPoll);
}
