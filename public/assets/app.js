'use strict'

const $ = require('jquery')

// INPUT/OUTPUT
$(document).ready(function () {
  // Fokus Input-Feld
  $('input#userInput').focus()
  // Bei Klick in Coinainter - Fokus auf Input-Feld
  $('body').keydown(function () {
    $('input#userInput').focus()
  })
  // Enter (Key 13)
  $('input#userInput').keyup(function (event) {
    if (event.keyCode === 13 && !$('p.MASCHINE').is(':empty')) {
      // Absätze erzeugen, nach letzten <p>
      $('p.MASCHINE').last().after('<p class="user" id="inputOutput"></p><p class="MASCHINE" id="output"></p>')
      // User Input $user: Output
      $('p.user#inputOutput').text($(this).val())
      // Variable für Input
      let input = $('p.user#inputOutput').text()
      input = input.replace(/\+/, '[plus]')
      // user input Id entfernen
      $('p.user#inputOutput').removeAttr('id')
      // Input-Feld zurücksetzen
      $('input#userInput').val('')

      window.fetch('/io', { method: 'POST', body: JSON.stringify({ input }) }).then(res => res.json()).then(res => {
        document.getElementById('output').innerHTML = '<p>' + res.text + '</p>'
      })

      // Scroll to Bottom
      $('p.MASCHINE').on('DOMSubtreeModified', function () {
        $('html, body').animate({
          scrollTop: $(document).height()
        }, 'slow')
      })
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow')
    }
  })
})
