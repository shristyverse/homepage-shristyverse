function showPreview(url, title) {
    const modal = document.getElementById('modal-overlay');
    const iframe = document.getElementById('preview-iframe');
    iframe.src = url;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    const iframe = document.getElementById('preview-iframe');
    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
