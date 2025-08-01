const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
enum Months {Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec};

const toggleElementScroll = (element: HTMLElement) =>{
    element.classList.toggle("disableScroll");
}

const backgroundAnimation = {duration: 0.4, delay: 0.35}

const publicPagesURL = ["/", "/login", "/signup"];

const categoryIconsPath = "/category_icons/";

export {
    daysOfWeek,
    Months,
    toggleElementScroll,
    backgroundAnimation,
    publicPagesURL,
    categoryIconsPath,
};
