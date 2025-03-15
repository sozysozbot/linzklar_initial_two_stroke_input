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
            const icon_name = [
                "1_処.svg", "1_下.svg", "1_六.svg", "1_人.svg", "1_ナ而.svg", "1_一ノ.svg", "1_一？.svg", "key_pmcp.png",
                "2_上.svg", "2_二.svg", "2_右.svg", "2_言日.svg", "2_口.svg", "2_筆.svg", "2_門.svg", "2_函包箱.svg",
                "3_ノ一.svg", "3_常.svg", "3_ノノ.svg", "3_之.svg", "3_四.svg", "3_ヒクカ丹.svg", "3_天.svg", "3_神十位.svg",
                "key_xon.png", "4_火心.svg", "4_再.svg", "4_ヽヽ.svg", "5_反.svg", "5_フ.svg", "5_傾.svg", "5_針.svg"
            ][y * 8 + x];
            key.innerHTML = icon_name !== "" ? `<img width="72" height="72" src="folder_icons/${icon_name}">` : "";
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
