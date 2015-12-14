/**
 * Test if a structure is empty.
 *
 * In Haskell this function is called `null`.
 *
 * Example:
 * null([]) == true
 * null('') == true
 */
export default function isEmpty(xs) {
    return xs && !xs.length;
}
