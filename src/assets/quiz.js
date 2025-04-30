document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "What type of environment do you feel most drawn to?",
      answers: {
        venice: "Historic urban beauty slowly surrendering to water",
        reef: "Vibrant underwater ecosystems",
        glacier: "Cool, high-altitude tranquility",
        amazon: "Lush and untamed wilderness",
        antarctic: "Extreme, remote, and icy frontiers"
      }
    },
    {
      question: "What's your idea of adventure?",
      answers: {
        amazon: "Navigating dense rainforest canopies",
        reef: "Diving among coral reefs and marine life",
        glacier: "Hiking icy trails between mountains",
        venice: "Wandering through foggy, ancient streets",
        antarctic: "Expeditions across frozen landscapes"
      }
    },
    {
      question: "Which activity sounds most appealing?",
      answers: {
        reef: "Snorkeling or scuba diving in warm waters",
        venice: "Exploring art museums and historic landmarks",
        amazon: "Spotting rare wildlife deep in the jungle",
        glacier: "Photography of dramatic snowy peaks",
        antarctic: "Polar research and survival simulations"
      }
    },
    {
      question: "What kind of climate do you prefer?",
      answers: {
        reef: "Tropical and sunny",
        venice: "Mild and coastal",
        amazon: "Hot and humid",
        glacier: "Cool and crisp",
        antarctic: "Cold and challenging"
      }
    },
    {
      question: "Your ideal travel photo features:",
      answers: {
        glacier: "Towering glaciers or snowy landscapes",
        amazon: "Verdant jungle and exotic creatures",
        reef: "Colorful coral or clear ocean water",
        venice: "Elegant buildings and old-world charm",
        antarctic: "Endless white with a splash of orange parka"
      }
    },
    {
      question: "How do you define 'getting away from it all'?",
      answers: {
        venice: "Losing yourself in winding streets and local life",
        amazon: "Disappearing into nature, off-grid",
        antarctic: "Going where no one else goes",
        reef: "Floating above a quiet reef",
        glacier: "Peaceful isolation surrounded by snow"
      }
    },
    {
      question: "What’s most important to you on a last-chance trip?",
      answers: {
        venice: "Culture before it's gone",
        reef: "Natural wonder at risk",
        glacier: "Experiencing the cold before the melt",
        amazon: "Seeing rare biodiversity while you can",
        antarctic: "Touching the untouched"
      }
    }
  ];

  const destinationImages = {
    venice: {
      before: "/assets/venice_before.png",
      after: "/assets/venice_after.png"
    },
    reef: {
      before: "/assets/coral_reef_before.png",
      after: "/assets/coral_reef_after.png"
    },
    glacier: {
      before: "/assets/glacial_before.png",
      after: "/assets/glacial_after.png"
    },
    amazon: {
      before: "/assets/amazon_before.png",
      after: "/assets/amazon_after.png"
    },
    antarctic: {
      before: "/assets/antarctic_before.png",
      after: "/assets/antarctic_after.png"
    }
  };

  const destinationNames = {
    venice: "Venice, Italy",
    reef: "The Great Barrier Reef",
    glacier: "Glacier National Park",
    amazon: "The Amazon Basin",
    antarctic: "The Antarctic Peninsula"
  };

  const destinationLinks = {
    venice: "/destinations/venice/",
    reef: "/destinations/reef/",
    glacier: "/destinations/glacier/",
    amazon: "/destinations/amazon/",
    antarctic: "/destinations/antarctic/"
  };

  const form = document.getElementById("quiz-form");
  const quizContainer = document.getElementById("quiz-questions");
  const resultContainer = document.getElementById("quiz-result");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function renderQuiz() {
    quizData.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("mb-4");

      const questionTitle = document.createElement("h5");
      questionTitle.textContent = q.question;
      questionDiv.appendChild(questionTitle);

      const shuffledAnswers = shuffleArray(Object.entries(q.answers));

      shuffledAnswers.forEach(([key, text]) => {
        const label = document.createElement("label");
        label.classList.add("d-block", "my-1");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question${index}`;
        input.value = key;
        input.required = true;

        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + text));
        questionDiv.appendChild(label);

        input.addEventListener("change", function () {
          const allLabels = questionDiv.querySelectorAll("label");
          allLabels.forEach(lbl => lbl.classList.remove("selected"));
          label.classList.add("selected");
        });
      });

      quizContainer.appendChild(questionDiv);
    });
  }

  function calculateResult(formData) {
    const score = {
      venice: 0,
      reef: 0,
      glacier: 0,
      amazon: 0,
      antarctic: 0
    };

    for (const entry of formData.entries()) {
      score[entry[1]]++;
    }

    const winner = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
    return winner;
  }

  function showResult(destinationKey) {
    const imageBefore = destinationImages[destinationKey].before;
    const imageAfter = destinationImages[destinationKey].after;
    const name = destinationNames[destinationKey];
    const link = destinationLinks[destinationKey];

    resultContainer.innerHTML = `
      <div class="position-fixed top-0 start-0 w-100 h-100 overflow-hidden z-1">
        <img src="${imageBefore}" class="fade-img base position-absolute top-0 start-0 w-100 h-100 object-fit-cover" alt="${name} before">
        <img src="${imageAfter}" class="fade-img overlay position-absolute top-0 start-0 w-100 h-100 object-fit-cover" alt="${name} after">
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-5 py-4" style="background-color: rgba(15, 17, 33, 0.91); border-radius: 0.75rem; max-width: 90%;">
          <h3 class="mb-3">Your perfect destination is:</h3>
          <h1>${name}</h1>
          <a href="${link}" class="btn btn-primary">Explore ${name}</a>
          <br>
          <p class="mt-4">
            <button id="retake-quiz" class="btn btn-outline-light">Feel like this isn’t quite you? Try again.</button>
          </p>
        </div>
      </div>
    `;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const result = calculateResult(formData);
    showResult(result);
    form.style.display = "none";

    document.getElementById("retake-quiz").addEventListener("click", function () {
      resultContainer.innerHTML = "";
      form.reset();
      form.style.display = "block";
      quizContainer.innerHTML = "";
      renderQuiz();
    });
  });

  renderQuiz();
});
