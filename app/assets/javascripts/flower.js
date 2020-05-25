$(function() {
  let search_list = $(".right2");

  function appendFlower(flower) {
    var html = `
    <a href="/flowers/${flower.id}">
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
  //2015年検索-------------------------------
  $(".year2015").on("click", function() {
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
            return (elem.year == 2015);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            return (elem.year == 2015);
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
  //2016年検索-------------------------------
  $(".year2016").on("click", function() {
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
            return (elem.year == 2016);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            return (elem.year == 2016);
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
  //2017年検索-------------------------------
  $(".year2017").on("click", function() {
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
            return (elem.year == 2017);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            return (elem.year == 2017);
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
  //2018年検索-------------------------------
  $(".year2018").on("click", function() {
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
            return (elem.year == 2018);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            return (elem.year == 2018);
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
  //2019年検索-------------------------------
  $(".year2019").on("click", function() {
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
            return (elem.year == 2019);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            return (elem.year == 2019);
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
  //2020年検索-------------------------------
  $(".year2020").on("click", function() {
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
            return (elem.year == 2020);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            return (elem.year == 2020);
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
  //スキルタイプ別で検索-------------------------------
  $(".attacktype1").on("click", function() {
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
            str = elem.skill
            return (str.indexOf("全体") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.skill
            return (str.indexOf("全体") != -1);
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
  $(".attacktype2").on("click", function() {
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
            str = elem.skill
            return (str.indexOf("全体変則") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.skill
            return (str.indexOf("全体変則") != -1);
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
  $(".attacktype3").on("click", function() {
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
            str = elem.skill
            return (str.indexOf("2体") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.skill
            return (str.indexOf("2体") != -1);
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
  $(".attacktype4").on("click", function() {
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
            str = elem.skill
            return (str.indexOf("3回") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.skill
            return (str.indexOf("3回") != -1);
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
  $(".attacktype5").on("click", function() {
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
            str = elem.skill
            return (str.indexOf("単体") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.skill
            return (str.indexOf("単体") != -1);
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
  $(".attacktype6").on("click", function() {
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
            str = elem.skill
            return (str.indexOf("単吸収") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filtered = $.grep(flowers,
          function(elem, index){
            str = elem.skill
            return (str.indexOf("単吸収") != -1);
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
  $(".a-submit-z1").on("click", function() {
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
  $(".a-submit-z2").on("click", function() {
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
  $(".a-submit-z3").on("click", function() {
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
  $(".a-submit-z4").on("click", function() {
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
  //何かしらの属性付与を検索-------------------------------
  $(".a-submit-z5").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("属性付与") != -1){
              return a3;
            } else if(b3.indexOf("属性付与") != -1){
              return b3;
            } else if(c3.indexOf("属性付与") != -1){
              return c3;
            } else if(d3.indexOf("属性付与") != -1){
              return d3;
            } else if(e3.indexOf("属性付与") != -1){
              return e3;
            } else if(f3.indexOf("属性付与") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("属性付与") != -1){
              return a3;
            } else if(b3.indexOf("属性付与") != -1){
              return b3;
            } else if(c3.indexOf("属性付与") != -1){
              return c3;
            } else if(d3.indexOf("属性付与") != -1){
              return d3;
            } else if(e3.indexOf("属性付与") != -1){
              return e3;
            } else if(f3.indexOf("属性付与") != -1){
              return f3;
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
  //複数属性付与
  $(".a-submit-z6").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("2属性付与") != -1 || a3.indexOf("3属性付与") != -1){
              return a3;
            } else if(b3.indexOf("2属性付与") != -1 || b3.indexOf("3属性付与") != -1){
              return b3;
            } else if(c3.indexOf("2属性付与") != -1 || c3.indexOf("3属性付与") != -1){
              return c3;
            } else if(d3.indexOf("2属性付与") != -1 || d3.indexOf("3属性付与") != -1){
              return d3;
            } else if(e3.indexOf("2属性付与") != -1 || e3.indexOf("3属性付与") != -1){
              return e3;
            } else if(f3.indexOf("2属性付与") != -1 || f3.indexOf("3属性付与") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("2属性付与") != -1 || a3.indexOf("3属性付与") != -1){
              return a3;
            } else if(b3.indexOf("2属性付与") != -1 || b3.indexOf("3属性付与") != -1){
              return b3;
            } else if(c3.indexOf("2属性付与") != -1 || c3.indexOf("3属性付与") != -1){
              return c3;
            } else if(d3.indexOf("2属性付与") != -1 || d3.indexOf("3属性付与") != -1){
              return d3;
            } else if(e3.indexOf("2属性付与") != -1 || e3.indexOf("3属性付与") != -1){
              return e3;
            } else if(f3.indexOf("2属性付与") != -1 || f3.indexOf("3属性付与") != -1){
              return f3;
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
  $(".a-submit-z7").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("3属性付与") != -1){
              return a3;
            } else if(b3.indexOf("3属性付与") != -1){
              return b3;
            } else if(c3.indexOf("3属性付与") != -1){
              return c3;
            } else if(d3.indexOf("3属性付与") != -1){
              return d3;
            } else if(e3.indexOf("3属性付与") != -1){
              return e3;
            } else if(f3.indexOf("3属性付与") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("3属性付与") != -1){
              return a3;
            } else if(b3.indexOf("3属性付与") != -1){
              return b3;
            } else if(c3.indexOf("3属性付与") != -1){
              return c3;
            } else if(d3.indexOf("3属性付与") != -1){
              return d3;
            } else if(e3.indexOf("3属性付与") != -1){
              return e3;
            } else if(f3.indexOf("3属性付与") != -1){
              return f3;
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
  $(".a-submit-cri1").on("click", function() {
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
  //クリティカル発動率20%以上〜
  $(".a-submit-cri2").on("click", function() {
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
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("+2") != -1 || a4.indexOf("+3") != -1){
              return a3;}
            } else if(b3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("+2") != -1 || b4.indexOf("+3") != -1){
              return b3;}
            } else if(c3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("+2") != -1 || c4.indexOf("+3") != -1){
              return c3;}
            } else if(d3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("+2") != -1 || d4.indexOf("+3") != -1){
              return d3;}
            } else if(e3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("+2") != -1 || e4.indexOf("+3") != -1){
              return e3;}
            } else if(f3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("+2") != -1 || f4.indexOf("+3") != -1){
              return f3;}
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("+2") != -1 || a4.indexOf("+3") != -1){
              return a3;}
            } else if(b3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("+2") != -1 || b4.indexOf("+3") != -1){
              return b3;}
            } else if(c3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("+2") != -1 || c4.indexOf("+3") != -1){
              return c3;}
            } else if(d3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("+2") != -1 || d4.indexOf("+3") != -1){
              return d3;}
            } else if(e3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("+2") != -1 || e4.indexOf("+3") != -1){
              return e3;}
            } else if(f3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("+2") != -1 || f4.indexOf("+3") != -1){
              return f3;}
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
  //クリティカル発動率30%以上
  $(".a-submit-cri3").on("click", function() {
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
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("+3") != -1){
              return a3;}
            } else if(b3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("+3") != -1){
              return b3;}
            } else if(c3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("+3") != -1){
              return c3;}
            } else if(d3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("+3") != -1){
              return d3;}
            } else if(e3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("+3") != -1){
              return e3;}
            } else if(f3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("+3") != -1){
              return f3;}
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("+3") != -1){
              return a3;}
            } else if(b3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("+3") != -1){
              return b3;}
            } else if(c3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("+3") != -1){
              return c3;}
            } else if(d3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("+3") != -1){
              return d3;}
            } else if(e3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("+3") != -1){
              return e3;}
            } else if(f3.indexOf("クリティカル発動率") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("+3") != -1){
              return f3;}
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
  //1T目クリティカル確定
  $(".a-submit-cri4").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("1T目クリティカル") != -1){
              return a3;
            } else if(b3.indexOf("1T目クリティカル") != -1){
              return b3;
            } else if(c3.indexOf("1T目クリティカル") != -1){
              return c3;
            } else if(d3.indexOf("1T目クリティカル") != -1){
              return d3;
            } else if(e3.indexOf("1T目クリティカル") != -1){
              return e3;
            } else if(f3.indexOf("1T目クリティカル") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("1T目クリティカル") != -1){
              return a3;
            } else if(b3.indexOf("1T目クリティカル") != -1){
              return b3;
            } else if(c3.indexOf("1T目クリティカル") != -1){
              return c3;
            } else if(d3.indexOf("1T目クリティカル") != -1){
              return d3;
            } else if(e3.indexOf("1T目クリティカル") != -1){
              return e3;
            } else if(f3.indexOf("1T目クリティカル") != -1){
              return f3;
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
  $(".a-submit-s1").on("click", function() {
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
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("1.2倍") != -1 || a4.indexOf("1.36倍") != -1){
              return a3;}
            } else if(b3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("1.2倍") != -1 || b4.indexOf("1.36倍") != -1){
              return b3;}
            } else if(c3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("1.2倍") != -1 || c4.indexOf("1.36倍") != -1){
              return c3;}
            } else if(d3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("1.2倍") != -1 || d4.indexOf("1.36倍") != -1){
              return d3;}
            } else if(e3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("1.2倍") != -1 || e4.indexOf("1.36倍") != -1){
              return e3;}
            } else if(f3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("1.2倍") != -1 || f4.indexOf("1.36倍") != -1){
              return f3;}
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("1.2倍") != -1 || a4.indexOf("1.36倍") != -1){
              return a3;}
            } else if(b3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("1.2倍") != -1 || b4.indexOf("1.36倍") != -1){
              return b3;}
            } else if(c3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("1.2倍") != -1 || c4.indexOf("1.36倍") != -1){
              return c3;}
            } else if(d3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("1.2倍") != -1 || d4.indexOf("1.36倍") != -1){
              return d3;}
            } else if(e3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("1.2倍") != -1 || e4.indexOf("1.36倍") != -1){
              return e3;}
            } else if(f3.indexOf("スキル発動率") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("1.2倍") != -1 || f4.indexOf("1.36倍") != -1){
              return f3;}
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
  $(".a-submit-s2").on("click", function() {
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
  $(".a-submit-s3").on("click", function() {
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
  //被弾したら2倍------------
  $(".a-submit-s4").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("被弾スキル発動率") != -1){
              return a3;
            } else if(b3.indexOf("被弾スキル発動率") != -1){
              return b3;
            } else if(c3.indexOf("被弾スキル発動率") != -1){
              return c3;
            } else if(d3.indexOf("被弾スキル発動率") != -1){
              return d3;
            } else if(e3.indexOf("被弾スキル発動率") != -1){
              return e3;
            } else if(f3.indexOf("被弾スキル発動率") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("被弾スキル発動率") != -1){
              return a3;
            } else if(b3.indexOf("被弾スキル発動率") != -1){
              return b3;
            } else if(c3.indexOf("被弾スキル発動率") != -1){
              return c3;
            } else if(d3.indexOf("被弾スキル発動率") != -1){
              return d3;
            } else if(e3.indexOf("被弾スキル発動率") != -1){
              return e3;
            } else if(f3.indexOf("被弾スキル発動率") != -1){
              return f3;
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
  //1T目自身のスキル確定発動
  $(".a-submit-s5").on("click", function() {
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
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a2.indexOf("自身") != -1 && a3.indexOf("1T目スキル発動率") != -1){
              return a2;
            } else if(b2.indexOf("自身") != -1 && b3.indexOf("1T目スキル発動率") != -1){
              return b2;
            } else if(c2.indexOf("自身") != -1 && c3.indexOf("1T目スキル発動率") != -1){
              return c2;
            } else if(d2.indexOf("自身") != -1 && d3.indexOf("1T目スキル発動率") != -1){
              return d2;
            } else if(e2.indexOf("自身") != -1 && e3.indexOf("1T目スキル発動率") != -1){
              return e2;
            } else if(f2.indexOf("自身") != -1 && f3.indexOf("1T目スキル発動率") != -1){
              return f2;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a2.indexOf("自身") != -1 && a3.indexOf("1T目スキル発動率") != -1){
              return a2;
            } else if(b2.indexOf("自身") != -1 && b3.indexOf("1T目スキル発動率") != -1){
              return b2;
            } else if(c2.indexOf("自身") != -1 && c3.indexOf("1T目スキル発動率") != -1){
              return c2;
            } else if(d2.indexOf("自身") != -1 && d3.indexOf("1T目スキル発動率") != -1){
              return d2;
            } else if(e2.indexOf("自身") != -1 && e3.indexOf("1T目スキル発動率") != -1){
              return e2;
            } else if(f2.indexOf("自身") != -1 && f3.indexOf("1T目スキル発動率") != -1){
              return f2;
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
  //防御上昇
  $(".a-submit-d1").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("防御*軽減/根性") != -1){
              return a3;
            } else if(b3.indexOf("防御*軽減/根性") != -1){
              return b3;
            } else if(c3.indexOf("防御*軽減/根性") != -1){
              return c3;
            } else if(d3.indexOf("防御*軽減/根性") != -1){
              return d3;
            } else if(e3.indexOf("防御*軽減/根性") != -1){
              return e3;
            } else if(f3.indexOf("防御*軽減/根性") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("防御*軽減/根性") != -1){
              return a3;
            } else if(b3.indexOf("防御*軽減/根性") != -1){
              return b3;
            } else if(c3.indexOf("防御*軽減/根性") != -1){
              return c3;
            } else if(d3.indexOf("防御*軽減/根性") != -1){
              return d3;
            } else if(e3.indexOf("防御*軽減/根性") != -1){
              return e3;
            } else if(f3.indexOf("防御*軽減/根性") != -1){
              return f3;
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
  //防御力上昇 30%以上----------------------
  $(".a-submit-d2").on("click", function() {
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
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("*5.3") != -1 || a4.indexOf("*6.0") != -1){
              return a3;}
            } else if(b3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("*5.3") != -1 || b4.indexOf("*6.0") != -1){
              return b3;}
            } else if(c3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("*5.3") != -1 || c4.indexOf("*6.0") != -1){
              return c3;}
            } else if(d3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("*5.3") != -1 || d4.indexOf("*6.0") != -1){
              return d3;}
            } else if(e3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("*5.3") != -1 || e4.indexOf("*6.0") != -1){
              return e3;}
            } else if(f3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("*5.3") != -1 || f4.indexOf("*6.0") != -1){
              return f3;}
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a2 = elem.a2
            b2 = elem.b2
            c2 = elem.c2
            d2 = elem.d2
            e2 = elem.e2
            f2 = elem.f2
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            a4 = elem.a4
            b4 = elem.b4
            c4 = elem.c4
            d4 = elem.d4
            e4 = elem.e4
            f4 = elem.f4
            if(a3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(a4.indexOf("*5.3") != -1 || a4.indexOf("*6.0") != -1){
              return a3;}
            } else if(b3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(b4.indexOf("*5.3") != -1 || b4.indexOf("*6.0") != -1){
              return b3;}
            } else if(c3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(c4.indexOf("*5.3") != -1 || c4.indexOf("*6.0") != -1){
              return c3;}
            } else if(d3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(d4.indexOf("*5.3") != -1 || d4.indexOf("*6.0") != -1){
              return d3;}
            } else if(e3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(e4.indexOf("*5.3") != -1 || e4.indexOf("*6.0") != -1){
              return e3;}
            } else if(f3.indexOf("防御*軽減/根性") != -1 && a2.indexOf("全員") != -1){
              if(f4.indexOf("*5.3") != -1 || f4.indexOf("*6.0") != -1){
              return f3;}
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
  //防御力で反撃----------------
  $(".a-submit-d3").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("反撃") != -1){
              return a3;
            } else if(b3.indexOf("反撃") != -1){
              return b3;
            } else if(c3.indexOf("反撃") != -1){
              return c3;
            } else if(d3.indexOf("反撃") != -1){
              return d3;
            } else if(e3.indexOf("反撃") != -1){
              return e3;
            } else if(f3.indexOf("反撃") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("反撃") != -1){
              return a3;
            } else if(b3.indexOf("反撃") != -1){
              return b3;
            } else if(c3.indexOf("反撃") != -1){
              return c3;
            } else if(d3.indexOf("反撃") != -1){
              return d3;
            } else if(e3.indexOf("反撃") != -1){
              return e3;
            } else if(f3.indexOf("反撃") != -1){
              return f3;
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
  //超反撃---------------------------------------
  $(".a-submit-d4").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("超反撃") != -1){
              return a3;
            } else if(b3.indexOf("超反撃") != -1){
              return b3;
            } else if(c3.indexOf("超反撃") != -1){
              return c3;
            } else if(d3.indexOf("超反撃") != -1){
              return d3;
            } else if(e3.indexOf("超反撃") != -1){
              return e3;
            } else if(f3.indexOf("超反撃") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("超反撃") != -1){
              return a3;
            } else if(b3.indexOf("超反撃") != -1){
              return b3;
            } else if(c3.indexOf("超反撃") != -1){
              return c3;
            } else if(d3.indexOf("超反撃") != -1){
              return d3;
            } else if(e3.indexOf("超反撃") != -1){
              return e3;
            } else if(f3.indexOf("超反撃") != -1){
              return f3;
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
  //ソーラードライブ威力---------------------------------------
  $(".a-submit-solar1").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("ソーラー威力上昇") != -1){
              return a3;
            } else if(b3.indexOf("ソーラー威力上昇") != -1){
              return b3;
            } else if(c3.indexOf("ソーラー威力上昇") != -1){
              return c3;
            } else if(d3.indexOf("ソーラー威力上昇") != -1){
              return d3;
            } else if(e3.indexOf("ソーラー威力上昇") != -1){
              return e3;
            } else if(f3.indexOf("ソーラー威力上昇") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("ソーラー威力上昇") != -1){
              return a3;
            } else if(b3.indexOf("ソーラー威力上昇") != -1){
              return b3;
            } else if(c3.indexOf("ソーラー威力上昇") != -1){
              return c3;
            } else if(d3.indexOf("ソーラー威力上昇") != -1){
              return d3;
            } else if(e3.indexOf("ソーラー威力上昇") != -1){
              return e3;
            } else if(f3.indexOf("ソーラー威力上昇") != -1){
              return f3;
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
  //光ゲージの初期値---------------------------------------
  $(".a-submit-solar2").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("光GAUGE 初期値") != -1){
              return a3;
            } else if(b3.indexOf("光GAUGE 初期値") != -1){
              return b3;
            } else if(c3.indexOf("光GAUGE 初期値") != -1){
              return c3;
            } else if(d3.indexOf("光GAUGE 初期値") != -1){
              return d3;
            } else if(e3.indexOf("光GAUGE 初期値") != -1){
              return e3;
            } else if(f3.indexOf("光GAUGE 初期値") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("光GAUGE 初期値") != -1){
              return a3;
            } else if(b3.indexOf("光GAUGE 初期値") != -1){
              return b3;
            } else if(c3.indexOf("光GAUGE 初期値") != -1){
              return c3;
            } else if(d3.indexOf("光GAUGE 初期値") != -1){
              return d3;
            } else if(e3.indexOf("光GAUGE 初期値") != -1){
              return e3;
            } else if(f3.indexOf("光GAUGE 初期値") != -1){
              return f3;
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
  //敵の攻撃力低下---------------------------------------
  $(".a-submit-debuff1").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("敵の攻撃力低下") != -1){
              return a3;
            } else if(b3.indexOf("敵の攻撃力低下") != -1){
              return b3;
            } else if(c3.indexOf("敵の攻撃力低下") != -1){
              return c3;
            } else if(d3.indexOf("敵の攻撃力低下") != -1){
              return d3;
            } else if(e3.indexOf("敵の攻撃力低下") != -1){
              return e3;
            } else if(f3.indexOf("敵の攻撃力低下") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("敵の攻撃力低下") != -1){
              return a3;
            } else if(b3.indexOf("敵の攻撃力低下") != -1){
              return b3;
            } else if(c3.indexOf("敵の攻撃力低下") != -1){
              return c3;
            } else if(d3.indexOf("敵の攻撃力低下") != -1){
              return d3;
            } else if(e3.indexOf("敵の攻撃力低下") != -1){
              return e3;
            } else if(f3.indexOf("敵の攻撃力低下") != -1){
              return f3;
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
  //敵のスキル発動率低下---------------------------------------
  $(".a-submit-debuff2").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("敵のスキル発動率") != -1){
              return a3;
            } else if(b3.indexOf("敵のスキル発動率") != -1){
              return b3;
            } else if(c3.indexOf("敵のスキル発動率") != -1){
              return c3;
            } else if(d3.indexOf("敵のスキル発動率") != -1){
              return d3;
            } else if(e3.indexOf("敵のスキル発動率") != -1){
              return e3;
            } else if(f3.indexOf("敵のスキル発動率") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("敵のスキル発動率") != -1){
              return a3;
            } else if(b3.indexOf("敵のスキル発動率") != -1){
              return b3;
            } else if(c3.indexOf("敵のスキル発動率") != -1){
              return c3;
            } else if(d3.indexOf("敵のスキル発動率") != -1){
              return d3;
            } else if(e3.indexOf("敵のスキル発動率") != -1){
              return e3;
            } else if(f3.indexOf("敵のスキル発動率") != -1){
              return f3;
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
  //敵がミスする---------------------------------------
  $(".a-submit-debuff3").on("click", function() {
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
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("敵が攻撃をミス") != -1){
              return a3;
            } else if(b3.indexOf("敵が攻撃をミス") != -1){
              return b3;
            } else if(c3.indexOf("敵が攻撃をミス") != -1){
              return c3;
            } else if(d3.indexOf("敵が攻撃をミス") != -1){
              return d3;
            } else if(e3.indexOf("敵が攻撃をミス") != -1){
              return e3;
            } else if(f3.indexOf("敵が攻撃をミス") != -1){
              return f3;
            }
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          })
          appendColor();
      }else{
        let filter = $.grep(flowers,
          function(elem, index){
            a3 = elem.a3
            b3 = elem.b3
            c3 = elem.c3
            d3 = elem.d3
            e3 = elem.e3
            f3 = elem.f3
            if(a3.indexOf("敵が攻撃をミス") != -1){
              return a3;
            } else if(b3.indexOf("敵が攻撃をミス") != -1){
              return b3;
            } else if(c3.indexOf("敵が攻撃をミス") != -1){
              return c3;
            } else if(d3.indexOf("敵が攻撃をミス") != -1){
              return d3;
            } else if(e3.indexOf("敵が攻撃をミス") != -1){
              return e3;
            } else if(f3.indexOf("敵が攻撃をミス") != -1){
              return f3;
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