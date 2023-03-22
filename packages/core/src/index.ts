import { Virastar } from './Virastar'
import type { VirastarOptions } from './VirastarOptions'

export { Virastar } from './Virastar'

export default function (options?: VirastarOptions) {
  return new Virastar(options)
}
