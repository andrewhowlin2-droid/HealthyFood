document.addEventListener("DOMContentLoaded", function () {

  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(button => {
    button.addEventListener("click", function () {
      const panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const age = document.getElementById("age").value.trim();
      const goal = document.getElementById("goal").value.trim();
      const food = document.getElementById("food").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || age === "" || goal === "" || food === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
      }

      formMessage.textContent = "Form submitted successfully!";
      formMessage.style.color = "green";
      contactForm.reset();
    });
  }

  const loadRecipesBtn = document.getElementById("loadRecipes");
  const recipeContainer = document.getElementById("recipeContainer");

  if (loadRecipesBtn) {
    loadRecipesBtn.addEventListener("click", function () {
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
        .then(response => response.json())
        .then(data => {
          recipeContainer.innerHTML = "";

          data.meals.slice(0, 6).forEach(meal => {
            recipeContainer.innerHTML += `
              <div class="card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>Healthy meal idea for a balanced lifestyle.</p>
              </div>
            `;
          });
        })
        .catch(error => {
          recipeContainer.innerHTML = "<p>Unable to load recipes right now.</p>";
        });
    });
  }

});