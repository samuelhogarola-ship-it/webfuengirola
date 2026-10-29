(function () {
  "use strict";

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();
  }

  function init(form) {
    var input = form.querySelector("[data-blog-search-input]");
    var grid = document.querySelector("[data-blog-grid]");
    var empty = document.querySelector("[data-blog-search-empty]");
    if (!input || !grid || !empty) return;

    var cards = Array.prototype.slice.call(
      grid.querySelectorAll(".blog-card"),
    );

    function filter() {
      var query = normalize(input.value.trim());
      var visible = 0;
      cards.forEach(function (card) {
        var matches = !query || normalize(card.textContent).includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      empty.hidden = visible !== 0;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      filter();
    });
    input.addEventListener("input", filter);
  }

  document.querySelectorAll("[data-blog-search]").forEach(init);
})();
