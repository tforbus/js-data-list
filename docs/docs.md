# H

H is a port of Haskell's Data.List into JavaScript.

## all

Determines if all elements satisfy predicate p.

**Parameters**

-   `p` **Function** predicate function
-   `xs` **Array** list

**Examples**

```javascript
all(x => x > 0, [1,2,3])
// => true
```

Returns **Boolean** 

## and

Returns the conjuction of a container of booleans.

**Parameters**

-   `xs` **Array** 

**Examples**

```javascript
and([true, true, false])
// => false
```

Returns **Boolean** 

## any

Determines if any elements satisfy predicate p.

**Parameters**

-   `p` **Function** predicate function
-   `xs` **Array** list

**Examples**

```javascript
any(x => x > 3, [1,2,3])
// => false
```

Returns **Boolean** 

## append

Append two lists.

**Parameters**

-   `xs` **Array** the first list
-   `ys` **Array** the second list

**Examples**

```javascript
append([1, 2, 3], [4, 5])
// => [1, 2, 3, 4, 5]
```

Returns **Array** 

## breakList

Returns an array of arrays xss, where the first element of xss is the longest 
prefix of xs elements that do not satisfy p, and the second element is the remainder 
of the list xs.
It is the equivalent of span (not p, xs)

**Parameters**

-   `p` **Function** predicate function
-   `xs` **Array** the list

**Examples**

```javascript
breakList(x => x < 3, [1, 2, 3, 4, 1, 2])
// => [ [1,2,3], [4,1,2] ]
```

Returns **Array&lt;Array&gt;** 

## concat

Concatenates a list of lists.

**Parameters**

-   `xss` **Array&lt;Array&lt;T&gt;&gt;** list of lists

**Examples**

```javascript
concat([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ])
// => [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Returns **Array&lt;T&gt;** 

## concatMap

Map a function over all elements of a container and concatenate the resulting lists.

**Parameters**

-   `f` **Function** function
-   `xss` **Array.Array** container

**Examples**

```javascript
concatMap(function (xs) { return filter(x > 3); }, [ [1,2,3], [4,5,6], [69] ])
// => [4,5,6,69]
```

Returns **Array** 

## cycle

Transforms a finite list into a circular one.

**Parameters**

-   `xs` **Array** 

**Examples**

```javascript
var infinite = cycle([1,2,3]);
infinite.next().value // 1
infinite.next().value // 2
infinite.next().value // 3
infinite.next().value // 1
```

## drop

Returns the suffix of xs after the first n elements, or [] if n > length xs.

**Parameters**

-   `n` **Number** number of elements to drop
-   `xs` **Array** the list

**Examples**

```javascript
drop(3, [10 ,20, 30, 40])
// => [40]
```

Returns **Array** 

## dropWhile

Returns the suffix remaining after takeWhile(p, xs).

**Parameters**

-   `p` **Function** predicate function returning a boolean
-   `xs` **Array** the list

**Examples**

```javascript
dropWhile(x => x < 3, [1, 2, 3, 4, 5])
// => [3,4,5]
```

Returns **Array** 

## dropWhileEnd

Drops the largest suffix of a list in which the predicate holds for all elements.

**Parameters**

-   `p` **Function** predicate function
-   `xs` **Array** the list

**Examples**

```javascript
dropWhileEnd(x => x < 3, [1, 5, 4, 3, 2, 1])
// => [1, 5, 4, 3]
```

Returns **Array** 

## filter

Return the elements in xs which satisfy predicate p.

**Parameters**

-   `p` **Function** the predicate
-   `xs` **Array** the list

**Examples**

```javascript
filter(x => x % 2 == 1, [1, 2, 3, 4, 5])
// => [1, 3, 5]
```

Returns **Array** 

## find

Return the first element in a list xs which matches predicate p.
Return null if the element does not exist.

**Parameters**

-   `p` **Function** the predicate function
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
find(x => x > 4, [1, 2, 3, 4, 5, 6])
// => 5
```

Returns **** 

## foldl

Left-associative fold of a list.

