import Mock from "mockjs";
// 生成指定数据，随机生成1-4个指定字符串
// const data1 = Mock.mock({
//   //管道符之间不能有空格
//   "string|1-4": "学习",
//   //公式： '键|规则':'值'
// });
// console.log(data1);
// // 随机生成不定长度文本 word
// const data2 = Mock.mock({
//   //随机取一个3-10的范围文本
//   string: "@cword(3,10)",
// });
// console.log(data2);

// // 随机生成标题 title 和句子 sentence

// const data3 = Mock.mock({
//   title: "@ctitle(3,10)",
//   sentence: "@csentence(20,30)",
// });
// console.log(data3);

// // @c的意义，生成中文，没有c则生成英文
// // 句子和段落的区别：一个是逗号，一个是句号。

// const data4 = Mock.mock({
//   title: "@title(3,10)",
//   sentence: "@sentence(20,30)",
// });
// console.log(data4);

// // 生成段落文本 paragraph

// const data5 = Mock.mock({
//   paragraph: "@cparagraph",
// });
// console.log(data5);

// const data6 = Mock.mock({
//   paragraph: "@cparagraph(5)",
// });
// console.log(data6);

// // 随机生成1-100范围内的数字
// const data7 = Mock.mock({
//   "number|1-100": 1,
// });
// console.log(data7);

// // 生成增量id标识
// const data8 = Mock.mock({
//   id: "@increment()",
// });
// console.log(data8);

// // 随机生成身份证号码、人名、地址信息
// const data9 = Mock.mock({
//   idCard: "@id()",
//   name: "@cname()",
//   address: "@city(true)", //加true显示省级和市级，没有则显示市级
// });
// console.log(data9);

// // 随机生成一张指定图片
// const data10 = Mock.mock({
//   img_url: "@image('25,25','#fff','#e35ef1','png','唐时明月')",
//   //参数解释：图片宽高、背景颜色、文本颜色、图片类型、文本信息
// });
// console.log(data10);

// // 随机生成时间日期
// const data11 = Mock.mock({
//   date: "@date(yyyy-MM-dd hh:mm:ss)",
// });
// console.log(data11);

// // 随机生成指定范围的数组信息
// const data12 = Mock.mock({
//   "list|10-25": [{ idCard: "@id()", name: "@cname()", address: "@city(true)" }],
// });
// console.log(data12);

// 测试
const data13 = Mock.mock({
  "list|10-25": [
    {
      id: "@id()",
      date: "@date(yyyy-MM-dd)",
      endTime: "@date(yyyy-MM-dd)",
      planStartTime: "@date(yyyy-MM-dd)",
      planEndTime: "@date(yyyy-MM-dd)",
      startTime: "@date(yyyy-MM-dd)",
      title: "@ctitle()",
      plan: "@city(true)",
      "status|1": ["todo", "doing", "done"],
    },
  ],
});
console.log(data13);
