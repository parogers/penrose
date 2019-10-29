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

import { Component, ViewChild } from '@angular/core';
import { PenroseComponent } from './penrose/penrose.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    public subdivisions: number = 1;
    public showPrevIteration: boolean = false;
    public updateRealtime: boolean = false;
    public startingShapes: any = ['star', 'sun'];
    public selectedShape: string = 'star';

    @ViewChild('penrose', { static: true }) penrose;

    handleSubChanged(event)
    {
        this.subdivisions = event.value;
    }

    handleSubMoved(event)
    {
        if (this.updateRealtime) {
            this.subdivisions = event.value;
        }
    }
}
