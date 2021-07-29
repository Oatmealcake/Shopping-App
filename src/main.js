'use strict';

/* main */
loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items); // 버튼 클릭시 filter
  }) // 성공했을 경우
  .catch(console.log) // 성공하지 못했을 경우

/* json파일에서 items 받아오기 */
function loadItems() {
  return fetch('data/data.json') // 성공하면 response를 줌
  .then(response => response.json()) // 받아온 것을 json으로 변환
  .then(json => json.items)
}

/* ul에 리스트 추가 */
function displayItems(items) {
  const container = document.querySelector('.sale_list');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

/* item 받아 li로 변환 */
function createHTMLString(item) {
  return `
  <li class="list_item">
    <a href="" class="item_link">
      <img class="thumb" src=${item.image} alt="${item.color} ${item.type}">
      <span>${item.gender}, ${item.size} size</span>
    </a>
  </li>
  `;
}

/* 로고, 버튼에 클릭이벤트 추가 */
function setEventListeners(items) {
  const logo = document.querySelector('.h_logo');
  const btns = document.querySelector('.gnb');
  logo.addEventListener('click', () => showSelectedItems(''));
  btns.addEventListener('click', (ev) => onButtonClick(ev, items));
}

/* dataset 받아 업데이트 함수 실행 */
function onButtonClick(ev, items) {
  const dataset = ev.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) return;

  updateItems(items, key, value);
}

/* 버튼의 value와 items의 type/color 값 비교 */
function updateItems(items, key, value) {
  items.forEach(item => {
    if (item[key] === value) {
      showSelectedItems(value);
    }
  });
}

/* 해당 value와 일치하는 항목들만 보이기 */
function showSelectedItems(value) {
  const saleList = document.querySelectorAll('.sale_list > .list_item');
  
  saleList.forEach(list => {
    if (list.querySelector('img').alt.indexOf(value) >= 0) list.classList.remove('invisible');
    else list.classList.add('invisible');
  })
}