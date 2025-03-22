(() => {
    const init = async () => {
        await fetchProduct();
        buildHTML();
        buildCSS();
        likeBTN();
        arrowBTN();
    };

    const fetchProduct = async () => {
        if (localStorage.getItem('Carousel-Product')) {
            return;
        } else {
            const res = await fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json');
            const data = await res.json();
            console.log(data);
            localStorage.setItem('Carousel-Product', JSON.stringify(data));
        }

    };

    const likeBTN = () => {

        $(document).ready(() => {
            const products = JSON.parse(localStorage.getItem('Carousel-Product'));
            products.forEach(product => {
                if (product.like) {
                    const path = $(`#${product.id} path`);
                    path.css({
                        'fill': '#193db0',
                        'stroke': '#193db0'
                    });
                }
            });
        });

        $('.ins-like-button').on('click', (e) => {
            const id = e.currentTarget.id;
            const products = JSON.parse(localStorage.getItem('Carousel-Product'));
            const product = products.find(p => p.id === parseInt(id));

            product.like = !product.like;

            const path = $(`#${id} path`);
            if (product.like) {
                path.css({
                    'fill': '#193db0',
                    'stroke': '#193db0'
                });
            } else {
                path.css({
                    'fill': 'none',
                    'stroke': '#555'
                });
            };

            localStorage.setItem('Carousel-Product', JSON.stringify(products));
            console.log(path);
        });
    };

    const buildHTML = () => {

        let products = JSON.parse(localStorage.getItem('Carousel-Product'));

        const productHTML = products.map(product => (
            `
                <div class="ins-product-card" id="${product.id}">
                    <div class="ins-card-image">
                        <a href="${product.url}" target="_blank">
                            <img class="carousel-image" src="${product.img}" alt="Product Photo">
                        </a>
                        <div class="ins-like-button" id="${product.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                                <path id="${product.id}" fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="ins-card-info">
                        <div class="ins-card-info-title">
                            <a href="${product.url}" target="_blank">
                                <p>${product.name}</p>
                            </a>    
                        </div>
                        <div class="ins-card-info-price">
                            <div class="ins-card-info-current-price">${product.price} TL</div>
                        </div>
                    </div>
                </div>`

        )).join('');

        const html = `
                <div class="also-like">
                <div class="ins-carousel-container">
                    <p class="ins-carousel-title">You Might Also Like</p>
                    <div class="ins-carousel">
                        <button class="prev ins-arrow" id="prevBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                            <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)">
                            </path>
                        </svg>
                        </button>
                        <div class="ins-slider">                    
                            <div class="ins-product ins-slider-animation">
                                ${productHTML}
                            </div>
                        </div>
                        <button class="next ins-arrow" id="nextBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                            <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)">
                            </path>
                        </svg>
                        </button>
                    </div>
                        </div>
                </div>
            `;

        $('.product-detail') ? $('.product-detail').after(html) : alert('Kod sadece product sayfasında çalışır');
    };

    const buildCSS = () => {
        const css = `
                .also-like {
                    width: 100%;
                    overflow: hidden;
                    background: #f4f5f7;
                    position: relative;
                    display: flex;
                }

                .ins-carousel-container {
                    display: block;
                }

                .ins-carousel-title {
                    font-size: 24px;
                    color: #29323b;
                    line-height: 33px;
                    font-weight: lighter;
                    padding: 15px 0;
                    margin: 0;
                    flex-dirextion: column;
                }
                @media (min-width: 992px) {
                    .ins-carousel-title {
                        font-size: 32px;
                        line-height: 43px;
                    }
                    
                    .also-like {
                        justify-content: center;
                    }

                    .ins-carousel-container {
                        width: 80%
                    }

                    .ins-product-card {
                        width: 21rem;
                        height: 38rem;
                        float: left;
                        color: #555;
                        position: relative;
                        background-color: #fff;
                        flex-direction: row;
                    }
                }
                
                .ins-carousel {
                    position: relative;
                    padding-bottom: 24px;
                }

                .ins-slider {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                }

                .ins-slider-animation {
                    transition: transform .5s;
                    transition-timing-function: cubic-bezier(.645,.045,.355,1);
                    will-change: transform;
                }

                .ins-product {
                    padding-bottom: 24px;
                    gap: 15px;
                    padding: 10px;
                    display: flex;
                    align-items: stretch;
                    width: 335.409%;
                    transform: translateX(0%) translateX(0px);
                    flex-direction: row;
                    }
               
                .ins-card-image{
                    position: relative;
                }
                .carousel-image {
                    width: 100%;
                    height: 100%;
                }

                .ins-like-button {
                    cursor: pointer;
                    position: absolute;
                    top: 9px;
                    right: 15px;
                    width: 34px;
                    height: 34px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
                    border: solid 0.5px #b6b7b9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: #428bca;
                    text-decoration: none;
                }

                .ins-card-info {
                    display: flex;
                    flex-direction: column;
                    padding: 0 10px;
                }
                .ins-card-info-title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: initial;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    height: 40px;
                    margin-top: 5px;
                }

                .ins-card-info-title a {
                    color: #302e2b !important;
                    text-decoration: none !important;
                    outline: none !important;
                }

                .ins-card-info-price {
                    display: flex;
                    align-items: flex-start;
                    height: 50px;
                    line-height: 40px;
                }

                .ins-card-info-current-price {
                    color: #193db0;
                    font-size: 18px;
                    display: inline-block;
                    line-height: 22px;
                    font-weight: bold;
                }

                .ins-arrow {
                    background: none;
                    border: none;
                    position: absolute;
                    top: 50%;
                }

                .next {
                    right: -35px;
                    transform: rotate(180deg);
                }
                .prev {
                    left: -35px;
                }

                @media (max-width: 992px) {
                    .ins-arrow {
                        visibility: hidden;
                    }
                    
                    .ins-product-card {
                        float: left;
                        width: 28rem;
                        height: 50rem;
                        color: #555;
                        position: relative;
                        background-color: #fff;
                        flex-direction: row;
                    }
                    
                    .ins-product {
                        gap: 40px;
                    }
                }
            `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const arrowBTN = () => {
        let translation = 0;
        const container = $('.ins-product');
        const cardCount = $('.ins-product-card').length;

        const updateButtons = () => {
            $('#prevBtn').prop('disabled', translation === 0);
            $('#nextBtn').prop('disabled', translation <= -60);
        };

        $('#nextBtn').on('click', () => {
            if (translation > -60) {
                translation -= cardCount;
                translation = Math.max(translation, -60);
                container.css('transform', `translateX(${translation}%)`);
                updateButtons();
            }
        });

        $('#prevBtn').on('click', () => {
            if (translation < 0) {
                translation += cardCount;
                translation = Math.min(translation, 0);
                container.css('transform', `translateX(${translation}%)`);
                updateButtons();
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        container.on('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        container.on('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        container.on('touchend', () => {
            let diff = touchStartX - touchEndX;
            let threshold = 50;

            if (diff > threshold) {
                $('#nextBtn').click();
            } else if (diff < -threshold) {
                $('#prevBtn').click();
            }
        });

        updateButtons();
    };


    init();
})();