**Parameters**

-   `f` **Function** function to apply
-   `z` **Any** initial value
-   `xs` **Array** list

**Examples**

```javascript
// (1 - 1) - 2 - 3 - 4
foldl(x y => x - y, 1, [2,3,4])
// => -5
```

Returns **Any** 

## foldr

Right-associative fold of a list.

**Parameters**

-   `f` **Function** function to apply
-   `z` **Any** initial value
-   `xs` **Array** list

**Examples**

```javascript
// (2 / (3 / (1 / 4)))
foldr(x y => x / y, 1, [2, 3, 4])
// => 2.666
```

Returns **Any** 

## group

Takes a list and returns a list of lists such that the concatenation of the result
is equal to the argument. Moreover, each sublist in the result contains only equal 
elements.

**Parameters**

-   `xs` **Array** the list

**Examples**

```javascript
group([1, 1, 1, 2, 2, 3, 1])
// => [ [1,1,1], [2,2], [3], [1] ]
```

Returns **Array&lt;Array&gt;** 

## head

Extract the first element of a list, which must be non-empty.

**Parameters**

-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
head([1, 2, 3])
// => 1
```

Returns **T** 

## init

Returns all the elements of a list except the last one. The list must be non-empty.

**Parameters**

-   `xs` **Array** the list

**Examples**

```javascript
init([1, 2, 3])
// => [1,2]
```

Returns **Array** 

## inits

Returns all initial segments of the argument, shortest first.

**Parameters**

-   `xs` **Array** 

**Examples**

```javascript
inits([1, 2, 3])
// => [ [], [1], [1,2], [1,2,3] ]
```

Returns **Array&lt;Array&gt;** 

## intercalate

Inserts the list xs between the lists within xss and concatenates the result.

**Parameters**

-   `xs` **Array** list to insert
-   `xss` **Array&lt;Array&gt;** list of lists

**Examples**

```javascript
intercalate([0, 0], [ [1, 2], [3, 4], [5] ])
// => [1, 2, 0, 0, 3, 4, 0, 0, 5]
```

Returns **Array** 

## intersperse

Inserts x between each element of xs.

**Parameters**

-   `x` **Any** element to intersperse
-   `xs` **Array** list

**Examples**

```javascript
intersperse(0, [1, 2, 3])
// => [1, 0, 2, 0, 3]
```

Returns **Array** 

## isElem

List membership predicate. Returns if the element exists in the list.

**Parameters**

-   `x` **T** the element to check for
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
isElem(1, [1, 2, 3])
// => true
```

Returns **Boolean** 

## isEmpty

Test whether a list is empty.

**Parameters**

-   `xs` **Array** the list

**Examples**

```javascript
isEmpty([])
// => true
```

Returns **Boolean** 

## isNotElem

The negation of `isElem`.

**Parameters**

-   `x` **T** the element to check for
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
isElem(1, [1, 2, 3])
// => false
```

Returns **Boolean** 

## iterate

Returns an "infinite list" of repeated applications of a function f to x.

**Parameters**

-   `f` **Function** 
-   `x` **Any** 

**Examples**

```javascript
var increment = iterate(function (x) { return x + 1; }, 0);
// => increment.next().value // 0
// => increment.next().value // 1
```

Returns **Function** 

## last

Extract the last element of a list, which must be non-empty.

**Parameters**

-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
last([1, 2, 3])
// => 3
```

Returns **T** 

## length

Returns the length of a finite list as an int.

**Parameters**

-   `xs` **Array** the list

**Examples**

```javascript
length([10, 11, 12])
// => 3
```

Returns **Number** 

## lookup

Looks up a key in an object.

**Parameters**

-   `key` **String** object property
-   `hash` **Object** 

**Examples**

```javascript
lookup('foo', { foo: 1, bar: 2 })
// => 1
```

```javascript
lookup('foo', { bar: 2, baz: 3 })
// => undefined
```

Returns **** 

## map

map(fn, xs) is the list obtained by applying `fn` to each element of xs.
The function `fn` will be curried.

