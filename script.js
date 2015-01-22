$(document).ready(function () {
    var tab = $(".tabs .tab");
    var nav = $("#nav ul li");
    tab.last().hide();
    nav.last().on("click", function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        tab.last().addClass('active').show("slow");
        tab.first().removeClass('active').hide("slow");
    });
    nav.first().on("click", function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        tab.last().removeClass('active').hide("slow");
        tab.first().addClass('active').show("slow");
    });
    $("<div class='addition'></div>").appendTo(tab.first());
    $("<div class='subtraction'></div>").appendTo(tab.first());
    $("<div class='multiplication'></div>").appendTo(tab.first());
    $("<div class='division'></div>").appendTo(tab.first());
    $("<div class='info'><span class='true'>Правильных ответов <i value=0>0</i></span></div>").appendTo(tab.first());
    $("<div><input type='checkbox' checked id='addition'/> <label for='addition'>Сложение</label></div>").appendTo(tab.last());
    $("<div><input type='checkbox' checked id='subtraction'/> <label for='subtraction'>Вычитание</label></div>").appendTo(tab.last());
    $("<div><input type='checkbox' checked id='multiplication'/> <label for='multiplication'>Умножение</label></div>").appendTo(tab.last());
    $("<div><input type='checkbox' checked id='division'/> <label for='division'>Деление</label></div>").appendTo(tab.last());
    $("<button>Перейти к проверке</button>").appendTo(tab.last());
    function CreateEx() {
        tab.first().find("div").is(function () {
            x = Math.floor((Math.random() * 100) + 1);
            y = Math.floor((Math.random() * 100) + 1);
            if ($(this).hasClass("addition")) {
                $("<span>" + x + " + " + y + " = </span>").appendTo($(this));
                $("<input type='number' min='0' />").appendTo($(this));
                $("<input type='hidden' value='" + Math.floor(x + y) + "' />").appendTo($(this));
                $("<span class='valid'></span>").appendTo($(this));
                $("<input type=text style='display:none' value/>").appendTo($(this));
            }
            if ($(this).hasClass("subtraction")) {
                $("<span>" + x + " - " + y + " = </span>").appendTo($(this));
                $("<input type='number' min='0' />").appendTo($(this));
                $("<input type='hidden' value='" + Math.floor(x - y) + "' />").appendTo($(this));
                $("<span class='valid'></span>").appendTo($(this));
                $("<input type=text style='display:none' />").appendTo($(this));
            }
            if ($(this).hasClass("multiplication")) {
                $("<span>" + x + " * " + y + " = </span>").appendTo($(this));
                $("<input type='number' min='0' />").appendTo($(this));
                $("<input type='hidden' value='" + Math.floor(x * y) + "' />").appendTo($(this));
                $("<span class='valid'></span>").appendTo($(this));
                $("<input type=text style='display:none' />").appendTo($(this));
            }
            if ($(this).hasClass("division")) {
                $("<span>" + x + " / " + y + " = </span>").appendTo($(this));
                $("<input type='number' min='0' />").appendTo($(this));
                $("<input type='hidden' value='" + Math.round(x / y) + "' />").appendTo($(this));
                $("<span class='valid'></span>").appendTo($(this));
                $("<input type=text style='display:none' />").appendTo($(this));
            }
        });
    }
    function CheckEx() {
        var score = $(this).siblings("input[type=hidden]").val();
        var scope = $(this).siblings("input[type=text]");
        var info_true = $(".info .true i");
        if ($(this).val() !== score) {
            $(this).siblings(".valid").text("Неправильно");
        } else {
            $(this).siblings(".valid").text("Правильно");
            if (scope.val() < 1) {
                info_true.html(+info_true.html() + 1);
                scope.val(+1);
            }
        }
        if ($(this).val() < 0) {
            $(this).siblings(".valid").text("Вы ввели значение меньше 0");
        } else if ($(this).parent().hasClass("subtraction")) {
        }
    }

    tab.last().find("button").on("click", function () {
        tab.first().empty();
        tab.last().find("div input:checked").is(function () {
            $(this).each(function () {
                var clas = $(this).attr("id");
                tab.first().append("<div class='" + clas + "'></div>");
            });
        });
        CreateEx();
        $("input[type=number]").blur(CheckEx);
        $("<div class='info'><span class='true'>Правильных ответов <i value=0>0</i></span></div>").appendTo(tab.first());
        tab.last().hide("slow").removeClass("active");
        tab.first().show("slow").addClass("active");
        nav.first().addClass("active").siblings().removeClass("active");
    });
    CreateEx();
    $("input[type=number]").blur(CheckEx);
});
