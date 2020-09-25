$(document).ready(function () {
    let btn = $(".btn_style");
    let winOptions = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];
    let button = [];
    let won = $("#winId");

    initButtonObject();

    let count = 0;
    jQuery.each(btn, function () {
        $(this).click(function () {
            let numberId = Number(this.id);
            if (!button[numberId].active) {
                button[numberId].active = true;
                count % 2 === 0 ? button[numberId].text("X") : button[numberId].text("O");
                count++;
                if (count > 4) {
                    winnerCheck();
                }
            }
        })
    });

    function initButtonObject() {
        for (let i = 0; i < btn.length; i++) {
            button.push({
                "num": i,
                "name": "",
                "active": false,
                "text": function (text) {
                    if (text === "X") {
                        $(btn[i]).children().css("color", "blue");
                    } else {
                        $(btn[i]).children().css("color", "#35F80F");
                    }
                    this.name = text;
                    $(btn[i]).children().html(`${text}`);
                },
                "bg": function (color) {
                    if (color !== "") {
                        $(btn[i]).css("backgroundColor", `${color}`);
                    }
                },
            });
        }
    }

    function winnerCheck() {
        jQuery.each(winOptions, function (index) {
            for (let i = 0; i < 2; i++) {
                let win = (i === 0) ? "X" : "O";
                if ($(button[winOptions[index][0]]).attr("name") === win
                    && $(button[winOptions[index][1]]).attr("name") === win
                    && $(button[winOptions[index][2]]).attr("name") === win) {
                    $(btn[winOptions[index][0]]).css("backgroundColor", "chocolate");
                    $(btn[winOptions[index][1]]).css("backgroundColor", "chocolate");
                    $(btn[winOptions[index][2]]).css("backgroundColor", "chocolate");
                    $(button).each(function () {
                        this.active = true;
                    });
                }
            }
        });
    }

    $("#newGame").click(function () {
        $(button).each(function () {
            this.num = 0;
            this.name = "";
            this.active = false;
            this.text("");
            this.bg("darkorange");
        });
        count = 0;
        button.length = 0;
        $(won).html("");
        initButtonObject();
    });
});