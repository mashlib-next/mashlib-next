import { OLO, DC, DCT, SCHEMA } from "@mashlib-next/utils";
function extractTracks(subject, store) {
  const slots = store.each(subject, OLO("slot"), null, null);
  const tracks = [];
  for (const slot of slots) {
    const indexNode = store.any(slot, OLO("index"), null, null);
    const itemNode = store.any(slot, OLO("item"), null, null);
    if (!itemNode) continue;
    const item = itemNode;
    const title = store.any(item, DC("title"), null, null)?.value ?? store.any(item, DCT("title"), null, null)?.value ?? store.any(item, SCHEMA("name"), null, null)?.value ?? item.value;
    const videoUrl = store.any(item, SCHEMA("video"), null, null)?.value ?? store.any(item, SCHEMA("contentUrl"), null, null)?.value ?? void 0;
    tracks.push({
      index: indexNode ? Number(indexNode.value) : 0,
      title,
      uri: item.value,
      videoUrl
    });
  }
  tracks.sort((a, b) => a.index - b.index);
  return tracks;
}
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
function renderPlaylist(subject, store, container) {
  container.innerHTML = "";
  const playlistTitle = store.any(subject, DC("title"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? "Untitled Playlist";
  const header = document.createElement("h2");
  header.textContent = playlistTitle;
  container.appendChild(header);
  const tracks = extractTracks(subject, store);
  if (tracks.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No tracks found in this playlist.";
    container.appendChild(empty);
    return;
  }
  const list = document.createElement("ol");
  list.className = "playlist-tracks";
  for (const track of tracks) {
    const li = document.createElement("li");
    li.className = "playlist-track";
    li.dataset.uri = track.uri;
    const titleEl = document.createElement("span");
    titleEl.className = "track-title";
    titleEl.textContent = track.title;
    li.appendChild(titleEl);
    if (track.videoUrl) {
      const videoContainer = document.createElement("div");
      videoContainer.className = "track-video";
      const youtubeId = extractYouTubeId(track.videoUrl);
      if (youtubeId) {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
        iframe.width = "560";
        iframe.height = "315";
        iframe.allowFullscreen = true;
        iframe.setAttribute("loading", "lazy");
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        videoContainer.appendChild(iframe);
      } else {
        const video = document.createElement("video");
        video.src = track.videoUrl;
        video.controls = true;
        video.width = 560;
        videoContainer.appendChild(video);
      }
      li.appendChild(videoContainer);
    }
    list.appendChild(li);
  }
  container.appendChild(list);
}
export {
  renderPlaylist
};
