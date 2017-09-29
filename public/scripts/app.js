/*
Hard coded user info for dev
*/
const full_name   = 'Andy Leung';
const email       = 'andy@email.com';
const pw_hash     = 'l3g1th4sh';
const catId       = 1;
const userId      = 1;

/* TODO renderITem function merge with renderItems eventurally*/
// Helper functions
function renderItem(item) {
  $('#movies').append(`<li>${item}</li>`);
}

const categoryMap = {
  'To Watch': "movies",
  'To Read': "books",
  'To Eat': "restaurants",
  'To Buy': "products",
  'Uncategorized': "uncategorized"
}

function renderItems(items) {
  for (let item of items){
    // 
    const containerID = '#' + categoryMap[item.title]
    $(containerID).append(`<li>`).text(item.content);  
  }
}

function loadNewItem() {
  $.ajax({
    url: "/items",
    method: "GET",
    success: (item) => {
      renderItem(item);
    }
  })
}

// Calls to /general
function loadItems(){
  $.ajax({
    url: "/items",
    method: "GET",
    dataType: "json",
    success: (items) => {
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
    const itemContent = $('#todo').val();
    $.ajax({
      url: "/items",
      method: "POST",
      data: { itemContent: itemContent, catid: catId, userid: userId },
      success: function() {
        // loadNewItem();
        renderItem(itemContent);
        $('#navbar').find('textarea[name="text"]').val('');
      }
    })
  })
})

// Calls to /users
$(() => {
  $('.edit')
})