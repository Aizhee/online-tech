var toggleCheckbox = document.getElementById('toggle1');
var navigationMenu = document.getElementById('navigation');

function isMaxWidth() {
    return window.innerWidth <= 638;
}

toggleCheckbox.addEventListener('change', function() {
    if (isMaxWidth()) {
        navigationMenu.style.height = this.checked ? '350px' : '0px';
    } else {
        navigationMenu.style.height = '0px';
    }
});


window.addEventListener('resize', function() {
    if (isMaxWidth()) {
        navigationMenu.style.height = toggleCheckbox.checked ? '350px' : '0px';
    } else {
        navigationMenu.style.height = '40px';
    }
});