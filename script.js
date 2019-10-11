var app = new Vue({
    el: '#app',
    data: {
        images: [],
        imageIndex: 0,
        imageJson: {}
    },
    methods: {
        addImage(newURL) {
            this.images.push(newURL);
        },
        setImage(src) {
            var index = indexOfElement(src);
            this.images[index] = this.imageJson[this.imageIndex];
            app.imageIndex++;
            app.$forceUpdate();
            if (app.imageIndex == 100) {
                app.imageIndex = 0;
            }
        },
    }
});

function getImages() {
    var myurl = "https://cors-anywhere.herokuapp.com";
    myurl += "/shibe.online/api/shibes?count=100&urls=true&httpsUrls=false";
    fetch(myurl, { mode: 'cors' })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            app.imageJson = json;
            setAllImages();
        });
}

function setAllImages() {
    for (let i = 0; i < 3; i++) {
        app.addImage(app.imageJson[i]);
        app.imageIndex++;
    }
}

function indexOfElement(element) {
    for (let i = 0; i < app.images.length; i++) {
        if (app.images[i] === element) {
            return i;
        }
    }
    return -1;
}
