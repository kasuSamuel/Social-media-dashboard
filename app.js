document.addEventListener('DOMContentLoaded', 
function toggleDarkMode() {
    const checkbox = document.getElementById("check");
    const body = document.body;

    function applyDarkMode(darkMode) {
        
        const header = document.querySelector('header');
        header.style.backgroundColor = darkMode ? '#F7F9FF' : '#20222F' ;

        const head = document.querySelector('.head');
        head.classList.toggle("dark-mode", darkMode);

        const sectionH1 = document.querySelector('section h1');
        sectionH1.style.color = darkMode ? '#1D1F29' : '#FFF';

        const followersElements = document.querySelectorAll('.followers');
        const overviewElements = document.querySelectorAll('.overview');

        followersElements.forEach((element) => {
            element.classList.toggle('active', darkMode);
            element.classList.toggle('hover', darkMode);
        });

        overviewElements.forEach((element) => {
            element.classList.toggle('active', darkMode);
            element.classList.toggle('hover', darkMode);
        });

        const elements = document.querySelectorAll('#second-child');
        elements.forEach(element => {
        element.style.color = darkMode ? '#1D1F29' : '#FFF';
        });
        body.style.backgroundColor = darkMode ? '#FFF' : '#1D1F29';
    }

    checkbox.addEventListener('change', () => {
        applyDarkMode(checkbox.checked);
        body.classList.toggle('dark-mode', checkbox.checked);
    });
});

function fetchData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const followersCount = data.followersData
            const socialMedia = document.querySelector('followers');
            followersCount.forEach(item => {
                const followersContent = `
                <div class="top">
                  <div class="followers">
                    <p><img src="${item.platform}.svg" alt="${item.platform}"> <span id="handle">${item.handle}</span></p>
                    <p id="second-child">${item.followersCount}<span>FOLLOWERS</span></p>
                    <p><img src="triangle${item.platform === 'youtube' ? '-red' : ''}.svg" alt=""><span id="${item.platform === 'youtube' ? 'red' : 'green'}">${item.today}</span></p>
                  </div>
                </div>
            `;
                socialMedia.innerHTML += followersContent;
            });

            const articlesCount = data.overviewData
            const over = document.querySelector('.overview-0f-all');
            articlesCount.forEach(item => {
                const articleContent = `
          <div class="overview">
          <div class="pageviews">
              <p>${item.title}</p>
              <img src="${item.platform}.svg" alt="${item.platform}">
          </div>
          <div class="numbers">
              <p id="second-child">${item.value}</p>
              <i id="${(item.platform === 'youtube') ? 'red' : 'green'}">
              <img src="triangle${item.platform === 'youtube'? '-red' : ''}.svg" alt="">  ${item.percentage} 
              </i>
          </div>
      </div>
          `;
                over.innerHTML += articleContent;
            });
        })
}
fetchData();
