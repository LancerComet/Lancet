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

/**
 * Set brightness of the color.
 * Based on the HSL algorithm.
 *
 * @param color
 * @param amount LT 0.
 */
const setBrightness = (color: string, amount: number): HexColorString => {
  const colorObj = new Color(color)
  const newValue = colorObj.lightness() * amount
  return colorObj.lightness(newValue).hex()
}

export {
  lighten,
  darken,
  setOpacity,
  setBrightness
}
