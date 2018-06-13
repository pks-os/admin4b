import $ from 'node_modules/jquery'
import CameraBlob from './camera-blob'

const sizeRegex = /^(\d+)x(\d+)$/gi

class SnapshotCommand {
  constructor(element) {
    this._element = element
  }

  _getSize(size) {
    if (!size || !size.match(sizeRegex)) {
      return { width: 320, height: 240 }
    }

    const matches = sizeRegex.exec(size)

    return { width: matches[1], height: matches[2] }
  }

  execute() {
    const $video = $(this._element)

    if (!$video.prop('playing')) {
      return
    }

    const video = $video.get(0)
    const size = this._getSize($video.attr('data-size'))

    const canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height

    const context = canvas.getContext('2d')
    context.translate(size.width, 0) // 'translate' and 'scale' to flip horizontally
    context.scale(-1, 1)
    context.drawImage(video, 0, 0, size.width, size.height)

    const dataURL = canvas.toDataURL()
    const blob = new CameraBlob(dataURL).toBlob()

    blob.dataURL = dataURL

    $video.trigger('camera:snapshot', blob)
  }
}

export default SnapshotCommand
