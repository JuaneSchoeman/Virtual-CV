// Function to load external JSON and inject content
async function loadContent() {
try {
    const response = await fetch('content.json');
    const content = await response.json();
    // Attach click listeners to each book
    document.querySelectorAll('.book').forEach(book => {
        book.addEventListener('click', async () => {
            const key = book.dataset.section;
            // Close other books
            document.querySelectorAll('.book.open').forEach(b => b.classList.remove('open'));
            // Toggle this book
            const opening = !book.classList.contains('open');
            book.classList.toggle('open', opening);
            // Inject or clear content area
            document.getElementById('page-content').innerHTML = opening ? content[key] : '';
        });
    });
} catch (err) {
    console.error('Failed to load content.json:', err);
}
}

// Call on page load
window.addEventListener('DOMContentLoaded', loadContent);