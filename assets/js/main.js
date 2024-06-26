
/*
 +-+-+-+-+ +-+-+-+-+ +-+-+-+-+-+-+ +-+-+-+-+
 |M|A|I|N| |J|A|V|A| |S|C|R|I|P|T| |F|I|L|E|
 +-+-+-+-+ +-+-+-+-+ +-+-+-+-+-+-+ +-+-+-+-+
*/

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
        container.style.transition = 'opacity 1s ease-in-out';
    });
});

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    var icon = this.querySelector('i');

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    } else {
      for (var j = 0; j < coll.length; j++) {
        coll[j].classList.remove("active");
        coll[j].nextElementSibling.style.maxHeight = null;
        coll[j].querySelector('i').classList.remove("fa-chevron-up");
        coll[j].querySelector('i').classList.add("fa-chevron-down");
      }
      content.style.maxHeight = content.scrollHeight + "px";
      this.classList.add("active");
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
// Global variable to store the latest commit across repositories
let latestCommit = null;

// Function to fetch commits and update the latest commit
function fetchAndUpdateLatestCommit(repoUrl) {
    fetch(repoUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(commit => {
                if (!latestCommit || new Date(commit.commit.author.date) > new Date(latestCommit.commit.author.date)) {
                    latestCommit = commit;
                }
            });
        })
        .catch(error => console.error(error));
}

// Function to update UI with the latest commit
function updateUIWithLatestCommit() {
    if (latestCommit) {
        const commitList = document.getElementById('commit-list');
        const listItem = document.createElement('li');
        listItem.textContent = `➕: ${latestCommit.commit.message}, ${Tmj.getTimeMoji(latestCommit.commit.author.date)}: ${formatDateTime(latestCommit.commit.author.date)}`;
        listItem.style.listStyle = 'none';
        listItem.style.listStylePosition = 'inside';

        function formatDateTime(dateTime) {
            const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
            const formattedDateTime = new Date(dateTime).toLocaleString('en-US', options);
            return formattedDateTime.replace(',', ' ').toUpperCase();
        }

        commitList.appendChild(listItem);
    }
}

// Fetch commits for both repositories and update the latest commit
fetchAndUpdateLatestCommit('https://api.github.com/repos/Aizhee/online-tech/commits');

// After both repositories' commits have been fetched, update the UI with the latest commit
setTimeout(updateUIWithLatestCommit, 2000); // Adjust the delay as needed
});

window.addEventListener('load', function () {
    // Show loading screen initially
    var loadingScreen = document.querySelector('.loading-bar');
    loadingScreen.classList.add('show');

    // Hide loading screen after 1 second
    setTimeout(function () {
        loadingScreen.classList.remove('show');
        setTimeout(function () {
        loadingScreen.style.display = 'none';
        }, 1010);
    }, 1000);

    // You can also hide it when the page fully loads
    // Uncomment the lines below to use this method instead

    // window.addEventListener('load', function () {
    //     loadingScreen.classList.remove('show');
    // });
});