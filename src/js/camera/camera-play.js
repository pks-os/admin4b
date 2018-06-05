import $ from 'node_modules/jquery'

navigator.getSupportedUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

class PlayCommand {
  constructor(element) {
    this._element = element
  }

  _link(stream) {
    const video = $(this._element).get(0)

    if ('srcObject' in video) {
      video.srcObject = stream
    } else if (navigator.mozGetUserMedia) {
      video.mozSrcObject = stream
    } else {
      const windowURL = window.URL || window.webkitURL || window.mozURL || window.msURL
      video.src = windowURL.createObjectURL(stream)
    }
  }

  _onSuccess(stream) {
    const $video = $(this._element)

    this._link(stream)

    $video.get(0).play()
    $video.prop('stream', stream)
    $video.prop('playing', true)
    $video.trigger('camera:play')
  }

  _onFailure(error) {
    const $video = $(this._element)
    $video.trigger('camera:error', error)
  }

  execute() {
    const $video = $(this._element)

    if ($video.prop('playing')) {
      return
    }

    if (!navigator.getSupportedUserMedia) {
      $video.trigger('camera:notSupported')
      return
    }

    const mediaConstraint = { video: true, audio: false }

    navigator.getSupportedUserMedia(mediaConstraint,
      (stream) => this._onSuccess(stream),
      (error) => this._onFailure(error))
  }
}

export default PlayCommand
