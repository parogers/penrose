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

import { Component, OnInit, ViewChild } from '@angular/core';
import {
    Tile,
    TileCollection,
    radians,
    generateSunShape,
    generateStarShape
} from './tiles';

import { drawTiling } from './draw';

@Component({
    selector: 'app-penrose',
    templateUrl: './penrose.component.html',
    styleUrls: ['./penrose.component.scss']
})
export class PenroseComponent implements OnInit
{
    @ViewChild('canvas') private canvas: any;
    private context: any;
    private collection: any;

    constructor() { }

    ngOnInit()
    {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.collection = generateSunShape().subdivide().subdivide().subdivide();

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    private draw()
    {
        drawTiling(
            this.canvas.nativeElement,
            this.context,
            this.collection
        );
    }
}
