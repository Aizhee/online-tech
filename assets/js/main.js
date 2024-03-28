


document.querySelectorAll('.nav-btn').forEach(function(btn1) {
    btn1.addEventListener('click', function() {
        // Get the URL from the data-url attribute of the button
        var url = this.getAttribute('data-url');
        
        // Navigate to the specified URL
        window.open(url, '_blank');

    });
});


// Get references to all elements with class 'dynamic-paragraph' and 'dynamic-button'
const paragraphs = document.querySelectorAll('.name-activity');
const buttons = document.querySelectorAll('.nav-btn');

// Add click event listener to each button
buttons.forEach(function(button) {
    button.addEventListener('mouseenter', function() {
        // Get the text content of the clicked button
        const buttonText = this.textContent;
        
        // Iterate over all paragraphs and set their content based on the button's text
        paragraphs.forEach(function(paragraph) {
            paragraph.textContent = buttonText;
        });
    });

    button.addEventListener('mouseleave', function() {
        // Get the text content of the clicked button
        const buttonText = 'Select an Activity';
        
        // Iterate over all paragraphs and set their content based on the button's text
        paragraphs.forEach(function(paragraph) {
            paragraph.textContent = buttonText;
        });
    });
});



document.querySelectorAll('.nav-btn').forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
        var imagePath = this.getAttribute('data-image');
        var container = document.querySelector('.container');

        // Add a class to the container to trigger the CSS changes for the ::before pseudo-element
        container.classList.add('with-background');
        
        // Set the background image of the ::before pseudo-element using CSS custom properties
        container.style.setProperty('--background-image', 'url(' + imagePath + ')');
    });

    

    btn.addEventListener('mouseleave', function() {
        var container = document.querySelector('.container');
        
        // Clear any ongoing transition on the ::before pseudo-element
        container.style.transition = 'none';
        
        // Remove the class from the container to revert the CSS changes for the ::before pseudo-element
        container.classList.remove('with-background');

        // Force a reflow to ensure the transition resets
        container.offsetHeight;
        
        // Restore the transition
        container.style.transition = '';
        container.style.transition = 'opacity 1s ease';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/repos/Aizhee/online-tech/commits')
        .then(response => response.json())
        .then(data => {
            let commits = data.slice(0, 2); // Get the latest 2 commits
            let commitList = document.getElementById('commit-list');

            commits.forEach(commit => {
                let listItem = document.createElement('li');
                listItem.textContent = `Commit: ${commit.commit.message}, Time: ${formatDateTime(commit.commit.author.date)}`;
                listItem.style.listStyle = 'disc'; // Set the list-style to disc

                function formatDateTime(dateTime) {
                    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
                    const formattedDateTime = new Date(dateTime).toLocaleString('en-US', options);
                    return formattedDateTime.replace(',', ' ').toUpperCase();
                }
                commitList.appendChild(listItem);
            });
        })
        .catch(error => console.error(error));
});

