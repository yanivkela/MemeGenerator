var gGalleryFilterBy = ''

const gImages = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['trump', 'politics']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['dog', 'cute']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['dog', 'baby']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['cat', 'cute']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['success', 'baby']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['history', 'aliens']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['willy', 'factory']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['sneaky', 'baby']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['obama', 'politics']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['men', 'kiss']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['man', 'tzadik']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['man', 'wine']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['man', 'matrix']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['man', 'one']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['man', 'startrek']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['putin', 'politics']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['toystory', 'buzz']
    },
]

function setGalleryFilterBy(str) {
    gGalleryFilterBy = str
}

function getImages() {
    return gImages.filter(image => {
        var isMatch = false
        image.keywords.forEach(keyword => {
            if (keyword.includes(gGalleryFilterBy)) isMatch = true
        })
        return isMatch
    })
}