**Parameters**

-   `fn` **Function** the function to apply to each element in a list
-   `xs` **Array** the list

**Examples**

```javascript
map(x => x + 1, [1, 2, 3])
// => [2,3,4]
```

```javascript
map(function (x, y) { return x + y; }, [1, 2])
// => [ function (y) { return 1 + y }, function (y) { return 2 + y} ]
```

Returns **Array** 

## maximum

Returns the maximum value from a list, which must be non-empty, finite, 
and of an ordered type (able to be compared with simple operators >, <, =).

**Parameters**

-   `xs` **Array&lt;T&gt;** 

**Examples**

```javascript
maximum([10, 20, 30])
// => 30
```

Returns **T** 

## minimum

Returns the minimum value from a list, which must be non-empty, finite, 
and of an ordered type (able to be compared with simple operators >, <, =).

**Parameters**

-   `xs` **Array&lt;T&gt;** 

**Examples**

```javascript
minimum([10, 20, 30])
// => 10
```

Returns **T** 

## nth

List index operator, starting from 0.

**Parameters**

-   `n` **Number** the index
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
nth(1, [10, 20, 30])
// => 20
```

Returns **T** 

## or

Returns the disjuction of a container of booleans.

**Parameters**

-   `xs` **Array** 

**Examples**

```javascript
or([true, true, false])
// => true
```

Returns **Boolean** 

## partition

Returns a pair of lists, where the first list is a list containing elements from
xs which satisfy predicate p, and the second list contains elements from xs which do
not satisfy p.

**Parameters**

-   `p` **Function** the predicate
-   `xs` **Array** the list

**Examples**

```javascript
partition(x => x > 3, [1, 2, 3, 4, 5])
// => [ [4, 5], [1, 2, 3] ]
```

Returns **Array&lt;Array&gt;** 

## permutations

Returns a list of all permutations of a provided list.

**Parameters**

-   `xs` **Array&lt;T&gt;** 

**Examples**

```javascript
permutations([1,2,3])
 // => [ [1,2,3], [2,1,3], [3,2,1], [2,3,1], [3,1,2], [1,3,2] ]
```

Returns **Array.Array&lt;T&gt;** 

## product

Returns the product of all elements in the list.

**Parameters**

-   `xs` **Array** list

**Examples**

```javascript
sum([2,3,4])
// => 24
```

Returns **Boolean** 

## replicate

Returns of a list of length `n`, with each element being x.

**Parameters**

-   `n` **Integer** 
-   `x` **Any** 

**Examples**

```javascript
replicate(3, 1)
// => [1, 1, 1]
```

```javascript
replicate(3, {foo: 'bar'})
// => [ {foo: 'bar'}, {foo: 'bar'}, {foo: 'bar'} ]
```

Returns **Array** 

## reverse

Returns the elements of a list in reverse order. The list must be finite.

**Parameters**

-   `xs` **Array** 

**Examples**

```javascript
reverse([10, 20, 30])
// => [30, 20, 10]
```

Returns **Array** 

## scanl

Returns a list of successive reduced values from the left.

**Parameters**

-   `f` **Function** function to build with
-   `z` **Any** initial value
-   `xs` **Array** list

**Examples**

```javascript
scanl(x y => x / y, 64, [4, 2, 4])
// => [64, 16, 8, 2]
```

Returns **Array** 

## scanr

Returns a list of successive reduced values from the right.

**Parameters**

-   `f` **Function** function to build with
-   `z` **Any** initial value
-   `xs` **Array** list

**Examples**

```javascript
scanr(x y => x / y, 2, [100, 20, 10])
// => [25, 4, 5, 2]
```

Returns **Array** 

## span

Returns a list of lists where the first element is the longest prefix of xs that 
satisfies p, and the second element of the list is the remainder of the list.
It is the equivalent of calling [takeWhile(p, xs), dropWhile(p, xs)].

**Parameters**

-   `p` **Function** predicate function
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
span(x => x < 3, [1, 2, 3, 4, 1, 2, 3])
// => [ [1,2], [4,1,2,3] ]
```

