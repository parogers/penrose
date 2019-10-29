/* PENROSE - An interactive plot of penrose kite+dart tiles
 * Copyright (C) 2015  Peter Rogers (peter.rogers@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * See LICENSE.txt for the full text of the license.
 */

const KITE_COLOUR = '#00ffff';
const DART_COLOUR = '#ff0000';
const OUTLINE_COLOUR = "#555555";

export function drawTiling(canvas, context, collection, previous)
{
    // The tiles are rendered within a 2x2 unit box about the origin (-1 to 1)
    // Automatically scale that box up to most of the canvas area.
    let scale = 0.95*Math.min(canvas.width, canvas.height)/2;
    let viewCenterX = 0;
    let viewCenterY = 0;
    
    //var start = (new Date()).getTime();
    context.save();

    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.fill();

    context.translate(canvas.width/2, canvas.height/2);
    context.scale(scale, scale);
    context.translate(-viewCenterX, -viewCenterY);

    /* Draw the kites */
    context.lineWidth = 0.5/scale;
    context.strokeStyle = OUTLINE_COLOUR;
    context.fillStyle = KITE_COLOUR;
    for (var n = 0; n < collection.kites.length; n++) {
	drawTile(context, collection.kites[n], true, true);
    }
    /* Change the style a bit and draw the darts */
    context.fillStyle = DART_COLOUR;
    for (var n = 0; n < collection.darts.length; n++) {
	drawTile(context, collection.darts[n], true, true);
    }

    if (previous)
    {
	/* Draw outlines of the previous iteration */
	context.lineWidth = 2/scale;
	context.strokeStyle = "#000000";
	for (var n = 0; n < previous.kites.length; n++) {
	    drawTile(context, previous.kites[n], false, true);
	}
	for (var n = 0; n < previous.darts.length; n++) {
	    drawTile(context, previous.darts[n], false, true);
	}
    }
    context.restore();
}

function drawTile(ctx, tile, dofill, dostroke)
{
    ctx.beginPath();
    ctx.moveTo(tile.p1.elements[0], tile.p1.elements[1]);
    if (tile.right === null) {
	/* Half tile - render the left side */
	ctx.lineTo(tile.left.elements[0], tile.left.elements[1]);
	ctx.lineTo(tile.p2.elements[0], tile.p2.elements[1]);
    } else if (tile.left === null) {
	/* Half tile - render the right side */
	ctx.lineTo(tile.right.elements[0], tile.right.elements[1]);
	ctx.lineTo(tile.p2.elements[0], tile.p2.elements[1]);
    } else {
	ctx.lineTo(tile.left.elements[0], tile.left.elements[1]);
	ctx.lineTo(tile.p2.elements[0], tile.p2.elements[1]);
	ctx.lineTo(tile.right.elements[0], tile.right.elements[1]);
	ctx.lineTo(tile.p1.elements[0], tile.p1.elements[1]);
    }
    if (dofill) ctx.fill();
    if (dostroke) ctx.stroke();
    /*if (tile.left === null || tile.right === null) {
	ctx.beginPath();
	ctx.moveTo(tile.p1.elements[0], tile.p1.elements[1]);
	ctx.lineTo(tile.p2.elements[0], tile.p2.elements[1]);
	ctx.strokeStyle = "#999999";
	ctx.stroke();
    }*/
}

