/*
Hard coded user info for dev
*/
const full_name   = 'Andy Leung';
const email       = 'andy@email.com';
const pw_hash     = 'l3g1th4sh';
const catId       = 1;
const userId      = 1;

// Helper functions
function renderItem(item) {
  $('#movies').append($("<li>").text(item));
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