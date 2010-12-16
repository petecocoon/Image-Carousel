/*
    Image-Carousel Js
    Written By Piero Bozzolo 2010
    piero(DOT)bozzolo@gmail.com

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

function Carousel(divId) {
	var _this = this;
	this.div = divId;    
	this.listIsReversed = false;
	this.isNotPlaying = function(){ return !this.isPlaying();}
	this.interval = null;
	this.currentViewedImage = null;
	this.isPlaying = function(){ return (this.sem == 0) }
	this.sem = 1;
	this.semUp = function(){ this.sem ++;}
	this.semDown = function(){ this.sem--; if(this.sem < 0) this.sem = 0; }
	
	this.start = function(){
		this.semDown();
		if( this.isNotPlaying() ) return;
		if( this.listIsReversed ) this.reverseImageList();
		this.listOfImages = $(this.div).childElements();
		this.listOfImages.each(function(image){	image.hide(); });
		this.currentViewedImage = this.listOfImages.shift();
		this.currentViewedImage.appear();
		
		setTimeout(function() { _this.nextImageCarousel(); }, 1100);
	}
	
	this.nextImageCarousel = function() {
		if( this.isNotPlaying() ) return;
		this.currentViewedImage.fade();
		this.listOfImages.push(this.currentViewedImage);
		this.currentViewedImage = this.listOfImages.shift();
		setTimeout(function() { _this.currentViewedImage.appear(); }, 1100);
		setTimeout(function() { _this.nextImageCarousel(); }, 5000);//intervallo tra una diapositiva e l'altra
	}
	
	this.prevImage = function(){
		if( ! this.listIsReversed ) this.reverseImageList();
		this.showImage();
	}
	
	this.nextImage = function(){
		if( this.listIsReversed ) this.reverseImageList();
		this.showImage();
	}
	
	this.showImage = function(){
		this.semUp();
		this.currentViewedImage.hide();
		this.listOfImages.push(this.currentViewedImage);
		this.currentViewedImage = this.listOfImages.shift();
		this.currentViewedImage.show();	
		setTimeout(function() { _this.start(); }, 3000);
	}
	
	this.reverseImageList = function(){
		this.listOfImages = this.listOfImages.reverse();
		this.listIsReversed = !this.listIsReversed;
	}
	
	this.gotoImage = function(elementID){
		this.semUp();
		element2Show = $(elementID);
		for(var i=0; i < this.listOfImages.length; i++){
			if(element2Show.identify() == this.listOfImages[i].identify()){
				this.currentViewedImage.hide();
				this.listOfImages.push(this.currentViewedImage);
				this.currentViewedImage = this.listOfImages[i];						
				this.currentViewedImage.show();	
				setTimeout(function() { _this.start(); }, 6000);
				return;
			}
		}
	}
	
	this.start();
}