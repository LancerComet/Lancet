import Color from 'color'

type RgbaColorString = string
type HexColorString = string

/**
 * Make color lighter.
 *
 * @param color Original color value.
 * @param amount Lighten amount, 0 - 1.
 */
const lighten = (color: string, amount: number): HexColorString => {
  return new Color(color).lighten(amount).hex()
}

/**
 * Make color darker.
 *
 * @param color Original color value.
 * @param amount Darken amount, 0 - 1.
 */
const darken = (color: string, amount: number): HexColorString => {
  return new Color(color).darken(amount).hex()
}

/**
 * Set color opacity and return its RGBA value.
 *
 * @param color
 * @param opacity
 */
const setOpacity = (color: string, opacity: number): RgbaColorString => {
  return new Color(color).alpha(opacity).toString()
}

export {
  lighten,
  darken,
  setOpacity
}
