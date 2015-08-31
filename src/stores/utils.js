export function isValidTotal(value) {
  return (typeof value) === 'number'
    && isFinite(value)
    && value >= 0;
}
