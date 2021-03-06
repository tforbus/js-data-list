# H.js
This library will be a JavaScript port of Haskell's Data.list.
Each function will be able to be partially applied, just like in Haskell.

Eventually some functions may be able to handle infinite lists, but that is a stretch goal.

## Implemented
- (++) as append
- head
- last
- tail
- tails
- init
- inits
- uncons
- null as isEmpty
- length
- map
- reverse
- maximum
- minimum
- take
- drop
- splitAt
- stripPrefix
- takeWhile
- dropWhile
- dropWhileEnd
- group
- span
- break as breakList
- (!!) as nth
- zip
- zip3 -- zip7 as zipN
- elem as isElem
- notElem as isNotElem
- lookup
- find
- filter
- partition
- intersperse
- intercalate
- subsequences
- permutations
- transpose
- foldr
- foldl
- and
- or
- any
- all
- sum
- product
- concatMap
- scanl
- scanr
- iterate
- replicate
- cycle

## Todo
- mapAccumL (useful?)
- mapAccumR (useful?)
- repeat (NOTE: hold off until Proxy object works?)
- unfoldr
- isPrefixOf
- isSuffixOf
- isInfixOf
- isSubsequenceOf
- elemIndex
- elemIndices
- findIndex
- findIndices
- zipWith (all)
- unzip (all)
- lines
- words
- unlines
- unwords
- nub
- delete
- union
- intersect
- sort
- sorOn
- insert
- nubBy
- deleteBy
- deleteFirstBy
- unionBy
- intersectBy
- groupBy
- sortBy
- insertBy
- maximumBy
- minimumBy
