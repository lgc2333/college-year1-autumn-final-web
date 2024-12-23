/* eslint-disable no-var */

import * as FloatingUiDOMImport from '@floating-ui/dom'
import mediumZoomImport from 'medium-zoom'
import * as SimpleBarImport from 'simplebar'

declare global {
  var SimpleBar: typeof SimpleBarImport.default
  var FloatingUIDOM: typeof FloatingUiDOMImport
  var mediumZoom: typeof mediumZoomImport
}
