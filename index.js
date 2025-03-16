function linmarn_afterFirstStroke(pos) {
    const first_x = pos.x;
    const first_y = pos.y;

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 4; y++) {
            const key = document.getElementById(`x${x}y${y}`);
            if (x === 0 && y === 0) {
                key.innerHTML = `<img width="72" height="72" src="streamdeck_back_icon.png">`;
                key.onclick = () => linmarn_displayInitialKeys();
            } else {
                const char = CHARS[first_y * 8 + first_x][y * 8 + x - 1];
                key.innerHTML = char !== "" ? `<img width="72" height="72" src="bitmaps/${char}.png">` : "";
                key.onclick = () => {
                    insertCharacter(char);
                    linmarn_displayInitialKeys();
                };
            }
        }
    }
}

function strange_displayInitialKeys() {
    const icon_names = [
        "change_page/key_kin.png", "normal_keys/key_s.png", "normal_keys/key_g.png", "normal_keys/key_h.png", "normal_keys/key_left_paren.png", "normal_keys/key_right_paren.png", "normal_keys/key_slash.png", "change_page/字.svg",
        "", "special_keys/key_nip_left.png", "", "special_keys/key_nip_right.png", "", "", "special_keys/key_up.png", "",
        "special_keys/key_anp.png", "special_keys/key_penul.png", "special_keys/key_dijac.png", "special_keys/key_dutucun.png", "", "special_keys/key_left.png", "special_keys/key_et.png", "special_keys/key_right.png",
        "change_page/key_xon.png", "special_keys/key_auc.png", "special_keys/key_let.png", "special_keys/key_amol.png",  "", "", "special_keys/key_down.png","special_keys/key_laiju_e_lucuc.png",
    ];
    registerKeys(icon_names);
}

function number_displayInitialKeys() {
    const icon_names = [
        "change_page/key_papel.png", "", "", "", "", "", "", "change_page/字.svg",
        "", "normal_keys/key_0.png", "normal_keys/key_1.png", "normal_keys/key_2.png", "normal_keys/key_3.png", "normal_keys/key_4.png", "", "",
        "special_keys/key_anp.png", "normal_keys/key_5.png", "normal_keys/key_6.png", "normal_keys/key_7.png", "normal_keys/key_8.png", "normal_keys/key_9.png", "", "",
        "change_page/key_xon.png", "normal_keys/key_100.png", "", "normal_keys/key_question.png", "normal_keys/key_lt.png", "", "", "special_keys/key_laiju_e_lucuc.png",
    ];
    registerKeys(icon_names);
}

function registerKeys(icon_names) {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 4; y++) {
            const key = document.getElementById(`x${x}y${y}`);
            const icon_name = icon_names[y * 8 + x];

            key.innerHTML = icon_name !== "" ? `<img width="72" height="72" src="keytop/${icon_name}">` : "";

            if (icon_name === "change_page/字.svg") {
                key.onclick = () => linmarn_displayInitialKeys();
            } else if (icon_name === "change_page/key_kin.png") {
                key.onclick = () => number_displayInitialKeys();
            } else if (icon_name === "change_page/key_papel.png" || icon_name === "change_page/key_pmcp.png") {
                key.onclick = () => pmcp_displayInitialKeys();
            } else if (icon_name.match(/normal_keys\/key_(.+)\.png/)) {
                const char_ = /normal_keys\/key_(.+)\.png/.exec(icon_name)[1];
                const char = {
                    "period": ".",
                    "comma": ",",
                    "question": "?",
                    "exclamation": "!",
                    "hyphen": "-",
                    "double_quote": "\"",
                    "100": "Ⅽ",
                    "left_paren": "(",
                    "right_paren": ")",
                }[char_] ?? char_;
                key.onclick = () => insertCharacter(char);
            } else if (icon_name === "") {
                key.onclick = () => insertCharacter(" ");
            } else if (icon_name === "special_keys/key_laiju_e_lucuc.png") {
                key.onclick = () => insertCharacter("\n");
            } else if (icon_name === "special_keys/key_left.png") {
                key.onclick = () => moveCursor(-1);
            } else if (icon_name === "special_keys/key_right.png") {
                key.onclick = () => moveCursor(1);
            } else if (icon_name === "special_keys/key_anp.png") {
                key.onclick = () => saveText();
            } else if (icon_name === "special_keys/key_auc.png") {
                key.onclick = () => selectAll();
            } else if (icon_name === "change_page/key_xon.png") {
                key.onclick = () => strange_displayInitialKeys();
            } else if (icon_name.startsWith("linmarn_first_stroke/")) {
                key.onclick = () => linmarn_afterFirstStroke({ 'x': x, 'y': y });
            } else {
                key.onclick = () => { alert("Not implemented yet"); };
            }
        }
    }
}

