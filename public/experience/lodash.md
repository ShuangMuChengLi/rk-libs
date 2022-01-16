# lodash实用方法汇总
## 数组
### _.findIndex、_.findLastIndex
寻找目标项的下标
### _.initial
获取数组array中除了最后一个元素之外的所有元素
### _.intersection、_.intersectionBy、_.intersectionWith
给定数组的交集
### _.join
将 array 中的所有元素转换为由 separator 分隔的字符串。
### _.last
获取array中的最后一个元素。
### _.pullAt
根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。
### _.reverse
反转array
### _.tail
获取除了array数组第一个元素以外的全部元素。
### _.take、_.takeRight、_.takeRightWhile、_.takeWhile
创建一个数组切片，从array数组的起始元素开始提取n个元素。
### _.union、_.unionBy、_.unionWith
arrays（数组）的并集
### _.uniq、_.uniqBy、_.uniqWith
去重
### _.xor、_.xorBy、_.xorWith
异或

## 集合
### _.countBy
聚合统计
### _.forEach、_.each、_.forEachRight、_.eachRight
遍历
### _.every
判断每项为真
### _.filter
过滤出目标项
### _.find、_.findLast
寻找出目标相
### _.groupBy
分组
### _.keyBy
创建一个对应key的对象
### _.map
遍历数组并创建一个新的数组
### _.orderBy
排序
### _.partition
创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truthy（真值）的元素，第二组包含predicate（断言函数）返回为 falsey（假值）的元素。
### _.reject
_.filter的反向方法;
### _.sample、_.sampleSize
从collection（集合）中获得一个随机元素。
### _.size
获取对象或者数组大小
### _.some
通过 predicate（断言函数） 检查collection（集合）中的元素是否存在 任意 truthy（真值）的元素，一旦 predicate（断言函数） 返回 truthy（真值），遍历就停止。
### _.sortBy
排序

## 函数
### _.debounce
防抖动
### _.negate
创建一个针对断言函数 func 结果取反的函数。
### _.once
创建一个只能调用 func 一次的函数。
### _.throttle
节流函数
### _.unary
创建一个最多接受一个参数的函数，忽略多余的参数。

## 语言
### _.clone、_.cloneWith
创建一个 value 的浅拷贝。
### _.cloneDeep、_.cloneDeepWith
深拷贝
### _.eq
执行SameValueZero 比较两者的值，来确定它们是否相等。
### _.isArray
检查 value 是否是 Array 类对象。
### _.isArrayLike
检查 value 是否是类数组。
### _.isElement
检查 value 是否是可能是 DOM 元素。
### _.isEmpty
检查 value 是否为一个空对象，集合，映射或者set。
### _.isEqual、_.isEqualWith
执行深比较来确定两者的值是否相等。
### _.isNaN
检查 value 是否是 NaN。
### _.isNil
检查 value 是否是 null 或者 undefined。
### _.isString
检查 value 是否是原始字符串String或者对象。
### _.toArray
转换 value 为一个数组。

## 数学
### _.max、_.maxBy
计算 array 中的最大值。
### _.mean、_.meanBy
计算 array 的平均值。
### _.min、_.minBy
计算 array 中的最小值。
### _.round
四舍五入
### _.sum、_.sumBy
求总和
### _.random
返回区间内随机数

## 对象
### _.defaults、_.defaultsDeep
对象设置属性默认值
### _.findKey、_.findLastKey
返回对象中匹配值的key值
### _.get
根据 object对象的path路径获取值。 
### _.has、_.hasIn
检查 path 是否是object对象的直接属性。
### _.assign、_.extend、_.extendWith、_.merge、_.mergeWith
合并对象。
### _.pick、_.pickBy
创建一个从 object 中选中的属性的对象。

## 字符串
### _.camelCase
转换字符串string为驼峰写法。
### _.capitalize
转换字符串string首字母为大写，剩下为小写。
### _.escape、_.unescape
转义（反转义）string中的HTML实体字符
### _.toLower
转换整个string字符串的字符为小写
### _.toUpper
转换整个string字符串的字符为大写
### _.repeat
重复 N 次给定字符串。
### _.trim
从string字符串中移除前面和后面的 空格 或 指定的字符。

## 其他
### _.defaultTo
设置默认值
### _.range
创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 






















