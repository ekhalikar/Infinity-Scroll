const imageContainer = document.getElementById("testImage");
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
let initialImageCount = 5;
const apiKey = 'Utfy1UfqXjv4S1VK3wHUBUWxXuvN8Xj7fji2sLUTGt4';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialImageCount}`;

function imageLoaded() {    
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        loader.hidden = true;
        imagesLoaded = 0;
        ready = true;
        initialImageCount = 30;
    }
}


//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error here
        alert(error);
    }  
}

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const image = document.createElement('img');
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each is finished loading
        image.addEventListener('load', imageLoaded);
        // image.setAttribute('src', photo.urls.regular);
        // image.setAttribute('alt', photo.alt_description);
        // image.setAttribute('title', photo.alt_description);

        //Put <img> inside <a>, then put both inside image container
        item.appendChild(image);
        imageContainer.appendChild(item);
    }); 
}

//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    const pageHeight = window.innerHeight;
    const distanceFromTop = window.scrollY;

    if(pageHeight + distanceFromTop >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();