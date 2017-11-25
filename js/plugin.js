$.fn.myPlugin = function(options) {
  const elem = $(this);

  options = {
    color: options.color || 'red',
    afterClick: options.afterClick || $.noop
  }

  elem.on('click', e => {
    elem.css('color', options.color);
    options.afterClick();
  })

  return {
    drawColor() {
      elem.css('color', options.color)
    }
  }
}

const link = $('.link').myPlugin({
  color: 'green',
  afterClick: function() {
    console.log('was clicked');
  }
});

$('.draw').on('click', e => {
  e.preventDefault()
  link.drawColor();
})