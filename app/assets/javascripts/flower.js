$(function() {
  let search_list = $(".right2");

  function appendFlower(flower) {
    var html = `
    <div class="right2_main">
      <div class="right2_main_nation">
        ${flower.nation}
      </div>
      <div class="right2_main_loc">
        ${flower.locomotion}
      </div>
      <div class="right2_main_name">
        ${flower.name}
      </div>
      <div class="right2_main_atr" value="${flower.job}">
        ${flower.job}
      </div>
      <div class="right2_main_skill">
        ${flower.skill}
      </div>
      <div class="ability">
        <div class="ability-box">
          <div class="ability-box_1">
            ${flower.a1}
          </div>
          <div class="ability-box_2">
            ${flower.a2}
          </div>
          <div class="ability-box_3">
            ${flower.a3}
          </div>
          <div class="ability-box_4">
            ${flower.a4}
          </div>
        </div>
        <div class="ability-box">
          <div class="ability-box_1">
            ${flower.b1}
          </div>
          <div class="ability-box_2">
            ${flower.b2}
          </div>
          <div class="ability-box_3">
            ${flower.b3}
          </div>
          <div class="ability-box_4">
            ${flower.b4}
          </div>
        </div>
        <div class="ability-box">
          <div class="ability-box_1">
            ${flower.c1}
          </div>
          <div class="ability-box_2">
            ${flower.c2}
          </div>
          <div class="ability-box_3">
            ${flower.c3}
          </div>
          <div class="ability-box_4">
            ${flower.c4}
          </div>
        </div>
        <div class="ability-box">
          <div class="ability-box_1">
            ${flower.d1}
          </div>
          <div class="ability-box_2">
            ${flower.d2}
          </div>
          <div class="ability-box_3">
            ${flower.d3}
          </div>
          <div class="ability-box_4">
            ${flower.d4}
          </div>
        </div>
        <div class="ability-box">
          <div class="ability-box_1">
            ${flower.e1}
          </div>
          <div class="ability-box_2">
            ${flower.e2}
          </div>
          <div class="ability-box_3">
            ${flower.e3}
          </div>
          <div class="ability-box_4">
            ${flower.e4}
          </div>
        </div>
        <div class="ability-box">
          <div class="ability-box_b1">
            ${flower.f1}
          </div>
          <div class="ability-box_b2">
            ${flower.f2}
          </div>
          <div class="ability-box_b3">
            ${flower.f3}
          </div>
          <div class="ability-box_b4">
            ${flower.f4}
          </div>
        </div>
      </div>
    </div>`
  search_list.append(html);
  $('.right2_main_atr').each(function(index, atr){
    $(atr).attr('id', `atr${index}`);
  })
  //ここにid付ける処理を追加
  }
  window.onload = appendColor();
  valGlobal2 = 0; //名前検索で、検索中だった時に1に変えて保存
  //色を付けする-------------------------------
  //コピーして別のfunction用意してidを付けてCSSで色つける
  //〜〜〜〜ここから
  function appendColor(){ 
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      if(valGlobal2 == 1){
        $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            if(str.indexOf("斬") != -1){
              $(`#atr${index}`).css('background-color', '#ff3c61');
              $(`#atr${index}`).css('color', 'white');
            }else if(str.indexOf("打") != -1){
              $(`#atr${index}`).css('background-color', '#7474ff');
              $(`#atr${index}`).css('color', 'white');
            }else if(str.indexOf("突") != -1){
              $(`#atr${index}`).css('background-color', '#feff74');
            }else{
              $(`#atr${index}`).css('background-color', '#e550e5');
              $(`#atr${index}`).css('color', 'white');
            }
          }
        )
      }else{
        $('.right2_main_atr').each(function(index, atr){
          $(atr).attr('id', `atr${index}`);
        })
        $.grep(flowers,
          function(elem, index){
            str = elem.job
            if(str.indexOf("斬") != -1){
              $(`#atr${index}`).css('background-color', '#ff3c61');
              $(`#atr${index}`).css('color', 'white');
            }else if(str.indexOf("打") != -1){
              $(`#atr${index}`).css('background-color', '#7474ff');
              $(`#atr${index}`).css('color', 'white');
            }else if(str.indexOf("突") != -1){
              $(`#atr${index}`).css('background-color', '#feff74');
            }else{
              $(`#atr${index}`).css('background-color', '#e550e5');
              $(`#atr${index}`).css('color', 'white');
            }
          }
        )
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  };
  //〜〜〜〜ここまで
  //対応するidと色をつける処理
  //appendまさしをwindow.onloadまさし
  //いまあるappendColorの下にまさし

  //表示をリセットする-------------------------------
  $(".submit-reset").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      valGlobal1 = flowers;
      valGlobal2 = 0;
      flowers.forEach(function(flower){
        appendFlower(flower);
      })
      appendColor();
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //キャラ名で検索-------------------------------
  $("#form").on("keyup", function() {
    let input = $("#form").val();
    $.ajax({
      type: 'GET',
      url: '/flowers',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(input.length != 0){
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.name
            return (str.indexOf(input) != -1);
          })
          valGlobal1 = filtered
          valGlobal2 = 1;
          filtered.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        valGlobal1 = flowers;
        valGlobal2 = 0;
        flowers.forEach(function(flower){
          appendFlower(flower);
        })
        appendColor();
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //斬属性を検索-------------------------------
  $(".submit1").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("斬") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("斬") != -1);
          })
          filtered.forEach(function(flower){
            appendFlower(flower);
          })
          valGlobal1 = filtered;
          valGlobal2 = 1;
          appendColor();
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //打属性を検索-------------------------------
  $(".submit2").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("打") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("打") != -1);
          })
          filtered.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filtered;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //突属性を検索-------------------------------
  $(".submit3").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("突") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("突") != -1);
          })
          filtered.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filtered;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //魔属性を検索-------------------------------
  $(".submit4").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("魔") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("魔") != -1);
          })
          filtered.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filtered;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //斬　属性付与を検索-------------------------------
  $(".a-submit1").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("斬") != -1){
              return a4;
            } else if(b4.indexOf("斬") != -1){
              return b4;
            } else if(c4.indexOf("斬") != -1){
              return c4;
            } else if(d4.indexOf("斬") != -1){
              return d4;
            } else if(e4.indexOf("斬") != -1){
              return e4;
            } else if(f4.indexOf("斬") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("斬") != -1){
              return a4;
            } else if(b4.indexOf("斬") != -1){
              return b4;
            } else if(c4.indexOf("斬") != -1){
              return c4;
            } else if(d4.indexOf("斬") != -1){
              return d4;
            } else if(e4.indexOf("斬") != -1){
              return e4;
            } else if(f4.indexOf("斬") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //打　属性付与を検索-------------------------------
  $(".a-submit2").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("打") != -1){
              return a4;
            } else if(b4.indexOf("打") != -1){
              return b4;
            } else if(c4.indexOf("打") != -1){
              return c4;
            } else if(d4.indexOf("打") != -1){
              return d4;
            } else if(e4.indexOf("打") != -1){
              return e4;
            } else if(f4.indexOf("打") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("打") != -1){
              return a4;
            } else if(b4.indexOf("打") != -1){
              return b4;
            } else if(c4.indexOf("打") != -1){
              return c4;
            } else if(d4.indexOf("打") != -1){
              return d4;
            } else if(e4.indexOf("打") != -1){
              return e4;
            } else if(f4.indexOf("打") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //突属性付与を検索-------------------------------
  $(".a-submit3").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("突") != -1){
              return a4;
            } else if(b4.indexOf("突") != -1){
              return b4;
            } else if(c4.indexOf("突") != -1){
              return c4;
            } else if(d4.indexOf("突") != -1){
              return d4;
            } else if(e4.indexOf("突") != -1){
              return e4;
            } else if(f4.indexOf("突") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("突") != -1){
              return a4;
            } else if(b4.indexOf("突") != -1){
              return b4;
            } else if(c4.indexOf("突") != -1){
              return c4;
            } else if(d4.indexOf("突") != -1){
              return d4;
            } else if(e4.indexOf("突") != -1){
              return e4;
            } else if(f4.indexOf("突") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //魔　属性付与を検索-------------------------------
  $(".a-submit4").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("魔") != -1){
              return a4;
            } else if(b4.indexOf("魔") != -1){
              return b4;
            } else if(c4.indexOf("魔") != -1){
              return c4;
            } else if(d4.indexOf("魔") != -1){
              return d4;
            } else if(e4.indexOf("魔") != -1){
              return e4;
            } else if(f4.indexOf("魔") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("魔") != -1){
              return a4;
            } else if(b4.indexOf("魔") != -1){
              return b4;
            } else if(c4.indexOf("魔") != -1){
              return c4;
            } else if(d4.indexOf("魔") != -1){
              return d4;
            } else if(e4.indexOf("魔") != -1){
              return e4;
            } else if(f4.indexOf("魔") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //クリティカル系を検索-------------------------------
  $(".a-submit5").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a1 = elem.a1
            b1 = elem.b1
            c1 = elem.c1
            d1 = elem.d1
            e1 = elem.e1
            f1 = elem.f1
            if(a1.indexOf("ｸﾘ") != -1){
              return a1;
            } else if(b1.indexOf("ｸﾘ") != -1){
              return b1;
            } else if(c1.indexOf("ｸﾘ") != -1){
              return c1;
            } else if(d1.indexOf("ｸﾘ") != -1){
              return d1;
            } else if(e1.indexOf("ｸﾘ") != -1){
              return e1;
            } else if(f1.indexOf("ｸﾘ") != -1){
              return f1;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a1 = elem.a1
            b1 = elem.b1
            c1 = elem.c1
            d1 = elem.d1
            e1 = elem.e1
            f1 = elem.f1
            if(a1.indexOf("ｸﾘ") != -1){
              return a1;
            } else if(b1.indexOf("ｸﾘ") != -1){
              return b1;
            } else if(c1.indexOf("ｸﾘ") != -1){
              return c1;
            } else if(d1.indexOf("ｸﾘ") != -1){
              return d1;
            } else if(e1.indexOf("ｸﾘ") != -1){
              return e1;
            } else if(f1.indexOf("ｸﾘ") != -1){
              return f1;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //スキル発動率1.2倍系を検索-------------------------------
  $(".a-submit6").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("1.2倍") != -1){
              return a4;
            } else if(b4.indexOf("1.2倍") != -1){
              return b4;
            } else if(c4.indexOf("1.2倍") != -1){
              return c4;
            } else if(d4.indexOf("1.2倍") != -1){
              return d4;
            } else if(e4.indexOf("1.2倍") != -1){
              return e4;
            } else if(f4.indexOf("1.2倍") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("1.2倍") != -1){
              return a4;
            } else if(b4.indexOf("1.2倍") != -1){
              return b4;
            } else if(c4.indexOf("1.2倍") != -1){
              return c4;
            } else if(d4.indexOf("1.2倍") != -1){
              return d4;
            } else if(e4.indexOf("1.2倍") != -1){
              return e4;
            } else if(f4.indexOf("1.2倍") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //スキル発動率1.28~1.36倍系を検索-------------------------------
  $(".a-submit7").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("1.36倍") != -1){
              return a4;
            } else if(b4.indexOf("1.36倍") != -1){
              return b4;
            } else if(c4.indexOf("1.36倍") != -1){
              return c4;
            } else if(d4.indexOf("1.36倍") != -1){
              return d4;
            } else if(e4.indexOf("1.36倍") != -1){
              return e4;
            } else if(f4.indexOf("1.36倍") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("1.36倍") != -1){
              return a4;
            } else if(b4.indexOf("1.36倍") != -1){
              return b4;
            } else if(c4.indexOf("1.36倍") != -1){
              return c4;
            } else if(d4.indexOf("1.36倍") != -1){
              return d4;
            } else if(e4.indexOf("1.36倍") != -1){
              return e4;
            } else if(f4.indexOf("1.36倍") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });
  //スキル発動率1T目1.65倍系を検索-------------------------------
  $(".a-submit8").on("click", function() {
    $.ajax({
      type: 'GET',
      url: '/flowers',
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(valGlobal2 == 1){
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("1.65倍") != -1){
              return a4;
            } else if(b4.indexOf("1.65倍") != -1){
              return b4;
            } else if(c4.indexOf("1.65倍") != -1){
              return c4;
            } else if(d4.indexOf("1.65倍") != -1){
              return d4;
            } else if(e4.indexOf("1.65倍") != -1){
              return e4;
            } else if(f4.indexOf("1.65倍") != -1){
              return f4;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a4.indexOf("1.65倍") != -1){
              return a4;
            } else if(b4.indexOf("1.65倍") != -1){
              return b4;
            } else if(c4.indexOf("1.65倍") != -1){
              return c4;
            } else if(d4.indexOf("1.65倍") != -1){
              return d4;
            } else if(e4.indexOf("1.65倍") != -1){
              return e4;
            } else if(f4.indexOf("1.65倍") != -1){
              return f4;
            }
          })
          filter.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
          valGlobal1 = filter;
          valGlobal2 = 1;
      }
    })
    .fail(function(){
      console.log('エラー');
    })
  });

});