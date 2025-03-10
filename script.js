/* ========= Mobile Menu Toggle ========= */
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const closeBtn = document.getElementById('close-btn');

if (menuIcon && navMenu) {
  menuIcon.addEventListener('click', () => navMenu.classList.add('active'));
}
if (closeBtn && navMenu) {
  closeBtn.addEventListener('click', () => navMenu.classList.remove('active'));
}



// why to choese us js code :===================

document.addEventListener("DOMContentLoaded", function () {
  /* Show More Button for "Why Choose Us" Section */
  const showMore = document.querySelector(".show-more");
  const extraCards = document.querySelectorAll(".unique-feature-card.extra");
  if (showMore) {
    let expanded = false;
    showMore.addEventListener("click", function () {
      expanded = !expanded;
      extraCards.forEach(card => {
        card.style.display = expanded ? "block" : "none";
      });
      showMore.innerHTML = expanded ? "<div class='arrow'>&#x25B2;</div> Show Less" : "<div class='arrow'>&#x25BC;</div> Show More";
    });
  }
});


  
  /* ========= Counting Animation for Stats ========= */
  const statNumbers = document.querySelectorAll('.stat-number');
  const targetSection = document.querySelector('.footprint');

  if (statNumbers.length > 0 && targetSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
              current += increment;
              if (current < target) {
                statNumber.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
              } else {
                statNumber.textContent = target.toLocaleString();
              }
            };
            updateNumber();
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(targetSection);
  }



  
  /* ========= YouTube Shorts Auto-Play on Scroll ========= */
  const shortsController = {
    init() {
      this.createObservers();
    },
    createObservers() {
      const options = { rootMargin: '0px', threshold: 0.5 };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const iframe = entry.target.querySelector('iframe');
          if (iframe) {
            iframe.src = entry.isIntersecting ? iframe.src.replace("&mute=1", "&autoplay=1&mute=1") : iframe.src.replace("&autoplay=1", "");
          }
        });
      }, options);

      document.querySelectorAll('.short-video').forEach(video => observer.observe(video));
    }
  };
  shortsController.init();

  /* ========= YouTube Brand Video AutoPlay & Mute ========= */
  document.querySelectorAll('.brand-box video').forEach(video => {
    video.muted = true;
    video.play().catch(err => console.log("Autoplay error:", err));
  });

  /* ========= Subscription Plan Fade-In Animation ========= */
  const plans = document.querySelectorAll('.subscription-plan');
  if (plans.length > 0) {
    const plansObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          plansObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    plans.forEach(plan => plansObserver.observe(plan));
  }

  /* ========= Unmute Brand Video on Click ========= */
  document.querySelectorAll('.unmute-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const video = e.currentTarget.previousElementSibling;
      if (video) {
        video.muted = !video.muted;
        e.currentTarget.textContent = video.muted ? '🔇' : '🔊';
      }
    });
  });




  // YouTube Player API
let ytCustomPlayer;

function onYouTubeIframeAPIReady() {
    ytCustomPlayer = new YT.Player('yt-custom-player', {
        width: '100%',
        videoId: 'VIDEO_ID_1',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'disablekb': 1,
            'playsinline': 1,
            'mute': 0,
            'enablejsapi': 1
        },
        events: {
            'onReady': onCustomPlayerReady
        }
    });
}
// Carousel Navigation
let currentVideo = 0;
const videos = document.querySelectorAll('.vsec-video');
const dots = document.querySelectorAll('.vsec-dot');

function showVideo(index) {
    videos.forEach(v => v.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    videos[index].classList.add('active');
    dots[index].classList.add('active');
    currentVideo = index;
}

// Dot Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showVideo(index));
});

// Arrow Navigation
document.querySelector('.vsec-prev').addEventListener('click', () => {
    showVideo((currentVideo - 1 + videos.length) % videos.length);
});

document.querySelector('.vsec-next').addEventListener('click', () => {
    showVideo((currentVideo + 1) % videos.length);
});

// Mute Control
const muteBtn = document.querySelector('.vsec-mute');
muteBtn.addEventListener('click', () => {
    const iframe = videos[currentVideo].querySelector('iframe');
    const isMuted = iframe.src.includes('mute=1');
    
    if(isMuted) {
        iframe.src = iframe.src.replace('mute=1', 'mute=0');
        muteBtn.textContent = '🔊';
    } else {
        iframe.src = iframe.src.replace('mute=0', 'mute=1');
        muteBtn.textContent = '🔇';
    }
});



// yt-vertical

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let vsPlayer;

function onYouTubeIframeAPIReady() {
    vsPlayer = new YT.Player('vs-player', {
        videoId: 'YOUR_VIDEO_ID',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
            modestbranding: 1,
            fs: 0
        },
        events: {
            'onReady': onVsPlayerReady
        }
    });
}

function onVsPlayerReady(event) {
    const muteBtn = document.querySelector('.vs-mute-btn');
    
    muteBtn.addEventListener('click', () => {
        if(event.target.isMuted()) {
            event.target.unMute();
            muteBtn.textContent = '🔊';
        } else {
            event.target.mute();
            muteBtn.textContent = '🔇';
        }
    });
}




// testomonial secion :
document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.testimonial-slider');
  const items = document.querySelectorAll('.testimonial-item');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  let currentIndex = 0;
  const totalItems = items.length;

  function updateSlider() {
    const translateX = -currentIndex * 100;
    slider.style.transform = `translateX(${translateX}%)`;
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateSlider();
  }

  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateSlider();
  }

  nextBtn.addEventListener('click', () => {
    nextTestimonial();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevTestimonial();
    resetInterval();
  });

  let sliderInterval = setInterval(nextTestimonial, 5000);
  function resetInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextTestimonial, 5000);
  }
});



// youtube short (final) section :
