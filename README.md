# 2048
Reproduction of the popular game - 2048. It was written for the purpose of personal training. I used React library for display. The most interesting issue was to maintain correct rendering in order to avoid unnecessary redraws and not break tiles animation (due to the React reconciliation).

Main feature of this realisation is possibility to change a field size and a digit. You just have to pass `configurable` property with `true` value.

## CSS Variables
The visual colors could be changed by css variables (except of the tiles, I didn't have enough motivation to support this part). Look into [./src/game.css](./src/game.css) to see available css variables you could reuse or redifine in your app.
