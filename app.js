document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.parentElement.getAttribute('data-id');
        window.location.href = `/checkout/${productId}`;
    });
});
