const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransitions(){
  //Button click active class

  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener('click', function() {
      let currentBtn = document.querySelector('.active-btn');
      if (currentBtn) {
        currentBtn.classList.remove('active-btn');
      }
      this.classList.add('active-btn');
    });
  }
  

    //section active 
    allSections.addEventListener('click', function(e) {
      const id = e.target.dataset.id;
      if (id) {
        // remove the "active" class from all sectBtns
        sectBtns.forEach(function(btn) {
          btn.classList.remove('active');
        });
    
        // add the "active" class to the clicked button
        e.target.classList.add('active');
    
        // hide all sections
        sections.forEach(function(section) {
          section.classList.remove('active');
        });
    
        // show the section with the corresponding id
        const element = document.getElementById(id);
        if (element) {
          element.classList.add('active');
        }
      }
    });
    
    //toggle
    const themeBtn = document.querySelector('.theme-btn');
     themeBtn.addEventListener('click', () => {
     let element = document.body;
     element.classList.toggle('light-mode');
      });

}

PageTransitions();