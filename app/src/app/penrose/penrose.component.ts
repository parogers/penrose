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

import {
    Component,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';

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
    @ViewChild('canvas', { static: true }) private canvas: any;
    private context: any;
    private previous: any;
    private collection: any;
    private _subdivisions: number = 1;
    private _showPrevIteration: boolean = false;
    private _startingShape: string = 'star';

    constructor() { }

    ngOnInit()
    {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.updateTiling();
    }

    @Input() set showPrevIteration(value)
    {
        if (value !== this._showPrevIteration)
        {
            this._showPrevIteration = value;
            this.updateTiling();
        }
    }

    get showPrevIteration() {
        return this._showPrevIteration;
    }

    @Input() set subdivisions(value)
    {
        if (value !== this._subdivisions)
        {
            this._subdivisions = value;
            this.updateTiling();
        }
    }

    get subdivisions() {
        return this._subdivisions;
    }

    
    @Input() set startingShape(value)
    {
        if (this._startingShape !== value) {
            this._startingShape = value;
            this.updateTiling();
        }
    }

    private generateStartingShape()
    {
        if (this._startingShape === 'star') return generateStarShape();
        if (this._startingShape === 'sun') return generateSunShape();
        return null;
    }

    private updateTiling()
    {
        this.previous = null;
        this.collection = this.generateStartingShape();
        if (this.collection === null) {
            return;
        }
        
        for (let n = 0; n < this.subdivisions; n++)
        {
            this.previous = this.collection;
            this.collection = this.collection.subdivide();
        }

        requestAnimationFrame(() => {
            this.draw();
        });
    }
    
    private draw()
    {
        drawTiling(
            this.canvas.nativeElement,
            this.context,
            this.collection,
            this.showPrevIteration ? this.previous : null
        );
    }
}
