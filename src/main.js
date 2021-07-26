'use strict';

// main
loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items); // 버튼 클릭시 filter
  }) // 성공했을 경우
  .catch(console.log('!')) // 성공하지 못했을 경우

// json파일에서 아이템 받아오기
function loadItems() {
  return fetch('data/data.json') // 성공하면 response를 줌
  .then(response => response.json()) // 받아온 것을 json으로 변환
  .then(json => json.items)
}

// ul에 li추가해 보여지도록 하기
function displayItems(items) {
  const container = document.querySelector('.sale_list');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// item받아 li로 만들기
function createHTMLString(item) {
  return `
  <li class="list_item">
    <a href="" class="item_link">
      <img class="thumb" src="${item.image}" alt="${item.color} ${item.type}">
      <span>${item.gender}, ${item.size} size</span>
    </a>
  </li>
  `;
}

// 로고, 버튼 클릭시 원하는 것 목록 보여주기
function setEventListeners(items) {
  const logo = document.querySelector('.h_logo');
  const btns = document.querySelector('.gnb');
  logo.addEventListener('click', () => findItems(''));
  btns.addEventListener('click', (ev) => onButtonClick(ev, items));
}

// function onButtonClick(ev, items) {
//   if (ev.target.tagName === 'IMG') {
//     let result = items.filter(item => item.type === ev.target.alt)
//     displayItems(result);
//   }
//   if (ev.target.tagName === 'BUTTON') {
//     let colorArr = items.filter(item => item.color === ev.target.innerText.toLowerCase())
//     displayItems(colorArr);
//   }
// }

// dataset 이용
function onButtonClick(ev, items) {
  const dataset = ev.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) return;

  // displayItems(items.filter(item => item[key] === value));
  updateItems(items, key, value);
}

// 클릭될때마다 innerHTML이 바뀌는 대신 클래스 부여해 원하는 것만 나타나게함
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