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
