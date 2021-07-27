# Shopping App
[드림코딩 쇼핑몰 미니게임](https://academy.dream-coding.com/courses/mini-shopping)을 참고하여 만들어졌습니다.<br><br>

## 사용 스택
**HTML, CSS, JS**<br><br>

## 미리 보기
원하는 것을 선택할 수 있는 버튼과 목록들로 구성되어있는 간단한 어플
<br>버튼을 누르면 해당하는 항목의 리스트만 보여질 수 있도록 함
<br><br>
<img src="https://user-images.githubusercontent.com/78004140/127156463-a763ee0e-40f4-4716-8c65-7679a1f2fa2b.png" width="600px">
<br>처음 열게되면 볼 수 있는 기본 화면으로 정해진 리스트의 영역보다 내용물이 길어지면, 스크롤을 할 수 있도록 제작
<br><br>

<img src="https://user-images.githubusercontent.com/78004140/127156875-1139fdee-5a20-4b19-abd8-0adcb1e44376.png" width="600px">
<br>버튼을 클릭했을 때 출력되는 화면이다. 현재 티셔츠버튼을 선택해 목록 중 티셔츠인 항목만 보여주고있다.<br><br>

## 구현 방식
JSON파일을 이용해 목록을 동적으로 업데이트 할 수 있도록 함
<br>JSON파일의 내용을 받아오면서 리스트의 li로 변환하는 createHTMLString 함수 사용 -> displayItems 함수를 이용해 기존 ul에 자식으로 추가
<br>버튼을 누르면 innerHTML에 필터링 된 아이템들을 넣는 대신,
<br>처음 불러온 innerHTML을 유지하며 display none, block 을 사용해 선택된 것만 보이도록 수정<br>
```js
function updateItems(items, key, value) {
  items.forEach(item => {
    if (item[key] === value) {
      findItems(value);
    }
  });
}

function findItems(value) {
  const saleList = document.querySelectorAll('.sale_list > .list_item');
  
  saleList.forEach(list => {
    if (list.querySelector('img').alt.indexOf(value) >= 0) list.classList.remove('invisible');
    else list.classList.add('invisible');
  })
}
```