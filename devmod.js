// Wait until Game fully loads
(function waitForGame() {
    if (typeof Game === 'undefined' || !Game.ready) {
        setTimeout(waitForGame, 500);
        return;
    }

    initDevMod();
})();

function initDevMod() {

    // =========================
    // DEV PANEL
    // =========================
    if (!document.getElementById('customDevPanel')) {

        let panel = document.createElement('div');
        panel.id = 'customDevPanel';
        panel.style.position = 'fixed';
        panel.style.left = '10px';
        panel.style.top = '50px';
        panel.style.background = '#111';
        panel.style.padding = '12px';
        panel.style.border = '1px solid #555';
        panel.style.zIndex = '999999';
        panel.style.display = 'none';
        panel.style.width = '240px';
        panel.style.color = 'white';
        panel.style.fontFamily = 'Tahoma';
        panel.style.fontSize = '13px';

        panel.innerHTML = `
            <h3 style="margin-top:0;">DEV TOOLS</h3>

            <button onclick="Game.Earn(1000000)">+1M Cookies</button><br><br>

            <button onclick="Game.goldenCookie.force('frenzy')">Frenzy</button><br><br>
            <button onclick="Game.goldenCookie.force('click frenzy')">Click Frenzy</button><br><br>
            <button onclick="Game.goldenCookie.force('dragonflight')">Dragonflight</button><br><br>
            <button onclick="Game.goldenCookie.force('elder frenzy')">Elder Frenzy</button><br><br>
            <button onclick="Game.goldenCookie.force('ruin')">Ruin</button><br><br>

            <button onclick="Game.goldenCookie.spawn()">Spawn Golden Cookie</button>
        `;

        document.body.appendChild(panel);
    }

    // =========================
    // SECRET NAME CHEAT
    // =========================

    const originalSetName = Game.SetBakeryName;

    Game.SetBakeryName = function(name) {

        originalSetName(name);

        if (name.toLowerCase() === "boomie empire") {

            document.getElementById('customDevPanel').style.display = 'block';

            Game.Notify(
                "Dev Mode Unlocked!",
                "Boomie Empire cheat activated.",
                [16,5]
            );

            // Optional: 100x earnings boost
            Game.globalCpsMult *= 100;
        }
    };

    // =========================
    // MORE NATURAL GOLDEN COOKIE FREQUENCY
    // =========================

    const originalLogic = Game.Logic;

    Game.Logic = function() {

        originalLogic();

        // Small chance every tick to spawn golden cookie
        if (Math.random() < 0.0005 && Game.goldenCookie.time <= 0) {
            Game.goldenCookie.spawn();
        }
    };

}
