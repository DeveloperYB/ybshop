|# YB shop

## 목적 : Node js로 E-commerce 쇼핑몰을 구현해본다.

## API
|액션|코드|
|---|---|
|전체 불러오기|models.Products.findAll(조건)|
|하나만 불러오기|models.Products.findByPk(아이디)<br/>models.Products.findOne(조건)|
|작성하기|models.Products.create(req.body)|
|수정하기|models.Products.update( req.body, 조건 )|
|삭제하기|models.Products.destroy(조건)|


## TODO
2019.09.04

polymophic
---
리소스 타입, 아이디

1. 노드에서의 개념 알아보기 폴리모픽

2. 노드의 레일즈 irb 찾아보기
