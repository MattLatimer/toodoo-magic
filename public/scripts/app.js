/*
Hard coded user info for dev <--------------------------------TODO REMOVE HARDCODE USER WHEN COOKIE PARSING IS DONE--------------------
*/
const full_name   = 'Andy Leung';
const email       = 'andy@email.com';
const pw_hash     = 'l3g1th4sh';
const catId       = 1;
const userId      = 1;

/* DONE renderITem function merge with renderItems eventurally*/
// Helper functions
// function renderItem(item) {
//   $(`.${item.categories_id}`).append($("<li>").text(item.content).append(`<button> Edit</button>`));
// }

// const categoryMap = {
//   "To Watch": "1",
//   "To Read": "2",
//   "To Eat": "3",
//   "To Buy": "4",
//   "Uncategorized": "5"
// };

function renderItems(items) {
  for (let item of items){
    const containerID = "." + item.categories_id;
    $(containerID).append($("<li>").text(item.content).attr('data-item-id', item.id));
  }
}

// Calls to /general
function loadItems(){
  $.ajax({
    url: "/items",
    method: "GET",
    dataType: "json",
    success: (items) => {
      // console.log(items);
      renderItems(items);
    }
  })
}

$(() => {
  loadItems();
})

// Calls to /items
$(() => {
  $('#addItem').on('click', (e) => {
    e.preventDefault();
    const itemContent = $('#todoForm').val();
    $.ajax({
      url: "/items",
      method: "POST",
      data: { itemContent: itemContent, userid: userId }, //<-------------TODO REMOVE HARDCODE USER WHEN COOKIE PARSING DONE------------------
      success: function(item) {
        // loadNewItem(item);
        console.log(item);
        renderItems(item);
        $('#navbar').find('textarea[name="text"]').val('');
      }
    })
  })
})

// Calls to /users