Returns **Array&lt;Array&lt;T&gt;&gt;** 

## splitAt

Returns an array where the first element is xs prefix of length n, and the
second element is the remainder of the list.
It is equivalent to calling [take(n, xs) drop(n, xs)]

**Parameters**

-   `n` **Number** 
-   `xs` **Array&lt;T&gt;** 

**Examples**

```javascript
splitAt(3, [1, 2, 3, 4, 5])
// => [ [1,2,3], [4,5] ]
```

Returns **Array&lt;Array&lt;T&gt;&gt;** 

## stripPrefix

Drops the given prefix from a list. It returns null if the list does not start 
with the prefix or the list without the prefix if it does.

**Parameters**

-   `prefix` **Array** prefix list
-   `xs` **Array** queried list

**Examples**

```javascript
stripPrefix([1, 2, 3], [4, 5, 6])
// => null
```

```javascript
stripPrefix([1, 2, 3], [1, 2, 3, 4, 5, 6])
//=> [4, 5, 6]
```

Returns **** 

## subsequences

Returns the list of all subsequences of the argument (the powerset).

**Parameters**

-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
subsequences([1])
// => [ [], [1] ]
```

```javascript
subsequences([1,2,3])
// => [ [], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3] ]
```

Returns **Array.Array&lt;T&gt;** 

## sum

Returns the sum of all elements in the list.

**Parameters**

-   `xs` **Array** list

**Examples**

```javascript
sum([1,2,3])
// => 6
```

Returns **Boolean** 

## tail

Extract the elements after the head of a list, which must be non-empty.

**Parameters**

-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
tail([1, 2, 3])
// => [2, 3]
```

Returns **Array&lt;T&gt;** 

## tails

Returns all final segments of the argument, longest first.

**Parameters**

-   `xs` **Array&lt;T&gt;** 

**Examples**

```javascript
tails([1, 2, 3])
// => [ [1,2,3], [2,3], [3], [] ]
```

Returns **Array&lt;Array&lt;T&gt;&gt;** 

## take

Returns the first `n` elements of a list `xs`, or the entire list `xs` if n > length(xs)

**Parameters**

-   `n`  
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
take(3, [10, 20])
// => [10, 20]
```

```javascript
take(2, [10, 20, 30])
// => [10, 20]
```

Returns **Array&lt;T&gt;** 

## takeWhile

Return the longest prefix of xs of elements that satisfy predicate p.

**Parameters**

-   `p` **Function** function returning a boolean value
-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
takeWhile(x => x < 3, [1, 2, 3, 4, 5])
// => [1, 2]
```

```javascript
takeWhile(x => x < 0, [1, 2, 3, 4, 5])
// => []
```

Returns **Array&lt;T&gt;** 

## transpose

Transposes rows and columns of the arguments.

**Parameters**

-   `xss` **Array.Array&lt;T&gt;** 

**Examples**

```javascript
transpose([ [10,11], [20], [], [30,31,32] ])
// => [ [10,20,30], [11,31], [32] ]
```

Returns **Array.Array&lt;T&gt;** 

## uncons

Decompose a list into its head and tail.
If the list is empty, return null. If the list is non-empty, return a an object
containing the head and tail.

**Parameters**

-   `xs` **Array&lt;T&gt;** the list

**Examples**

```javascript
uncons([1,2, 3])
// => { head: 1, tail: [2, 3] }
```

Returns **Object&lt;T, Array&lt;T&gt;&gt;** 

## zip

Takes two lists and returns the corresponding pairs. If one input list is short,
excess elements of the longer list are discarded.

**Parameters**

-   `xs` **Array** first list
-   `ys` **Array** second list

**Examples**

```javascript
zip([1, 2], ['a', 'b', 'c'])
// => [[1, 'a'], [2, 'b']]
```

Returns **Array&lt;Array&gt;** 

## zipN

zipN is a generalized version of `zip`.
It zips an arbitrary amount of lists.

Returns **Array&lt;Array&gt;** 
