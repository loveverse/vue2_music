# vue2-music

## 实现的功能
```
网易热评已实现，每个1小时，获取一条网易热评，添加到自己数据库
使用white-space解决渲染时换行清除的问题
实现分页器，同时页面刷新保证还在当时页码
热评倒序显示，每次可以看到最新内容
实现tip提示过期时间
待实现：数据没拿到时添加骨架屏
网易云热评基本实现（实现）
需求：实现home主页的书摘（具备增删改查功能）

```

## 上线修改
```
origin
ws地址
```


## bug未解决
```
使用localStorage设置过期时间，存在问题，第一次进去设置过期时间后，时间过了限定时间，但是因为mounted只要不关闭，过期时间就不会消失，所以只有下次切换页面才会清除，会导致过期时间清除不准确（解决）
WebSocket会话当第一个用户点击提交，第二个用户不刷新，第二个用户提交，后面都同步刷新了
```