"use strict";
/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const clearButton = document.getElementById("clearButton");
const toggleGuide = document.getElementById("toggleGuide");
const drawingContext = canvas.getContext("2d");
const SIDE_CELL_COUNT = 12;
const cellPixelLengthX = canvas.width / SIDE_CELL_COUNT;
const cellPixelLengthY = canvas.height / SIDE_CELL_COUNT;
const colorHistory = {};
//Set Default Color
colorInput.value = "#000000";
//Initialize Canvas Background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);


{
    guide.style.width = `${canvas.width}px`;
    guide.style.height = `${canvas.height}px`;

    guide.style.gridTemplateColumns = `repeat(${SIDE_CELL_COUNT}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${SIDE_CELL_COUNT}, 1fr)`;

    [...Array(SIDE_CELL_COUNT ** 2)].forEach(() => {
        guide.insertAdjacentHTML("beforeend", "<div></div>")
    })
}

//Functions
function handleCanvasMousedown(e) {
    if (e.button !== 0) {
        return;
    }

    const canvasBoundingRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasBoundingRect.left;
    const y = e.clientY - canvasBoundingRect.top;

    const cellX = Math.floor(x / cellPixelLengthX);
    const cellY = Math.floor(y / cellPixelLengthY);

    const currentColor = colorHistory[`${cellX}_${cellY}`];

    if(e.ctrlKey) {
        if(currentColor) {
            colorInput.value = currentColor;
        }
    } else {
        fillCell(cellX, cellY);
    }

}

function handleClearButtonClick() {
    const yes = confirm("Do you really want to clear the canvas?");

    if (!yes) {
        return;
    } else {
        drawingContext.fillStyle = "#ffffff";
        drawingContext.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleToggleGuideChange() {
    guide.style.display = toggleGuide.checked ? null : "none";
}

function fillCell(cellX, cellY) {

    const startX = cellX * cellPixelLengthX;
    const startY = cellY * cellPixelLengthY;

    drawingContext.fillStyle = colorInput.value;
    drawingContext.fillRect(startX, startY, cellPixelLengthX, cellPixelLengthY);

    colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

//Event Listeners
canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
