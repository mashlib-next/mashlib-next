import { register } from '@mashlib-next/pane-registry'
import { playlistPane } from './playlist-pane.js'

// Self-registering: importing this module registers the playlist pane
register(playlistPane)

export { playlistPane }
