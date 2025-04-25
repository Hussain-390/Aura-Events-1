document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector("#menu-bars");
  const navbar = document.querySelector(".navbar");
  if (menu && navbar) {
    menu.onclick = () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");
    };
  }
  const themeToggler = document.querySelector(".theme-toggler");
  const toggleBtn = document.querySelector(".toggle-btn");
  if (toggleBtn && themeToggler) {
    toggleBtn.onclick = () => {
      themeToggler.classList.toggle("active");
    };
  }
  window.onscroll = () => {
    if (menu && navbar) {
      menu.classList.remove("fa-times");
      navbar.classList.remove("active");
    }
    if (themeToggler) {
      themeToggler.classList.remove("active");
    }
  };
  document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
    btn.onclick = () => {
      let color = btn.style.background;
      document.querySelector(":root").style.setProperty("--theme-color", color);
    };
  });
  if (document.querySelector(".home-slider")) {
    new Swiper(".home-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }
  const budgetInputs = document.querySelectorAll(".budget .content input");
  const totalElement = document.querySelector("#total");
  const saveBudgetBtn = document.querySelector("#save-budget");
  if (budgetInputs.length > 0 && totalElement) {
    const updateTotal = () => {
      let total = 0;
      budgetInputs.forEach((input) => {
        total += Number(input.value) || 0;
      });
      totalElement.textContent = total;
    };
    budgetInputs.forEach((input) => {
      input.addEventListener("input", updateTotal);
    });
    if (saveBudgetBtn) {
      saveBudgetBtn.onclick = () => {
        const budget = {
          venue: document.querySelector("#venue").value || 0,
          catering: document.querySelector("#catering").value || 0,
          decor: document.querySelector("#decor").value || 0,
          entertainment: document.querySelector("#entertainment").value || 0,
        };
        localStorage.setItem("budget", JSON.stringify(budget));
        alert("Budget saved!");
      };
      const savedBudget = JSON.parse(localStorage.getItem("budget"));
      if (savedBudget) {
        document.querySelector("#venue").value = savedBudget.venue;
        document.querySelector("#catering").value = savedBudget.catering;
        document.querySelector("#decor").value = savedBudget.decor;
        document.querySelector("#entertainment").value = savedBudget.entertainment;
        updateTotal();
      }
    }
  }
  const addGuestBtn = document.querySelector("#add-guest");
  const guestTableBody = document.querySelector("#guest-table tbody");
  if (addGuestBtn && guestTableBody) {
    const loadGuests = () => {
      guestTableBody.innerHTML = "";
      const guests = JSON.parse(localStorage.getItem("guests")) || [];
      guests.forEach((guest, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${guest.name}</td>
          <td>${guest.email}</td>
          <td><button class="delete-guest" data-index="${index}">Delete</button></td>
        `;
        guestTableBody.appendChild(row);
      });
      document.querySelectorAll(".delete-guest").forEach((btn) => {
        btn.onclick = () => {
          const index = btn.dataset.index;
          const guests = JSON.parse(localStorage.getItem("guests")) || [];
          guests.splice(index, 1);
          localStorage.setItem("guests", JSON.stringify(guests));
          loadGuests();
        };
      });
    };
    addGuestBtn.onclick = () => {
      const name = document.querySelector("#guest-name").value.trim();
      const email = document.querySelector("#guest-email").value.trim();
      if (name && email) {
        const guests = JSON.parse(localStorage.getItem("guests")) || [];
        guests.push({ name, email });
        localStorage.setItem("guests", JSON.stringify(guests));
        document.querySelector("#guest-name").value = "";
        document.querySelector("#guest-email").value = "";
        loadGuests();
      } else {
        alert("Please enter both name and email.");
      }
    };
    loadGuests();
  }
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const subject = document.querySelector("#subject").value.trim();
      if (name && email && subject) {
        alert("Message sent! (This is a front-end demo.)");
        contactForm.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    };
  }
});