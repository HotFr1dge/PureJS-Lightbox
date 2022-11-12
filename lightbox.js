const LIGHTBOXES = [...document.querySelectorAll('._lightbox_gallery_')];
const OVERLAY = document.createElement('div');

// CREATE OVERLAY
createOverlay();

const CLOSE_BTN = OVERLAY.querySelector('#_lightbox_gallery_overlay__close_');
const PREV_BTN = OVERLAY.querySelector('#_lightbox_gallery_overlay__left');
const NEXT_BTN = OVERLAY.querySelector('#_lightbox_gallery_overlay__right');

let currentImage, nextImage, prevImage, changeFocus;

LIGHTBOXES.forEach(gallery => {
	const IMAGES = [...gallery.getElementsByTagName('img')];

	IMAGES.forEach((image, index) => {
		image.setAttribute('tabindex', 0);
		image.addEventListener('click', (e) => {
			currentImage = index;
			OVERLAY.getElementsByTagName('img')[0].src = image.src;
			showOverlay();

			nextImage = () => {
				currentImage++;
				currentImage === IMAGES.length ? currentImage = 0 : '';
				OVERLAY.getElementsByTagName('img')[0].src = IMAGES[currentImage].src;
			};
		
			prevImage = () => {
				currentImage--;
				currentImage < 0 ? currentImage = IMAGES.length - 1 : '';
				OVERLAY.getElementsByTagName('img')[0].src = IMAGES[currentImage].src;
			};

			changeFocus = () => {
				image.focus();
			}
		});
	});
	
});

NEXT_BTN.addEventListener('click', () => { nextImage() });	
PREV_BTN.addEventListener('click', () => { prevImage() });

CLOSE_BTN.addEventListener('click', () => {
	hideOverlay();
});

window.addEventListener("keydown", (event) => {
	if (event.key === 'Escape' && !OVERLAY.classList.contains('__hidden__')) {
		hideOverlay();
	}

	if (event.key === 'ArrowLeft' && !OVERLAY.classList.contains('__hidden__')) {
		prevImage();
	}

	if (event.key === 'ArrowRight' && !OVERLAY.classList.contains('__hidden__')) {
		nextImage()
	}

	if (event.key === 'Enter') {
		event.target.click();
	}

});


function hideOverlay() {
	OVERLAY.classList.add('__transparent__');
	setTimeout(() => { OVERLAY.classList.add('__hidden__') }, 500);
	document.body.style.overflow = 'auto';
	[...document.getElementsByTagName('img')].forEach((x) => {
		x.setAttribute('tabindex', 0);
	});
	changeFocus();
}

function showOverlay() {
	OVERLAY.classList.remove('__hidden__');
	setTimeout(() => { OVERLAY.classList.remove('__transparent__') }, 1);
	document.body.style.overflow = 'hidden';
	[...document.getElementsByTagName('img')].forEach((x) => {
		x.removeAttribute('tabindex');
	});
}

function createOverlay() {
	OVERLAY.classList.add('_lightbox_gallery_overlay_');
	OVERLAY.innerHTML = '<div class="_img_wrap_"><img src="" alt=""><button type="button" id="_lightbox_gallery_overlay__left">&#129136;</button><button type="button" id="_lightbox_gallery_overlay__right">&#129138;</button></div><button type="button" id="_lightbox_gallery_overlay__close_">&#10006;</button>';
	document.body.appendChild(OVERLAY);
	OVERLAY.classList.add('__hidden__');
	OVERLAY.classList.add('__transparent__');
}