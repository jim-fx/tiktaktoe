const init = (() => {
    const currentPlayer = document.getElementById("current-player"); const table = document.querySelector("table"); const input = document.getElementById("input-grid-size"); const g = []; const c = []; const n = length => new Array(length).fill(null); let x = !1, s = ("gridSize" in localStorage) ? parseInt(localStorage.gridSize) : 3, a = s * s; input.value = s; input.addEventListener("input", () => { s = parseInt(input.value); localStorage.gridSize = s; init() })
    return () => {
        a = s * s; g.length = c.length = 0; table.innerHTML = ""; g.push(...n(s).map(e => []).map(e => n(s).map(e => new Object({ element: document.createElement("td"), state: null })))); g.map(row => {
            const r = document.createElement("tr"); row.map(cell => {
                cell.element.addEventListener("click", () => {
                    if (!cell.state) {
                        a--; currentPlayer.classList.remove(x ? "player-x" : "player-y"); currentPlayer.classList.add(x ? "player-y" : "player-x"); x = !x; cell.element.classList.add(x ? "cell-is-x" : "cell-is-y"); cell.state = x ? "x" : "y"
                        const wins = c.find((cells) => !cells[0].state ? !1 : cells.every(cell => cell.state == cells[0].state)); if (wins) {
                            wins.forEach(({ element }, i) => { element.style.transitionDelay = (i * 50) + "ms"; element.classList.add("cell-won") })
                            setTimeout(() => confirm("Player " + (wins[0].state === "x" ? "yellow" : "blue") + " won") && init(), (wins.length * 50 + 50))
                        } else if (a == 0) { setTimeout(() => confirm("No cells left") && init(), 50) }
                    }
                })
                r.append(cell.element)
            })
            table.append(r)
        }); c.push(...g, ...n(s).map((v, i) => g.map(row => row[i])), n(s).map((v, i) => g[i][s - i - 1]), n(s).map((v, i) => g[i][i]))
    }
})(); init()