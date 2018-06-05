import $ from 'node_modules/jquery'

class StopCommand {
  constructor(element) {
    this._element = element
  }

  execute() {
    const $video = $(this._element)

    if (!$video.prop('playing')) {
      return
    }

    const stream = $video.prop('stream')

    if (stream.getVideoTracks && typeof stream.getVideoTracks === 'function') {
      const tracks = stream.getVideoTracks()

      if (tracks && tracks[0] && tracks[0].stop) {
        tracks[0].stop()
      }
    } else if (stream.stop) {
      // Deprecated, may be removed in the near future
      stream.stop()
    }

    $video.prop('playing', false)
    $video.prop('stream', null)

    $video.trigger('camera:stop')
  }
}

export default StopCommand
