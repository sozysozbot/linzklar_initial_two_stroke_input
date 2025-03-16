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

function pmcp_displayInitialKeys() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 4; y++) {
            const key = document.getElementById(`x${x}y${y}`);
            const icon_name = [
                "key_kin.png", "normal_keys/key_p.png", "normal_keys/key_b.png", "normal_keys/key_m.png", "normal_keys/key_c.png", "normal_keys/key_x.png", "normal_keys/key_z.png", "字.svg",
                "", "normal_keys/key_t.png", "normal_keys/key_d.png", "normal_keys/key_n.png", "normal_keys/key_l.png", "normal_keys/key_k.png", "normal_keys/key_a.png", "special_keys/key_left.png",
                "special_keys/key_anp.png", "normal_keys/key_e.png", "normal_keys/key_i.png", "normal_keys/key_u.png", "normal_keys/key_o.png", "normal_keys/key_j.png", "normal_keys/key_w.png", "special_keys/key_right.png",
                "key_xon.png", "normal_keys/key_period.png", "normal_keys/key_comma.png", "normal_keys/key_question.png", "normal_keys/key_exclamation.png", "normal_keys/key_hyphen.png", "normal_keys/key_double_quote.png", "special_keys/key_laiju_e_lucuc.png",
            ][y * 8 + x];

            key.innerHTML = icon_name !== "" ? `<img width="72" height="72" src="folder_icons/${icon_name}">` : "";

            if (icon_name === "字.svg") {
                key.onclick = () => linmarn_displayInitialKeys();
            } else if (icon_name.match(/normal_keys\/key_(.+)\.png/)) {
                const char_ = /normal_keys\/key_(.+)\.png/.exec(icon_name)[1];
                const char = {
                    "period": ".",
                    "comma": ",",
                    "question": "?",
                    "exclamation": "!",
                    "hyphen": "-",
                    "double_quote": "\"",
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
                key.onclick = () => {
                    // save the current text to a file
                    const text = document.getElementById("output-textarea").value;
                    const blob = new Blob([text], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "撃字之紙.txt";
                    a.click();
                    URL.revokeObjectURL(url);
                };
            } else {
                key.onclick = () => { alert("Not implemented yet"); };
            }
        }
    }
}

function linmarn_displayInitialKeys() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 4; y++) {
            const key = document.getElementById(`x${x}y${y}`);
            const icon_name = [
                "1_処.svg", "1_下.svg", "1_六.svg", "1_人.svg", "1_ナ而.svg", "1_一ノ.svg", "1_一？.svg", "key_pmcp.png",
                "2_上.svg", "2_二.svg", "2_右.svg", "2_言日.svg", "2_口.svg", "2_筆.svg", "2_門.svg", "2_函包箱.svg",
                "3_ノ一.svg", "3_常.svg", "3_ノノ.svg", "3_之.svg", "3_四.svg", "3_ヒクカ丹.svg", "3_天.svg", "3_神十位.svg",
                "key_xon.png", "4_火心.svg", "4_再.svg", "4_ヽヽ.svg", "5_反.svg", "5_フ.svg", "5_傾.svg", "5_針.svg"
            ][y * 8 + x];
            if (icon_name === "key_pmcp.png") {
                key.innerHTML = `<img width="72" height="72" src="folder_icons/${icon_name}">`;
                key.onclick = () => pmcp_displayInitialKeys();
            } else if (icon_name === "key_xon.png") {
                key.innerHTML = `<img width="72" height="72" src="folder_icons/${icon_name}">`;
                key.onclick = () => { alert("Not implemented yet"); };
            } else {
                key.innerHTML = icon_name !== "" ? `<img width="72" height="72" src="folder_icons/${icon_name}">` : "";
                key.onclick = () => linmarn_afterFirstStroke({ 'x': x, 'y': y });
            }
        }
    }
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