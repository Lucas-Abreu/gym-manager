const currentPage = location.pathname

const menuItems = document.querySelectorAll('header .links a');

for (item of menuItems)
{
    if (currentPage.includes(item.getAttribute('href')))
    {
        item.classList.add('active')
    }
}

function paginate(selectedPage, totalPages) {

    let pages = [],
        oldPage;

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLast = currentPage == 1 || currentPage == totalPages;
        const pagesAfter   = currentPage <= selectedPage + 2;
        const pagesBefore  = currentPage >= selectedPage - 2;

        if (firstAndLast || pagesAfter && pagesBefore) {
        
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...");
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            
            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}

const pagination = document.querySelector(".pagination");

const page       = +pagination.dataset.page;
const totalPages = +pagination.dataset.total;