var particles = [];
var limit = 10;
var imgs = [];
var weaksignals = [];
var keywords = [];
var attractors = [];
var jsonData = {};
var padding = 100;
var grid = 3;


function preload() {
    var jsonFile = "../data/fromspreadsheet-1.json";
    jsonData = loadJSON(jsonFile);
    console.log(jsonData);
}

var cnv;


var atlasObj = function(weaksignal, keyword){
    this.kw = keyword;
    this.ws = weaksignal;
};

function centerCanvas() {
    cnv = createCanvas(windowWidth, windowHeight);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    centerCanvas();
    setupWeakSignals();
    textFont("Overpass Mono");
    frameRate(60);

    weaksignals.forEach(function(ws, i){
        keywords[0].forEach(function(kw, i){
            var atls = new atlasObj(ws, kw);
            console.log(atls);
            particles.push(new Particle(random(50, width - 50), random(50, height - 50), {ws:ws, kw:kw}));
        });
    })
}

function draw() {
    background('#000');

    for (var i = 0; i < particles.length; i++) {
        particles[i].applyGravity();
        // particles[i].separate(particles);
        // particles[i].separate(attractors);
        particles[i].update();
        particles[i].display();
    }

    fill(100);
    textSize(32);
    fill(255);
    attractors.forEach(function(a){
        a.update();
        a.display();
    });
}

console.log('hello'+'world'.repeat(3));

function setupWeakSignals(){

    //clipping keyword list to random selected words until wordCount reached
    for (var i in jsonData){
        var wordCount = 10;
        var newItems = [];
        var items, index, item;
        if (jsonData[i]["keywords"].length > wordCount) {
            for (var j = 0; j < wordCount; j++) {
                items = jsonData[i]["keywords"];
                index = Math.floor(Math.random() * items.length);
                item = items.splice(index, 1);
                newItems.push(item[0]);
                // console.log(item[0]);
            }
            // console.log(newItems);
            jsonData[i]["keywords"] = newItems.slice();
        }
    }


    // console.log('setup');
    // console.log(jsonData);

    var j = 0, k = 0;
    for (var i in jsonData){
        console.log(j,k);
        attractors.push(new Attractor(jsonData[i]["name"], j, k));
        weaksignals.push(jsonData[i]["name"]);
        keywords.push(jsonData[i]["keywords"]);
        $((".s" + j)+k).html(jsonData[i]["name"]);
        if (j == 2){
            k++;
            j = -1;
        }
        j++;
    }

    // 3 * 3 grid
}

