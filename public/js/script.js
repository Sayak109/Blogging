const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');

    searchInput.addEventListener('input', function() {
        if (searchInput.value.trim() !== '') {
            searchIcon.style.display = 'none';
        } else {
            searchIcon.style.display = 'block';
        }
    });