function pmcp_displayInitialKeys() {
    const icon_names = [
        "change_page/key_kin.png", "normal_keys/key_p.png", "normal_keys/key_b.png", "normal_keys/key_m.png", "normal_keys/key_c.png", "normal_keys/key_x.png", "normal_keys/key_z.png", "change_page/字.svg",
        "", "normal_keys/key_t.png", "normal_keys/key_d.png", "normal_keys/key_n.png", "normal_keys/key_l.png", "normal_keys/key_k.png", "normal_keys/key_a.png", "special_keys/key_left.png",
        "special_keys/key_anp.png", "normal_keys/key_e.png", "normal_keys/key_i.png", "normal_keys/key_u.png", "normal_keys/key_o.png", "normal_keys/key_j.png", "normal_keys/key_w.png", "special_keys/key_right.png",
        "change_page/key_xon.png", "normal_keys/key_period.png", "normal_keys/key_comma.png", "normal_keys/key_question.png", "normal_keys/key_exclamation.png", "normal_keys/key_hyphen.png", "normal_keys/key_double_quote.png", "special_keys/key_laiju_e_lucuc.png",
    ];
    registerKeys(icon_names);
}

function linmarn_displayInitialKeys() {
    const icon_names = [
        "linmarn_first_stroke/1_処.svg", "linmarn_first_stroke/1_下.svg", "linmarn_first_stroke/1_六.svg", "linmarn_first_stroke/1_人.svg", "linmarn_first_stroke/1_ナ而.svg", "linmarn_first_stroke/1_一ノ.svg", "linmarn_first_stroke/1_一？.svg", "change_page/key_pmcp.png",
        "linmarn_first_stroke/2_上.svg", "linmarn_first_stroke/2_二.svg", "linmarn_first_stroke/2_右.svg", "linmarn_first_stroke/2_言日.svg", "linmarn_first_stroke/2_口.svg", "linmarn_first_stroke/2_筆.svg", "linmarn_first_stroke/2_門.svg", "linmarn_first_stroke/2_函包箱.svg",
        "linmarn_first_stroke/3_ノ一.svg", "linmarn_first_stroke/3_常.svg", "linmarn_first_stroke/3_ノノ.svg", "linmarn_first_stroke/3_之.svg", "linmarn_first_stroke/3_四.svg", "linmarn_first_stroke/3_ヒクカ丹.svg", "linmarn_first_stroke/3_天.svg", "linmarn_first_stroke/3_神十位.svg",
        "change_page/key_xon.png", "linmarn_first_stroke/4_火心.svg", "linmarn_first_stroke/4_再.svg", "linmarn_first_stroke/4_ヽヽ.svg", "linmarn_first_stroke/5_反.svg", "linmarn_first_stroke/5_フ.svg", "linmarn_first_stroke/5_傾.svg", "linmarn_first_stroke/5_針.svg"
    ];
    registerKeys(icon_names);
}

function insertCharacter(characterToInsert) {
    const textarea = document.getElementById("output-textarea");

    // Note: we must not check whether the document.activeElement is textarea
    // because the textarea is not focused when the user clicks on the keyboard

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);
    textarea.value = before + characterToInsert + after;

    textarea.selectionStart = textarea.selectionEnd = start + characterToInsert.length;
    textarea.focus();
}

function moveCursor(offset) {
    const textarea = document.getElementById("output-textarea");
    const position = textarea.selectionStart + offset;
    textarea.selectionStart = textarea.selectionEnd = position;
    textarea.focus();
}

function selectAll() {
    const textarea = document.getElementById("output-textarea");
    textarea.select();
    textarea.focus();
}

function saveText() {
    const text = document.getElementById("output-textarea").value;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "撃字之紙.txt";
    a.click();
    URL.revokeObjectURL(url);
}