function firstStroke(pos) {
    const first_x = pos.x;
    const first_y = pos.y;

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 4; y++) {
            const key = document.getElementById(`x${x}y${y}`);
            if (x === 0 && y === 0) {
                key.innerHTML = `<img width="72" height="72" src="streamdeck_back_icon.png">`;
                key.onclick = () => restoreInitialKeys();
            } else {
                const char = CHARS[first_y * 8 + first_x][y * 8 + x - 1];
                key.innerHTML = char !== "" ? `<img width="72" height="72" src="bitmaps/${char}.png">` : "";
                key.onclick = () => {
                    console.log(char);
                    insertCharacter(char);
                    restoreInitialKeys();
                };
            }
        }
    }
}

function restoreInitialKeys() {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 4; y++) {
            const key = document.getElementById(`x${x}y${y}`);
            const icon_name = ["1_処",
                "1_下",
                "1_六",
                "1_人",
                "1_ナ而",
                "1_一ノ",
                "1_一？",
                "",
                "2_上",
                "2_二",
                "2_右",
                "2_口",
                "2_口",
                "2_筆",
                "2_門",
                "2_函包箱",
                "3_ノ一",
                "3_常",
                "3_ノノ",
                "3_之",
                "3_四",
                "3_ヒクカ丹",
                "3_天",
                "3_神十位",
                "4_火",
                "4_心",
                "4_再",
                "4_ヽヽ",
                "5_反",
                "5_フ",
                "5_傾",
                "5_針"][y * 8 + x];
            key.innerHTML = icon_name !== "" ? `<img width="72" height="72" src="folder_icons/${icon_name}.svg">` : "";
            key.onclick = () => firstStroke({ 'x': x, 'y': y });
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
