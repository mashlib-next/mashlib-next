import { OLO, DC, DCT, SCHEMA } from "@mashlib-next/utils";

function extractTracks(subject, store) {
  const slots = store.each(subject, OLO("slot"), null, null);
  const tracks = [];
  for (const slot of slots) {
    const indexNode = store.any(slot, OLO("index"), null, null);
    const itemNode = store.any(slot, OLO("item"), null, null);
    if (!itemNode) continue;
    const item = itemNode;
    const title = store.any(item, DC("title"), null, null)?.value
      ?? store.any(item, DCT("title"), null, null)?.value
      ?? store.any(item, SCHEMA("name"), null, null)?.value
      ?? item.value;
    const videoUrl = store.any(item, SCHEMA("video"), null, null)?.value
      ?? store.any(item, SCHEMA("contentUrl"), null, null)?.value
      ?? void 0;
    tracks.push({
      index: indexNode ? Number(indexNode.value) : 0,
      title,
      uri: item.value,
      videoUrl,
    });
  }
  tracks.sort((a, b) => a.index - b.index);
  return tracks;
}

function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function createMediaElement(track) {
  const figure = document.createElement("figure");
  figure.className = "playlist-media";

  if (track.videoUrl) {
    const youtubeId = extractYouTubeId(track.videoUrl);
    if (youtubeId) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
      iframe.width = "560";
      iframe.height = "315";
      iframe.title = track.title;
      iframe.allowFullscreen = true;
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      figure.appendChild(iframe);
    } else {
      const video = document.createElement("video");
      video.src = track.videoUrl;
      video.controls = true;
      video.width = 560;
      figure.appendChild(video);
    }
  }

  const caption = document.createElement("figcaption");
  caption.className = "playlist-caption";
  caption.textContent = track.title;
  figure.appendChild(caption);

  return figure;
}

function renderPlaylist(subject, store, container) {
  container.innerHTML = "";

  const playlistTitle = store.any(subject, DC("title"), null, null)?.value
    ?? store.any(subject, DCT("title"), null, null)?.value
    ?? store.any(subject, SCHEMA("name"), null, null)?.value
    ?? "Untitled Playlist";

  const tracks = extractTracks(subject, store);
  if (tracks.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No tracks found in this playlist.";
    container.appendChild(empty);
    return;
  }

  let currentIndex = 0;

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "playlist-container";
  wrapper.setAttribute("role", "region");
  wrapper.setAttribute("aria-label", playlistTitle);

  // Header
  const header = document.createElement("h2");
  header.className = "playlist-title";
  header.textContent = playlistTitle;
  wrapper.appendChild(header);

  // Player area — holds figure + nav
  const playerArea = document.createElement("div");
  playerArea.className = "playlist-player";
  wrapper.appendChild(playerArea);

  // Track list
  const list = document.createElement("ol");
  list.className = "playlist-tracks";
  for (let i = 0; i < tracks.length; i++) {
    const li = document.createElement("li");
    li.className = "playlist-track";
    if (i === 0) li.classList.add("playlist-track--active");
    li.dataset.uri = tracks[i].uri;

    const btn = document.createElement("button");
    btn.className = "playlist-track-btn";
    btn.textContent = tracks[i].title;
    btn.setAttribute("aria-label", `Play ${tracks[i].title}`);
    btn.addEventListener("click", () => showTrack(i));
    li.appendChild(btn);
    list.appendChild(li);
  }
  wrapper.appendChild(list);
  container.appendChild(wrapper);

  function showTrack(idx) {
    currentIndex = idx;
    const track = tracks[idx];

    // Rebuild player area
    playerArea.innerHTML = "";

    // Media figure
    const figure = createMediaElement(track);
    playerArea.appendChild(figure);

    // Navigation
    if (tracks.length > 1) {
      const nav = document.createElement("nav");
      nav.className = "playlist-nav";
      nav.setAttribute("aria-label", "Playlist navigation");

      const prev = document.createElement("button");
      prev.className = "playlist-nav-link";
      prev.setAttribute("aria-label", "Previous track");
      prev.textContent = "\u25C0 Previous";
      prev.addEventListener("click", () => {
        showTrack((currentIndex - 1 + tracks.length) % tracks.length);
      });
      nav.appendChild(prev);

      const info = document.createElement("span");
      info.className = "playlist-slot-info";
      info.setAttribute("aria-current", "true");
      info.textContent = `${idx + 1} / ${tracks.length}`;
      nav.appendChild(info);

      const next = document.createElement("button");
      next.className = "playlist-nav-link";
      next.setAttribute("aria-label", "Next track");
      next.textContent = "Next \u25B6";
      next.addEventListener("click", () => {
        showTrack((currentIndex + 1) % tracks.length);
      });
      nav.appendChild(next);

      playerArea.appendChild(nav);
    }

    // Update active track in list
    const items = list.querySelectorAll(".playlist-track");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.toggle("playlist-track--active", i === idx);
    }
  }

  // Show first track
  showTrack(0);
}

export { renderPlaylist };
