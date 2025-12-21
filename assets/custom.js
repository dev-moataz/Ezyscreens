'use strict';


const measurebtnsOpenModal = document.querySelectorAll('.show_measure_modal');

if (measurebtnsOpenModal.length) {

  const measuremodal = document.querySelector('.measure_modal');
  const measureoverlay = document.querySelector('.overlay');
  const measurebtnCloseModal = document.querySelector('.close-modal');

  const openModal = function () {
    measuremodal.classList.remove('hidden');
    measureoverlay.classList.remove('hidden');
  };

  const closeModal = function () {
    measuremodal.classList.add('hidden');
    measureoverlay.classList.add('hidden');
  };

  for (let i = 0; i < measurebtnsOpenModal.length; i++)
    measurebtnsOpenModal[i].addEventListener('click', openModal);

  measurebtnCloseModal.addEventListener('click', closeModal);
  measureoverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

}

const header = document.querySelector("sticky-header");
const firstSection = document.querySelector("main section:first-child");
const white_logo = document.querySelector(".logo_white");
const black_logo = document.querySelector(".logo_black");

if (firstSection.classList.contains("transparent_header")) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          header.classList.add("opaque");

        } else {
          header.classList.remove("opaque");

        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(firstSection);
}else{
  
          header.classList.add("always_opaque");

}
function copyToClipboard(textToCopy, linkElement) {
  console.log("___________________________test")
  navigator.clipboard.writeText(textToCopy);

  const tooltip = document.createElement("span");
  tooltip.className = "tooltiptext";
  tooltip.innerHTML = "Copied: " + textToCopy;
  document.querySelector("#MainContent").appendChild(tooltip);

    // Get link position
  const rect = linkElement.getBoundingClientRect();
  tooltip.style.top = (window.scrollY + rect.bottom + 4) + "px"; // 4px gap under link
  tooltip.style.left = (window.scrollX + rect.left) + "px"; // align with link start


  // Hide again after 2 seconds
  setTimeout(function() {
    tooltip.classList.add("hidden");
    tooltip.innerHTML = "";
    tooltip.remove();
  }, 4000);
}


document.addEventListener("DOMContentLoaded", () => {
  // Consider mobile if width <= 1024px (adjust threshold if needed)
  const isMobile = window.innerWidth <= 749;

  if (!isMobile) {
    // Desktop: override tel: and mailto: links
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const textToCopy = link.getAttribute("href").replace(/^(tel:|mailto:)/, "");
        copyToClipboard(textToCopy, link);
      });
    });
  }
});