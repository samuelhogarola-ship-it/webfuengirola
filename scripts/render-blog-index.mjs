function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderBlogIndexMain({
  homeHref,
  homeLabel,
  blogLabel,
  languageSwitcher,
  badge,
  title,
  titleLines,
  description,
  searchLabel,
  searchPlaceholder,
  searchButton,
  emptyMessage,
  listingLabel,
  listingTitle,
  cards,
}) {
  return `<main>
    <section class="subpage-hero blog-hero blog-hero--index">
      <div class="container blog-hero__inner">
        <nav class="project-breadcrumb" aria-label="Breadcrumb"><a href="${homeHref}">${escapeHtml(homeLabel)}</a><span>/</span><span>${escapeHtml(blogLabel)}</span></nav>
        ${languageSwitcher}
        <span class="badge">${escapeHtml(badge)}</span>
        <h1 class="subpage-hero__title">${titleLines?.length ? titleLines.map((line) => `<span>${escapeHtml(line)}</span>`).join("") : escapeHtml(title)}</h1>
        <p class="subpage-hero__sub">${escapeHtml(description)}</p>
        <form class="blog-search" role="search" data-blog-search>
          <label class="sr-only" for="blog-search-input">${escapeHtml(searchLabel)}</label>
          <input id="blog-search-input" type="search" placeholder="${escapeHtml(searchPlaceholder)}" autocomplete="off" data-blog-search-input />
          <button type="submit" class="btn btn--primary">${escapeHtml(searchButton)}</button>
        </form>
      </div>
    </section>
    <section class="service-detail blog-listing">
      <div class="container">
        <div class="section-header blog-listing__header">
          <span class="section-label">${escapeHtml(listingLabel)}</span>
          <h2 class="section-title">${escapeHtml(listingTitle)}</h2>
        </div>
        <div class="blog-grid" data-blog-grid>
          ${cards}
        </div>
        <p class="blog-search__empty" data-blog-search-empty hidden>${escapeHtml(emptyMessage)}</p>
      </div>
    </section>
  </main>`;
}
