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
      <div class="right2_main_atr">
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
  }

  valGlobal2 = 0; //名前検索で、検索中だった時に1に変えて保存
  //表示をリセットする-------------------------------
  $(".submit-reset").on("click", function() {
    let job = 5;
    $.ajax({
      type: 'GET',
      url: '/flowers',
      data: { keyword: job },
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      valGlobal1 = flowers;
      valGlobal2 = 0;
      flowers.forEach(function(flower){
        appendFlower(flower);
      })
    })
    .fail(function(){
      console.log('通信状況を確認して下さい');
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
          valGlobal1 = filtered;
          valGlobal2 = 1;
          filtered.forEach(function(flower){
            appendFlower(flower);
          });
      }
      else{
        valGlobal1 = flowers;
        valGlobal2 = 0;
        flowers.forEach(function(flower){
          appendFlower(flower);
        })
      }
    })
    .fail(function(){
      console.log('通信状況を確認して下さい');
    })
  });
  //斬属性を検索-------------------------------
  $(".submit1").on("click", function() {
    let job1 = 1;
    $.ajax({
      type: 'GET',
      url: '/flowers',
      data: { keyword: job1 },
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(job1 == 1 && valGlobal2 == 1){
        let strage = valGlobal1;
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("斬") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          });
          valGlobal1 = strage;
      }
      else{
        let filtered1 = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("斬") != -1);
          })
          filtered1.forEach(function(flower){
            appendFlower(flower);
          });
      }
    })
    .fail(function(){
      console.log('通信状況を確認して下さい');
    })
  });
  //打属性を検索-------------------------------
  $(".submit2").on("click", function() {
    let job2 = 1;
    $.ajax({
      type: 'GET',
      url: '/flowers',
      data: { keyword: job2 },
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(job2 == 1 && valGlobal2 == 1){
        let strage = valGlobal1;
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("打") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          });
        valGlobal1 = strage;
      }
      else{
        let filtered2 = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("打") != -1);
          })
          filtered2.forEach(function(flower){
            appendFlower(flower);
          });
      }
    })
    .fail(function(){
      console.log('通信状況を確認して下さい');
    })
  });
  //突属性を検索-------------------------------
  $(".submit3").on("click", function() {
    let job3 = 1;
    $.ajax({
      type: 'GET',
      url: '/flowers',
      data: { keyword: job3 },
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(job3 == 1 && valGlobal2 == 1){
        let strage = valGlobal1;
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("突") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          });
          valGlobal1 = strage;
      }
      else{
        let filtered3 = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("突") != -1);
          })
          filtered3.forEach(function(flower){
            appendFlower(flower);
          });
      }
    })
    .fail(function(){
      console.log('通信状況を確認して下さい');
    })
  });
  //魔属性を検索-------------------------------
  $(".submit4").on("click", function() {
    let job4 = 1;
    $.ajax({
      type: 'GET',
      url: '/flowers',
      data: { keyword: job4 },
      dataType: 'json'
    })
    .done(function(flowers){
      search_list.empty();
      if(job4 == 1 && valGlobal2 == 1){
        let strage = valGlobal1;
        valGlobal1 = $.grep(valGlobal1,
          function(elem, index){
            str = elem.job
            return (str.indexOf("魔") != -1);
          })
          valGlobal1.forEach(function(flower){
            appendFlower(flower);
          });
          valGlobal1 = strage;
      }
      else{
        let filtered4 = $.grep(flowers,
          function(elem, index){
            str = elem.job
            return (str.indexOf("魔") != -1);
          })
          filtered4.forEach(function(flower){
            appendFlower(flower);
          });
      }
    })
    .fail(function(){
      console.log('通信状況を確認して下さい');
    })
  });
});