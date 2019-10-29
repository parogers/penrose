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

const PHI = (1 + Math.sqrt(5))/2.0;

export class TileCollection
{
    constructor()
    {
        this.kites = [];
        this.darts = [];
    }

    /* Takes a list of half-tiles and subdivides them, returning a new list
     * of half tiles */
    subdivide()
    {
        var coll = new TileCollection();
        for (var n = 0; n < this.kites.length; n++) 
        {
	    var tile = this.kites[n];
	    if (tile.left === null) {
	        /* Right-hand tile */
	        subdivide_half_kite(tile, "right", coll);
	    } else if (tile.right === null) {
	        /* Left-hand tile */
	        subdivide_half_kite(tile, "left", coll);
	    } else {
	        /* Full tile */
	        subdivide_half_kite(tile, "right", coll);
	        subdivide_half_kite(tile, "left", coll);
	    }
        }

        for (var n = 0; n < this.darts.length; n++)
        {
	    var tile = this.darts[n];
	    if (tile.left === null) {
	        subdivide_half_dart(tile, "right", coll);
	    } else if (tile.right === null) {
	        subdivide_half_dart(tile, "left", coll);
	    } else {
	        /* Full tile */
	        subdivide_half_dart(tile, "right", coll);
	        subdivide_half_dart(tile, "left", coll);
	    }
        }
        return coll;
    }
}

export class Tile
{
    constructor(type, pt, dir)
    {
        this.type = type;
        if (pt !== undefined && dir !== undefined) {
	    this.p1 = pt;
	    if (type === Tile.KITE) {
	        this.p2 = pt.add(dir);
	    } else {
	        this.p2 = pt.add(dir.x(1/PHI));
	    }

	    var mat = Matrix.Rotation(radians(36));
	    this.right = pt.add(mat.x(dir));
	    this.left = pt.add(mat.inv().x(dir));
        } else {
	    this.p1 = null;
	    this.p2 = null;
	    this.left = null;
	    this.right = null;
        }
    }

    /* Returns a new tile representing the left/right side of this tile */
    getHalf(side)
    {
        var tile = new Tile(this.type);
        tile.p1 = this.p1;
        tile.p2 = this.p2;
        tile[side] = this[side];
        return tile;
    }

    isFull()
    {
        return this.left !== null && this.right !== null;
    }
}

Tile.KITE = 0;
Tile.DART = 1;

export function radians(angle)
{
    return Math.PI * angle / 180.0;
}

function split_tiles(tiles)
{
    var newTiles = [];

    for (var n = 0; n < tiles.length; n++) 
    {
	var leftTile = new Tile(tiles[n].type);
	leftTile.p1 = tiles[n].p1;
	leftTile.p2 = tiles[n].p2;
	leftTile.left = tiles[n].left;
	newTiles.push(leftTile);

	var rightTile = new Tile(tiles[n].type);
	rightTile.p1 = tiles[n].p1;
	rightTile.p2 = tiles[n].p2;
	rightTile.right = tiles[n].right;
	newTiles.push(rightTile);
    }
    return newTiles;
}

function subdivide_half_kite(tile, side, collection)
{
    /* Generate a half dart (right-hand) */
    var opp = (side === "left" ? "right" : "left");
    var dist = tile.p2.subtract(tile[side]).modulus();
    var pt = tile.p1;
    var dir = tile[side].subtract(tile.p1).normalize().x(dist);
    var dart = new Tile(Tile.DART, pt, dir);
    dart[side] = null;
    collection.darts.push(dart);

    //var dart1 = dart.get_half(side)
    //var dart2 = dart.get_half(opp)
    //collection.darts.push(dart1);
    //collection.darts.push(dart2);

    /* Generate a full kite */
    var dir = dart[opp].subtract(tile[side]);
    var pt = tile[side];

    var kite = new Tile(Tile.KITE, pt, dir);
    var tile1 = kite.getHalf(side);
    var tile2 = kite.getHalf(opp);
    collection.kites.push(tile1);
    collection.kites.push(tile2);
}

function subdivide_half_dart(tile, side, collection)
{
    /* Generate a half-kite tile (left hand) */
    var opp = (side === "left" ? "right" : "left");
    var dir = tile.p2.subtract(tile.p1);
    var kite = new Tile(Tile.KITE, tile.p1, dir);
    kite[opp] = null;
    collection.kites.push(kite);
    /* Generate a half-dart tile (left hand) */
    var dir = kite[side].subtract(tile[side]).x(PHI);
    var dart = new Tile(Tile.DART, tile[side], dir);
    dart[opp] = null;
    collection.darts.push(dart);
}

export function generateSunShape()
{
    let collection = new TileCollection();
    let center = Vector.create([0, 0]);
    let unit = Vector.create([0, 1]);

    for (let n = 0; n < 5; n++) 
    {
	let mat = Matrix.Rotation(radians(n*72));
	let dir = mat.x(unit);
	let tile = new Tile(Tile.KITE, center, dir);
	collection.kites.push(tile);
    }
    return collection;
}

export function generateStarShape()
{
    let collection = new TileCollection();
    let center = Vector.create([0, 0]);
    let unit = Vector.create([0, 1]);

    for (let n = 0; n < 5; n++) 
    {
	let mat = Matrix.Rotation(radians(n*72));
	let dir = mat.x(unit);
	let tile = new Tile(Tile.DART, center, dir);
	collection.darts.push(tile);
    }
    return collection;
}
