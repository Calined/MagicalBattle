class Util {

    //wraps a value around min and max (not for arrays!)
    wrap = function (value, min, max) {

        if (value > max) { value = min + (value - max); }

        if (value < min) { value = max - (min - value); }

        return value;

    }

    //wraps a value around min and max (for arrays!)
    wrapArray = function (value, min, max) {

        if (value > max) { value = min; }

        if (value < min) { value = max; }

        return value;

    }

}

