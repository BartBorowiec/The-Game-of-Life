var c=document.getElementById('myCanvas');
((c)=>{
    let $ = c.getContext("2d"),
        w = c.width = window.innerWidth,
        h = c.height = window.innerHeight,
        random = t=>Math.random()*t;

        //create 2d array
        let arr = new Array(Math.round(w/10)).fill().map(()=>{
        	let innerArr=new Array(Math.round(h/10)).fill().map((p)=> {
        		return cell = {
        			p: {x: 0, y: 0},
        			isAlive: Math.random() >=0.95
        		}
        	});
        	return innerArr;
        });
        let buffer = new Array(Math.round(w/10)).fill().map(()=>{
            let inner=new Array(Math.round(h/10)).fill().map((p)=> {
                return cell = {
                    p: {x: 0, y: 0},
                    isAlive: false
                }
            });
            return inner;
        });
        //set position of each cell, kill all edgy cells
        for(var i=0; i<arr.length; ++i) {
        	for(var j=0; j<arr[i].length; ++j) {
        		arr[i][j].p.x=10*i;
        		arr[i][j].p.y=10*j;
                if(i===0||i===arr.length-1||j===0||j===arr[i].length-1) {
                    arr[i][j].isAlive = false;
                }
        	}
        }

function draw(){
		(h !== window.innerHeight || w!==window.innerWidth) && (w=c.width=window.innerWidth,h=c.height=window.innerHeight);
        $.fillStyle="#555";
        $.fillRect(0,0,w,h);
        
        //draw the array
        arr.forEach(function (innerArr){
        	innerArr.forEach(p=>{
	        	$.beginPath();
	            $.rect(p.p.x,p.p.y,10,10);
	            $.closePath();
	            if (p.isAlive) {
	            	$.fillStyle = "rgba(0,150,20,1)";
	            } else {
	            	$.fillStyle = "rgba(50,0,0,1)";
	            }
	            $.fill();
	        }); 
	    });

        // //iterate through the array checking conditions, save to buffer
        // let buffer = arr; //update buffer
        for(var i=0; i<arr.length; ++i) {
            for(var j=0; j<arr[i].length; ++j) {
                buffer[i][j].isAlive = arr[i][j].isAlive;
            }
        }

        //check status of each cell for the next step, save results to buffer
        for(var i=1; i<arr.length-1; ++i) {
            for(var j=1; j<arr[i].length-1; ++j) {
                var alive = checkNeighbours(arr,i,j);
                if(arr[i][j].isAlive) {
                    if(alive !==2 && alive !==3) {
                        buffer[i][j].isAlive = false;
                    }
                } else {
                    if(alive===3) {
                        buffer[i][j].isAlive = true;
                    }
                }
            }
        }

        // //save buffer into array
        // array = buffer;
        for(var i=0; i<arr.length; ++i) {
            for(var j=0; j<arr[i].length; ++j) {
                arr[i][j].isAlive = buffer[i][j].isAlive;
            }
        }
        requestAnimationFrame(draw);
    }
    draw();

})(c);

function checkNeighbours(arr, i, j) {
    var neighbours = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
    var alive = 0;
    neighbours.forEach(function(elem){
        if (arr[elem[0]][elem[1]].isAlive) {
            alive++;
        }
    });
    return alive;
}