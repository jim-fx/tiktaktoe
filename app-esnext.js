let grid = [];
let validCases = [];

function stateCheck() {

    const wins = validCases.find((cells) => {
        if (!cells[0].state) return false;
        return cells.every(cell => cell.state == cells[0].state);
    })

    if (wins) {
        wins.forEach(({ element }, i) => {
            element.style.transitionDelay = (i * 50) + "ms";
            element.classList.add("cell-won")
        })
        setTimeout(() => confirm("Player " + (wins[0].state === "x" ? "yellow" : "blue") + " won") && init(), (wins.length * 50 + 50));
    }

}

const switchPlayers = (() => {
    const currentPlayer = document.getElementById("current-player");
    let currentPlayerIsX = false;

    return () => {
        currentPlayer.classList.remove(currentPlayerIsX ? "player-x" : "player-y");
        currentPlayer.classList.add(currentPlayerIsX ? "player-y" : "player-x");
        currentPlayerIsX = !currentPlayerIsX;
        return currentPlayerIsX;
    }
})()

const init = (() => {

    let gridSize = ("gridSize" in localStorage) ? parseInt(localStorage.gridSize) : 3;

    const table = document.querySelector("table");

    const inputGridSize = document.getElementById("input-grid-size");
    inputGridSize.value = gridSize;
    inputGridSize.addEventListener("input", () => {
        gridSize = parseInt(inputGridSize.value);
        localStorage.gridSize = gridSize;
        init();
    })

    return () => {

        switchPlayers();

        //Initialize new empty grid
        grid = new Array(gridSize).fill(null).map(e => []).map(e => new Array(gridSize).fill(null).map(e => new Object({ element: null, state: null })))

        let cellAmount = gridSize * gridSize;

        //Reset the html table
        table.innerHTML = "";

        //Create empty cells
        grid.map(row => {
            const r = document.createElement("tr");
            row.map(cell => {
                cell.element = document.createElement("td");
                cell.element.addEventListener("click", () => {
                    if (!cell.state) {
                        cellAmount--;
                        const player = switchPlayers();
                        cell.element.classList.add(player ? "cell-is-x" : "cell-is-y");
                        cell.state = player ? "x" : "y"
                        stateCheck();
                        if (cellAmount == 0) {
                            setTimeout(() => confirm("No cells left") && init(), 100);
                        }
                    }
                })
                r.append(cell.element);
            })
            table.append(r);
        });

        //Generate the valid cases
        validCases = [
            //Horizontal
            ...grid,
            //Vertical
            ...new Array(gridSize).fill(null).map((v, i) => grid.map(row => row[i])),
            //Diagonal bottomLeft to topRight case
            new Array(gridSize).fill(null).map((v, i) => grid[i][gridSize - i - 1]),
            //Diagonal topLeft to bottomRight case
            new Array(gridSize).fill(null).map((v, i) => grid[i][i])
        ];
    }

})();

init();