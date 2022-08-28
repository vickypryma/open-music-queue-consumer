const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPlaylistSongs(id) {
    const query = {
      text: `SELECT songs.song_id as id, songs.title, songs.performer
      FROM playlist_songs
      JOIN songs ON songs.song_id = playlist_songs.song_id
      JOIN playlists ON playlists.id = playlist_songs.playlist_id
      WHERE playlists.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistService;
